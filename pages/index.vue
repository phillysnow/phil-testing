<template>
	<main class="home">
		<More @click="scrollSideways()" />
		<Slider v-if="slides && slides.length" :data="slides" local="false" class="slider--full" :hint="slide" />
		<div>
			<h1><span>human first</span> digital agency</h1>
			<nav>
				<a v-cursor-focus="'link'" href="https://werkenbij.tfe.nl/">Werken bij</a>
				<nuxt-link v-cursor-focus="'link'" to="/privacy">Privacy</nuxt-link>
			</nav>
		</div>
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { More } from '@/components/elements';
import { Slider } from '@/components/modules';

@Component({
	components: {
		Slider,
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
export default class Index extends Vue {
	slide = 0;

	async asyncData({ $prismic, error }) {
		try {
			const doc = (
				await $prismic.api.getSingle('home', {
					fetchLinks: [
						'case.page_title',
						'case.page_subtitle',
						'case.page_image',
						'case.visable',
						'opinie.page_title',
						'opinie.page_subtitle',
						'opinie.page_image',
						'opinie.visable',
						'nieuws.page_title',
						'nieuws.page_subtitle',
						'nieuws.visable',
						'over_ons.page_title',
						'over_ons.page_subtitle',
						'over_ons.visable',
						'services.page_title',
						'services.page_subtitle',
						'services.visable',
						'expertise.page_title',
						'expertise.page_subtitle',
						'expertise.visable',
						'contact.page_title',
						'contact.page_subtitle',
						'contact.visable',
						'sector.page_title',
						'sector.page_subtitle',
						'sector.visable',
						'overview_dci.page_title',
						'overview_dci.page_subtitle',
						'overview_dci.visable',
						'event.page_title',
						'event.page_subtitle',
						'event.visable',
					],
				})
			).data;

			const slides = [];

			for (let i = 0; i < doc.highlights.length; i++) {
				const item = doc.highlights[i];
				slides[i] = item.highlight;
			}

			return {
				doc,
				slides,
				meta: {
					title: doc.meta_title,
					description: doc.meta_description ? doc.meta_description : undefined,
					image: doc.meta_image,
					fallback: doc,
					url: '/',
				},
			};
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
			error({ statusCode: 404, message: 'Pagina niet gevonden' });
		}
	}

	scrollSideways() {
		this.slide += 1;
	}

	// lifecycles
	mounted() {
		this.$store.commit('SET_THEME', false);
		this.$store.commit('SET_PARENTROUTE', '/');
	}

	head() {
		return this.$metaHead(this.meta, this.$prismic, 'home');
	}
}
</script>
<style lang="scss">
body.page--home {
	overflow: hidden;
}

.home {
	height: 100vh;
	position: relative;
	overflow: hidden;
	background-color: $background;

	@supports (background: -webkit-named-image(i)) {
		height: 100vh;
	}

	nav {
		max-width: 11rem;
	}

	> div {
		position: absolute;
		bottom: $spacing;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 $spacing 0;

		h1 {
			max-width: 13rem;
			color: $color;
			font-size: $font * 0.8;
			font-family: $font-highlight-light;

			> span {
				font-family: $font-highlight;
			}
		}

		a {
			max-width: 40rem;
			color: $color;
			font-size: $font * 0.8;
			font-family: $font-highlight-light;
			font-weight: normal;
			line-height: 2.2;
			letter-spacing: 0;
		}
	}
}

@media all and (min-width: $m) {
	.home {
		nav {
			max-width: initial;

			a {
				padding: 0 $spacing * 0.5;
				border-right: 1px solid $pink;

				&:last-child {
					border-right: none;
				}
			}
		}

		> div {
			flex-direction: row;
			align-items: flex-end;
			bottom: 0;
			padding: 0 $spacing * 2 $spacing * 4;

			h1 {
				max-width: initial;
			}
		}
	}

	@media all and (max-height: 820px) {
		.home {
			> div {
				padding: 0 $spacing * 2 $spacing * 2;
			}
		}
	}
}

// big ass screens for tiny hights - Trump
@media all and (min-width: $desktop) {
	@media all and (max-height: 1020px) {
		.home {
			> div {
				padding: 0 $spacing * 2 $spacing;
			}
		}
	}
}
</style>
