<template>
	<section class="hero">
		<div class="hero-content">
			<p v-if="data.type">{{ type(data.type) }}</p>
			<h1 v-if="data.title">{{ $prismic.asText(data.title) }}</h1>
			<p v-if="data.subtitle">{{ $prismic.asText(data.subtitle) }}</p>
		</div>
		<div v-if="data.description || data.image" class="hero-description">
			<prismic-rich-text v-if="data.description" class="hero-text" :field="data.description" />
			<FigureImage v-if="data.image" classes="overlay--green" :image="data.image" />
		</div>
	</section>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { FigureImage } from '@/components/elements';

@Component({
	components: {
		FigureImage,
	},
})
export default class Hero extends Vue {
	@Prop() data;

	type(value) {
		const type = value.split('_');

		return type[0] ? `${type[0]}/` : '';
	}
}
</script>

<style lang="scss" scoped>
.hero {
	background-color: $green;
}

.hero-content {
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: $spacing * 7 $spacing * 6 $spacing * 4;
	position: relative;

	p {
		font-size: $font-l;
		font-weight: bold;
		margin-top: $spacing * 1.5;
	}

	h1 {
		line-height: 1.1;
		letter-spacing: 0.03em;
		max-width: 90rem;
		margin-top: $spacing;
	}
}

.hero-description {
	height: 80vh;
	position: relative;
}

.hero-text {
	width: 60rem;
	bottom: 0;
	left: 0;
	position: absolute;
	padding: $spacing * 4 $spacing * 6;
	background-color: $white;
	z-index: 2;
}
</style>
