<template>
	<main class="home">
		<More @click="scrollSideways()" />
		<Slider v-if="slides" :data="slides" local="false" start="0" class="slider--full" :hint="slide" />
		<div>
			<nuxt-link to="/" itemprop="url">
				© theFactor.e
			</nuxt-link>
			<h1>
				We ontwikkelen digitale toepassingen die een verschil maken voor mensen.
			</h1>
		</div>
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { More } from '@/components/elements';

import { Slider } from '@/components/modules';

@Component({
	layout: 'default-alt',
	components: {
		Slider,
		More,
	},
})
export default class Index extends Vue {
	slide = 0;

	async asyncData({ $prismic, error }) {
		try {
			const doc = (
				await $prismic.api.getSingle('home', {
					fetchLinks: [
						'case.page_title',
						'case.page_subtitle',
						'opinie.page_title',
						'opinie.page_subtitle',
						'opinie.page_image',
						'nieuws.page_title',
						'nieuws.page_subtitle',
						'over_ons.page_title',
						'over_ons.page_subtitle',
						'services.page_title',
						'services.page_subtitle',
						'event.page_title',
						'event.page_subtitle',
					],
				})
			).data;

			return {
				doc,
				slides: doc.highlights,
				meta: {
					title: doc.meta_title,
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

	scrollSideways() {
		this.slide += 1;
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
.home {
	height: 100vh;
	position: relative;
	overflow: hidden;
	background-color: $background;

	> div {
		position: absolute;
		bottom: $spacing * 3;
		left: 0;
		width: 100%;
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-between;
		padding: 0 $spacing $spacing * 4;

		h1 {
			max-width: 40rem;
			color: $color;
			font-size: $font * 0.8;
			font-family: $font-highlight-light;
			font-weight: normal;
			line-height: 2.4;
			letter-spacing: 0;
		}

		a {
			max-width: 40rem;
			margin-top: $spacing * 0.5;
			color: $color;
			font-size: $font * 0.8;
			font-family: $font-highlight-light;
			text-decoration: none;
		}
	}
}

@media all and (min-width: $m) {
	.home > div {
		flex-direction: row;
		align-items: center;
		bottom: 0;
		padding: 0 $spacing * 2 $spacing * 4;

		a {
			margin-top: 0;
		}
	}
}
</style>
