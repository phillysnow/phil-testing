<template>
	<main class="event">
		<Hero v-if="hero.title && hero.title.length > 0 && hero.title[0].text" :data="hero" />
		<Slices v-if="slices.body && slices.body.length" :slices="slices.body" />
		<UpNext
			v-if="upnext.id || upnextSliderItems.length"
			:data="upnext"
			:slider-items="upnextSliderItems"
			text="Volgende"
		/>
		<More :sideway="true" @click="$scroll()" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { More } from '@/components/elements';
import { Hero, Slices, UpNext } from '@/components/modules';

@Component({
	components: {
		Hero,
		Slices,
		UpNext,
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
export default class Event extends Vue {
	async asyncData({ $prismic, params, error }) {
		try {
			const data = await $prismic.api.getByUID('event', params.uid, {
				fetchLinks: [
					'event.page_title',
					'event.page_subtitle',
					'nieuws.visable',
					'event.visable',
					'nieuws.page_title',
					'nieuws.page_subtitle',
				],
			});

			const doc = data.data;
			const slides = [];

			for (let i = 0; i < doc.slider_items.length; i++) {
				const item = doc.slider_items[i];
				slides[i] = item.highlight;
			}

			return {
				hero: {
					// title required
					type: data.type,
					title: doc.page_title,
					subtitle: doc.page_subtitle,
					image: doc.page_image,
				},
				slices: {
					body: doc.body,
				},
				upnext: doc.upnext,
				upnextSliderItems: slides,
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
		this.$store.commit('SET_THEME', false);
		this.$store.commit('SET_DETAILPAGE', true);
		this.$store.commit('SET_PARENTROUTEFALLBACK', '/actueel');
	}

	beforeDestroy() {
		this.$store.commit('SET_DETAILPAGE', false);
	}

	head() {
		return this.$metaHead(this.meta, this.$prismic);
	}
}
</script>
<style lang="scss">
.event {
	height: 100%;

	section:last-of-type > div {
		padding-bottom: $spacing * 3;
	}
}
</style>
