<template>
	<section class="hero">
		<FigureImage v-if="data.page_image" classes="hero--image" :image="data.page_image" />
		<div class="hero--content">
			<h1 v-if="data.page_title">{{ $prismic.asText(data.page_title) }}</h1>
			<prismic-rich-text v-if="data.description" class="hero--text" :field="data.description" />
		</div>
	</section>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { FigureImage } from '@/components/elements';

@Component({
	components: {
		FigureImage
	}
})
export default class Hero extends Vue {
	@Prop() data;
	
}
</script>

<style lang="scss" scoped>
.hero {
	height: 40vh;
}

.hero--image {
	display: block;
	max-width: 90%;
	height: 55rem;
	margin: 20rem auto;

	img {
		height: 100%;
	}
}

.hero--content {
	display: flex;
	justify-content: center;
	flex-direction: column;
	position: relative;
	height: 100%;
	margin: 0 auto;
	max-width: $max;
	padding: $spacing;

	h1 {
		font-size: $font-title;
		max-width: 50%;
	}

	@media all and (min-width: $s) {
		padding: $spacing * 2;
	}

	@media all and (min-width: $m) {
		padding: $spacing * 2 $spacing * 4;
	}
}

.hero--text {
	display: block;
}
</style>
