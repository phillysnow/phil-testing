<template>
	<main class="about">
		<HeroIntro v-if="hero.title.length > 0 && hero.title[0].text" :data="hero" />
		<Slices v-if="slices.body && slices.body.length" :slices="slices.body" />
		<UpNext v-if="upnext.id" :data="upnext" text="" />
		<More :sideway="true" @click="$scroll()" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { More } from '@/components/elements';
import { HeroIntro, Slices, UpNext } from '@/components/modules';

@Component({
	components: {
		HeroIntro,
		Slices,
		UpNext,
		More,
	},
})
export default class About extends Vue {
	mounted() {
		this.$store.commit('SET_THEME', true);
	}

	async asyncData({ $prismic, error }) {
		try {
			const data = await $prismic.api.getSingle('over_ons', {
				fetchLinks: ['services.page_title', 'services.page_subtitle'],
			});

			const doc = data.data;

			return {
				hero: {
					// title required
					type: data.type,
					title: doc.page_title,
					subtitle: doc.page_subtitle,
					intro_title: doc.intro_title,
					intro_subtitle: doc.intro_subtitle,
					intro_text: doc.intro_text,
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

	head() {
		return this.$metaHead(this.meta, this.$prismic);
	}
}
</script>
