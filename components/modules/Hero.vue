<template>
	<section class="hero">
		<div class="hero-content">
			<h1 v-if="content.page_title">{{ $prismic.asText(content.page_title) }}</h1>
			<prismic-rich-text v-if="content.description" class="hero-text" :field="content.description" />
		</div>
	</section>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class Hero extends Vue {
	@Prop() content;
}
</script>

<style lang="scss" scoped>
.hero {
	height: 20vh;
}

.hero-content {
	display: flex;
	justify-content: center;
	flex-direction: column;
	position: relative;
	height: 100%;
	margin: 0 auto;
	max-width: $max;
	padding: $spacing * 2;

	h1 {
		font-size: $font-title;
		max-width: 50%;
	}

	@media all and (min-width: $m) {
		padding: $spacing * 2 $spacing * 4;
	}
}

.hero-text {
	display: block;
}
</style>
