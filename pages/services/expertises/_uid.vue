<template>
	<main class="expertise">
		<HeroIntro v-if="hero.title.length > 0 && hero.title[0].text" :data="hero" />
		<Slices v-if="slices.body && slices.body.length" :slices="slices.body" />
		<UpNext v-if="upnext.id" :data="upnext" text="Volgende" />
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
export default class Expertise extends Vue {
	async asyncData({ $prismic, params, error }) {
		try {
			const data = await $prismic.api.getByUID('expertise', params.uid, {
				fetchLinks: ['expertise.page_title', 'expertise.page_subtitle'],
			});

			const doc = data.data;

			return {
				hero: {
					// title required
					type: data.type,
					title: doc.page_title,
					subtitle: doc.page_subtitle,
					intro_text: doc.intro,
				},
				slices: {
					body: doc.body,
				},
				upnext: doc.upnext,
			};
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
			error({ statusCode: 404, message: 'Page not found' });
		}
	}

	mounted() {
		this.$store.commit('SET_THEME', true);
	}
}
</script>
<style lang="scss">
.expertise {
	height: 100%;

	section:last-of-type > div {
		padding-bottom: $spacing * 3;
	}
}
</style>
