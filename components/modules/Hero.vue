<template>
	<section class="hero">
		<FigureImage v-if="data.page_image" classes="hero-image" :image="data.page_image" />
		<div class="hero-content">
			<h1 v-if="data.page_title">{{ $prismic.asText(data.page_title) }}</h1>
			<prismic-rich-text v-if="data.description" class="hero-text" :field="data.description" />
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

<style lang="scss">
.hero {
	height: 100vh;
	padding: 20vh $spacing * 8 0;
}

.hero-image {
	display: block;
	height: 55vh;
	margin: 0 auto;

	img {
		height: 100%;
	}
}

.hero-content {
	display: flex;
	justify-content: center;
	flex-direction: column;
	position: relative;

	h1 {
		font-size: $font-title;
		max-width: 50%;
	}
}

.hero-text {
	display: block;
}
</style>
