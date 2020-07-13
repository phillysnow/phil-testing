<template>
	<main class="default">
		<Hero v-if="hero.title.length && hero.title[0].text" :data="hero" />
		<Slices v-if="slices.body && slices.body.length" :slices="slices.body" />
		<More :sideway="true" @click="$scroll()" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { More } from '@/components/elements';
import { Hero, Slices } from '@/components/modules';

@Component({
	components: {
		Hero,
		Slices,
		More,
	},
})
export default class Default extends Vue {
	async asyncData({ $prismic, params, error }) {
		try {
			const data = await $prismic.api.getByUID('default', params.uid);

			const doc = data.data;

			return {
				hero: {
					// title required
					title: doc.page_title,
					type: doc.type,
				},
				slices: {
					body: doc.body,
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

	mounted() {
		this.$store.commit('SET_THEME', false);
	}

	head() {
		return this.$metaHead(this.meta, this.$prismic);
	}
}
</script>
<style lang="scss">
.default {
	height: 100%;

	section:last-of-type {
		padding-bottom: $spacing * 3;
	}
}
</style>
