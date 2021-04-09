<template>
	<section
		class="hero"
		:class="{
			dark,
		}"
	>
		<article>
			<p v-if="data.type">{{ $type(data.type) }}</p>
			<h1 v-if="data.title">{{ $prismic.asText(data.title) }}</h1>
			<p v-if="data.subtitle">{{ data.subtitle }}</p>
			<FigureImage v-if="data.image && data.image.url" :image="data.image" />
		</article>
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
export default class Hero extends Vue {
	@Prop() data;
	@State dark;
}
</script>

<style lang="scss">
.hero {
	position: relative;

	> article {
		display: flex;
		flex-direction: column;
		padding: $spacing * 5 $spacing 0;

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

		figure {
			margin-top: $spacing * 4;
		}
	}

	&.dark {
		background-color: $background-dark;

		p,
		h1 {
			color: $white;
		}
	}

	&--full {
		height: 100vh;
		min-height: -webkit-fill-available;
	}

	&--transparent {
		background-color: transparent;

		&.dark {
			background-color: transparent;
		}
	}
}

@media all and (min-width: $m) {
	.hero {
		> article {
			justify-content: center;
			padding: $spacing * 8 $spacing * 3 0;

			h1 {
				font-size: $font-title * 0.8;
			}

			p {
				font-size: $font-l;
			}
		}
	}
}

@media all and (min-width: $l) {
	.hero {
		> article {
			padding: $spacing * 8 $spacing * 6 0;

			h1 {
				font-size: $font-title;
			}

			p {
				font-size: $font-l;
			}
		}
	}
}
</style>
