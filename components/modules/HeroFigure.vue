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
				v-if="data.image && data.image.url && !alignRight"
				class="image--overlay-green"
				:class="{ 'image--align-right': alignRight }"
				:image="data.image"
			/>
		</div>

		<FigureImage
			v-if="data.image && data.image.url && alignRight"
			class="image--overlay-green"
			:class="{ 'image--align-right': alignRight }"
			:image="data.image"
		/>
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
			height: auto;
			bottom: 0;
			left: 0;
			position: absolute;
			padding: $spacing * 2 $spacing;
			background-color: $white;
			z-index: 2;

			strong {
				font-weight: bold;
			}
		}

		figure {
			height: 100%;

			&--align-right {
				position: absolute;
				right: 0;
			}
		}
	}

	> article {
		display: flex;
		flex-direction: column;
		padding: $spacing * 5 $spacing $spacing;
		height: 100vh;
		position: relative;

		&::after {
			@include stripes();

			content: '';
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 16rem;
			height: 16rem;
			border-radius: 50%;
		}

		p {
			font-size: $font-l;
			font-family: $font-highlight;
			margin-top: $spacing * 1.5;
		}

		h1 {
			@include break-long-word;

			font-size: $font-title * 0.5;
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

@media all and (min-width: $s) {
	.hero-figure {
		> div {
			div {
				padding: $spacing * 2 $spacing * 2;
			}
		}
	}
}

@media all and (min-width: $m) {
	.hero-figure {
		> article {
			padding: $spacing * 8 $spacing * 3 $spacing * 4;

			h1 {
				font-size: $font-title * 0.8;
			}
		}

		> div {
			background-color: $green;

			figure {
				height: 100%;
			}

			div {
				width: 60rem;
				padding: $spacing * 3 $spacing * 3;

				> p {
					text-overflow: ellipsis;
					overflow: hidden;
					max-height: 19em;
				}
			}
		}
	}
}

@media all and (min-width: $l) {
	.hero-figure {
		> article {
			padding: $spacing * 8 $spacing * 6 $spacing * 4;

			h1 {
				font-size: $font-title;
			}
		}
	}
}
</style>
