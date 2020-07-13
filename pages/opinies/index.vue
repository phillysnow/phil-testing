<template>
	<main class="opinies">
		<Overview :items="items" :page-title="pageTitle" append="_" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { Overview } from '@/components/modules';

@Component({
	layout: 'default-alt',
	components: {
		Overview,
	},
})
export default class Opinies extends Vue {
	async asyncData({ $prismic, error }) {
		try {
			const doc = await Promise.all([
				$prismic.api.query($prismic.predicates.at('document.type', 'opinie'), {
					pageSize: 33,
				}),
				$prismic.api.getSingle('opinies').then((r) => r.data),
			]);

			const results = doc[0].results;
			const data = doc[1];

			return {
				pageTitle: data.page_title,
				items: results,
				meta: {
					title: doc.meta_title ? doc.meta_title : $prismic.asText(doc.page_title),
					description: doc.meta_description ? doc.meta_description : undefined,
					image: doc.meta_image,
					fallback: doc,
				},
			};
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
			error({ statusCode: 404, message: 'Page not found' });
		}
	}

	// lifecycles
	mounted() {
		this.$store.commit('SET_THEME', false);
	}

	head() {
		return this.$metaHead(this.meta, this.$prismic);
	}
}
</script>
<style lang="scss" scoped>
.opinies {
	overflow: hidden;
	width: 100%;
	background-color: $background;

	@media all and (min-width: $l) {
		height: 100vh;
	}
}
</style>
