<template>
	<section class="intro-text" :class="{ dark }">
		<div class="intro-text-content">
			<h2 v-if="data.primary.subtitle">{{ data.primary.subtitle }}</h2>
			<h3 v-if="data.primary.title">{{ $prismic.asText(data.primary.title) }}</h3>
			<prismic-rich-text v-if="data.primary.text" :field="data.primary.text" />
		</div>
	</section>
</template>

<script>
import { Component, Vue, Prop, State } from 'nuxt-property-decorator';

@Component({})
export default class Intro extends Vue {
	@Prop() data;
	@State dark;
}
</script>

<style lang="scss">
.intro-text-content {
	padding: $spacing * 7 $spacing * 6 $spacing * 6;
	min-height: 60rem;

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
	}
}

.intro-text {
	&.dark {
		background-color: $background-dark;
		color: $white;

		h3 {
			color: $white;
		}
	}
}
</style>
