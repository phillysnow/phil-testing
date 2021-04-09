<template>
	<main class="cases">
		<More @click="scrollSideways()" />
		<OverviewSlider :items="items" :first-item="firstItem" :slide="slide" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { More } from '@/components/elements';
import { OverviewSlider } from '@/components/modules';

@Component({
	components: {
		OverviewSlider,
		More,
	},
	transition(to, from) {
		// custom pages
		if (to.name === 'index') return 'light';
		if (to.name === 'contact') return 'dark';
		if (to.name === 'over-ons') return 'dark';
		if (to.name === 'uid') return 'white';

		// overview pages
		if (to.name === 'cases') return 'light';
		if (to.name === 'opinies') return 'light';
		if (to.name === 'actueel') return 'light';
		if (to.name === 'services') return 'dark';
		if (to.name === 'services-expertises-data-en-customer-intelligence') return 'dark';

		// detail pages
		if (to.name === 'cases-uid') return 'green';
		if (to.name === 'opinies-uid') return 'green';
		if (to.name === 'actueel-nieuws-uid') return 'white';
		if (to.name === 'actueel-at-work-uid') return 'white';
		if (to.name === 'actueel-events-uid') return 'white';
		if (to.name === 'services-sectoren-uid') return 'dark';
		if (to.name === 'services-expertises-uid') return 'dark';
		if (to.name === 'services-expertises-data-en-customer-intelligence-uid') return 'dark';
	},
})
export default class Cases extends Vue {
	slide = 0;

	async asyncData({ $prismic, error }) {
		try {
			// const doc = await $prismic.api.query(
			// 	[$prismic.predicates.at('document.type', 'case'), $prismic.api.getSingle('cases')],
			// 	{
			// 		pageSize: 25,
			// 		orderings: '[document.first_publication_date]',
			// 	}
			// );

			const doc = await Promise.all([
				$prismic.api.query($prismic.predicates.at('document.type', 'case'), {
					pageSize: 100, // prismic max pagesize
					orderings: '[document.first_publication_date desc]',
				}),
				$prismic.api.getSingle('cases').then((r) => r.data),
			]);

			const results = doc[0].results;
			const data = doc[1];

			return {
				firstItem: {
					type: 'cases',
					overviewItem: true,
					data: {
						page_title: data.page_content,
						visable: true,
					},
				},
				items: results,
				meta: {
					title: doc.meta_title ? doc.meta_title : $prismic.asText(doc.page_title),
					description: doc.meta_description ? doc.meta_description : undefined,
					image: doc.meta_image,
					fallback: doc,
					url: $prismic.linkResolver(data),
				},
			};
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
			error({ statusCode: 404, message: 'Pagina niet gevonden' });
		}
	}

	// lifecycles
	mounted() {
		this.$store.commit('SET_THEME', false);
		this.$store.commit('SET_PARENTROUTE', '/cases');
	}

	head() {
		return this.$metaHead(this.meta, this.$prismic, 'cases');
	}

	scrollSideways() {
		this.slide += 1;
	}
}
</script>
<style lang="scss">
body.page--cases {
	overflow: hidden;
}

.cases {
	height: 100vh;
	position: relative;
	overflow: hidden;
	background-color: $background;

	@supports (background: -webkit-named-image(i)) {
		height: 100vh;
	}
}
</style>
