<template>
	<section class="hero">
		<div class="hero-content">
			<p>{{ type(data.type) }}</p>
			<h1 v-if="data.title">{{ $prismic.asText(data.title) }}</h1>
			<p>{{$prismic.asText(data.subtitle)}}</p>
			<prismic-rich-text v-if="data.description" class="hero-text" :field="data.description" />
		</div>
		<FigureImage v-if="data.page_image" classes="hero-image" :image="data.page_image" />
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

	type(value) {
		const type = value.split('_');
		
		return type[0] ? `${type[0]}/` : 'Oeps I broke it';
	}
}
</script>

<style lang="scss">
.hero {
	padding: 20vh 0 0;
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
