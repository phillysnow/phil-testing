<template>
	<main class="event">
		<Hero v-if="hero.title && hero.title.length > 0 && hero.title[0].text" :data="hero" />
		<Slices v-if="slices.body && slices.body.length" :slices="slices.body" />
		<UpNext v-if="upnext.id" :data="upnext" text="Volgende" />
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
})
export default class Event extends Vue {
	async asyncData({ $prismic, params, error }) {
		try {
			const data = await $prismic.api.getByUID('event', params.uid, {
				fetchLinks: ['event.page_title', 'event.page_subtitle'],
			});

			const doc = data.data;

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

	mounted() {
		this.$store.commit('SET_THEME', false);
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
