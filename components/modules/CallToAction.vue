<template>
	<section class="cta">
		<div class="cta-content">
			<div
				v-if="data.primary.title && data.primary.title.length && data.primary.title[0].text"
				class="cta-header"
			>
				<h2>{{ name }}</h2>
				<h3>{{ $prismic.asText(data.primary.title) }}</h3>
				<prismic-link v-if="data.primary.link" :field="data.primary.link">
					{{ data.primary.label }} »
				</prismic-link>
			</div>
			<article>
				<h4
					v-if="data.primary.headline && data.primary.headline.length && data.primary.headline[0].text"
					class="headline"
				>
					{{ $prismic.asText(data.primary.headline) }}
				</h4>

				<prismic-rich-text v-if="data.primary.text" class="rich-text" :field="data.primary.text" />
			</article>
		</div>
	</section>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class CallToAction extends Vue {
	@Prop() data;
	@Prop() name;
}
</script>
<style lang="scss">
.cta-content {
	padding: $spacing * 6 $spacing;
	position: relative;
}

.cta-header {
	position: relative;
	padding: $spacing * 2 0 $spacing * 4;

	h2 {
		color: $pink;
		font-family: $font-highlight;
		font-size: $font;
	}

	h3 {
		font-size: $font-xxl;
		margin-top: 0;
	}

	a {
		display: inline-block;
		margin-top: $spacing;
		background-color: $white;
		padding: $spacing * 1.5 $spacing * 2;
		font-weight: bold;
		font-size: $font;
		color: $pink;
		box-shadow: 0 1rem 4rem -2rem rgba($black, 0.25);
	}

	&::before {
		position: absolute;
		content: '';
		display: block;
		height: 85%;
		top: 0;
		right: -$spacing;
		left: -$spacing;
		z-index: -1;

		@include stripes();
	}
}

.headline {
	font-family: $font-highlight;
	font-size: $font;
}

@media all and (min-width: $m) {
	.cta-content {
		display: grid;
		grid-template: 1fr / 40rem auto;
		position: relative;
		padding: $spacing * 6;
	}

	// 	.cta-image {
	// 		height: 100%;
	// 		width: 100%;
	// 		position: relative;

	// 		&::before {
	// 			content: none;
	// 		}

	// 		img {
	// 			opacity: 1;
	// 		}
	// 	}

	.cta-header {
		padding: $spacing * 2 $spacing * 2 0 0;

		&::before {
			right: $spacing * 2;
			width: 125%;
			left: auto;
		}

		a {
			display: block;
			transform: translateX(-4.6rem);
		}
	}
}
</style>
