<template>
	<main class="contact">
		<Hero v-if="hero.title.length > 0 && hero.title[0].text" class="hero--transparent" :data="hero" />
		<Location
			v-if="link_group.items.length && location_group.items.length"
			:link="link_group"
			:location="location_group"
		/>
		<UpNext v-if="upnext.id" :data="upnext" text="" />
		<More :sideway="true" @click="$scroll()" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { More } from '@/components/elements';
import { Hero, UpNext, Location } from '@/components/modules';

@Component({
	components: {
		Hero,
		UpNext,
		More,
		Location,
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
export default class Contact extends Vue {
	async asyncData({ $prismic, error }) {
		try {
			const data = await $prismic.api.getSingle('contact', {
				fetchLinks: ['home.page_title', 'home.page_subtitle'],
			});

			const doc = data.data;

			return {
				hero: {
					// title required
					type: data.type,
					title: doc.page_title,
					subtitle: doc.page_subtitle,
				},
				link_group: {
					primary: {
						image: doc.image,
					},
					items: doc.link_group,
				},
				location_group: {
					items: doc.location_group,
				},
				upnext: doc.upnext,
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

	mounted() {
		this.$store.commit('SET_THEME', true);
		this.$store.commit('SET_PARENTROUTE', '/contact');
	}

	head() {
		return this.$metaHead(this.meta, this.$prismic);
	}
}
</script>
