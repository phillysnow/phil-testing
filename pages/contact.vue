<template>
	<main class="contact">
		<Hero v-if="hero.title.length > 0 && hero.title[0].text" :data="hero" />
		<More :sideway="true" @click="$scroll()" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { More } from '@/components/elements';
import { Hero } from '@/components/modules';

@Component({
	components: {
		Hero,
		More,
	},
})
export default class About extends Vue {
	mounted() {
		this.$store.commit('SET_THEME', true);
	}

	async asyncData({ $prismic, error }) {
		try {
			const data = await $prismic.api.getSingle('contact');

			const doc = data.data;

			return {
				hero: {
					// title required
					type: data.type,
					title: doc.page_title,
					subtitle: doc.page_subtitle,
				},
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
