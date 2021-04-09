<template>
	<section
		class="hero-intro"
		:class="{
			'hero-intro--up': scrollClass,
			dark,
		}"
	>
		<article>
			<p v-if="data.type">{{ $type(data.type) }}</p>
			<h1 v-if="data.title">{{ $prismic.asText(data.title) }}</h1>
			<p v-if="data.subtitle">{{ `${append || ''}${data.subtitle}` }}</p>
		</article>
		<div v-if="data.intro_text">
			<div>
				<h2 v-if="data.intro_subtitle">{{ data.intro_subtitle }}</h2>
				<h3 v-if="data.intro_title">{{ $prismic.asText(data.intro_title) }}</h3>
				<prismic-rich-text v-if="data.intro_text" :field="data.intro_text" />
			</div>
		</div>
	</section>
</template>

<script>
import { Component, Vue, Prop, State } from 'nuxt-property-decorator';

@Component({})
export default class HeroIntro extends Vue {
	@Prop() data;
	@State dark;
	@Prop() append;
	scrollClass = false;
	scrollPosition = 0;
	ticking = false;

	scroll = (e) => this.animate();
	scrollNextSection = (e) => this.scollToNextSection();

	mounted() {
		const plainIntroText = this.$prismic.asText(this.data.intro_text);

		if (plainIntroText) {
			window.addEventListener('scroll', this.scroll, { passive: true });

			setTimeout(() => {
				if (window.scrollY <= 2) {
					window.scrollTo(0, 1);
				}
			}, 1600);
		} else {
			window.addEventListener('scroll', this.scrollNextSection, { passive: true });
		}
	}

	beforeDestroy() {
		if (this.data.intro_text) {
			window.removeEventListener('scroll', this.scroll, { passive: true });
		} else {
			window.removeEventListener('scroll', this.scrollNextSection, { passive: true });
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

	scollToNextSection() {
		const element = document.scrollingElement || document.documentElement;
		this.$scrollTo(element, window.innerHeight, 1500);
		window.removeEventListener('scroll', this.scrollNextSection, { passive: true });
	}
}
</script>

<style lang="scss">
.hero-intro {
	background-color: $green;
	height: calc(100vh + 1px);
	min-height: -webkit-fill-available;
	position: relative;
	overflow: hidden;

	&--up {
		> div {
			transform: translate3d(0, -100vh, 0);
		}
	}

	> div {
		display: flex;
		align-items: center;
		height: calc(100vh + 1px);
		padding: $spacing * 5 $spacing $spacing;
		background-color: $white;
		will-change: transform;
		transition: 1.2s ease transform;

		> * {
			margin: 0 auto;
			max-width: 80rem;
		}

		h2 {
			color: $pink;
			font-size: $font;
			font-family: $font-highlight;
		}

		h3 {
			font-size: $font-xxl;
			margin-top: $spacing;
		}

		p {
			margin-top: $spacing;
			font-family: $font-highlight;
		}
	}

	> article {
		display: flex;
		flex-direction: column;
		padding: $spacing * 5 $spacing $spacing;
		height: 100vh;

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

		> div {
			background-color: $background-dark;
		}

		p,
		h1,
		h3 {
			color: $white;
		}
	}
}

@media all and (min-width: $m) {
	.hero-intro {
		> div {
			padding: $spacing * 7 $spacing * 3 $spacing * 6;
		}

		> article {
			padding: $spacing * 8 $spacing * 3 $spacing * 4;

			h1 {
				font-size: $font-title * 0.8;
			}
		}
	}
}

@media all and (min-width: $l) {
	.hero-intro {
		> div {
			padding: $spacing * 7 $spacing * 6 $spacing * 6;
		}

		> article {
			padding: $spacing * 8 $spacing * 6 $spacing * 4;

			h1 {
				font-size: $font-title;
			}
		}
	}
}
</style>
