<template>
	<section
		class="hero-figure"
		:class="{
			'hero-figure--up': scrollClass,
			dark,
		}"
	>
		<article>
			<p v-if="data.type">{{ $type(data.type) }}</p>
			<h1 v-if="data.title">{{ $prismic.asText(data.title) }}</h1>
			<p v-if="data.subtitle">{{ `${append || ''}${data.subtitle}` }}</p>
		</article>
		<div v-if="data.description">
			<prismic-rich-text v-if="data.description" :field="data.description" />
			<FigureImage
				v-if="data.image && data.image.url"
				class="image--overlay-green"
				:class="{ 'image--align-right': alignRight }"
				:image="data.image"
			/>
		</div>
	</section>
</template>

<script>
import { Component, Vue, Prop, State } from 'nuxt-property-decorator';
import { FigureImage } from '@/components/elements';

@Component({
	components: {
		FigureImage,
	},
})
export default class HeroFigure extends Vue {
	@Prop() data;
	@State dark;
	@Prop() append;
	@Prop() alignRight;
	scrollClass = false;
	scrollPosition = 0;
	ticking = false;

	scroll = (e) => this.animate();

	mounted() {
		if (this.data.description) {
			window.addEventListener('scroll', this.scroll, { passive: true });

			setTimeout(() => {
				if (window.scrollY <= 2) {
					window.scrollTo(0, 1);
				}
			}, 600);
		}
	}

	beforeDestroy() {
		if (this.data.description) {
			window.removeEventListener('scroll', this.scroll, { passive: true });
		}
	}

	animate() {
		this.scrollPosition = window.scrollY;

		if (!this.ticking) {
			window.requestAnimationFrame(
				() => {
					if (this.scrollPosition >= 1) {
						this.scrollClass = true;
					} else {
						this.scrollClass = false;
					}
					this.ticking = false;
				},
				{ passive: true }
			);

			this.ticking = true;
		}
	}
}
</script>

<style lang="scss">
.hero-figure {
	background-color: $green;
	height: calc(100vh + 1px);
	min-height: -webkit-fill-available;
	position: relative;
	overflow: hidden;
	perspective: 2px;
	transform-style: preserve-3d;

	&--up {
		> div {
			transform: translateY(-100vh);
		}
	}

	> div {
		height: calc(100vh + 1px);
		min-height: -webkit-fill-available;
		position: relative;
		transition: 1.2s ease transform;
		will-change: transform;
		background-color: $green;

		div {
			width: 100%;
			height: 50%;
			bottom: 0;
			left: 0;
			position: absolute;
			padding: $spacing * 2 $spacing * 2;
			background-color: $white;
			z-index: 2;

			strong {
				font-weight: bold;
			}
		}

		figure {
			height: 50%;
		}
	}

	> article {
		display: flex;
		flex-direction: column;
		padding: $spacing * 5 $spacing $spacing;
		height: 100vh;
		position: relative;

		&::after {
			content: '';
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 16rem;
			height: 16rem;
			border-radius: 50%;

			@include stripes();
		}

		p {
			font-size: $font-l;
			font-family: $font-highlight;
			margin-top: $spacing * 1.5;
		}

		h1 {
			font-size: $font-title * 0.7;
			line-height: 1.1;
			letter-spacing: 0.03em;
			max-width: 90rem;
			margin-top: $spacing;
		}
	}

	&.dark {
		background-color: $background-dark;

		p,
		h1 {
			color: $white;
		}
	}
}

@media all and (min-width: $m) {
	.hero-figure {
		> div {
			figure {
				height: 100%;
			}

			div {
				height: auto;
				width: 60rem;
				padding: $spacing * 4 $spacing * 6;

				> p {
					text-overflow: ellipsis;
					overflow: hidden;
					max-height: 19em;
				}
			}
		}

		> article {
			justify-content: center;
			padding: $spacing * 7 $spacing * 6 $spacing * 4;

			h1 {
				font-size: $font-title;
			}
		}
	}
}
</style>
