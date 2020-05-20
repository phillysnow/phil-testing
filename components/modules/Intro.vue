<template>
	<section class="intro">
		<div class="intro-content">
			<FigureImage v-if="data.intro_image" classes="intro-image" :image="data.intro_image" />
			<ScrollIndicator :sideway="true" />
		</div>
	</section>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { FigureImage, ScrollIndicator } from '@/components/elements';

@Component({
	components: {
		FigureImage,
		ScrollIndicator,
	},
})
export default class Intro extends Vue {
	@Prop() data;
}
</script>

<style lang="scss">
.intro-content {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: $spacing * 7 $spacing * 6 $spacing * 4;
	position: relative;

	.scroll-label {
		top: 52%;
		right: -5rem;
	}
}

.intro-image {
	position: relative;
	overflow: hidden;

	&::after {
		content: '';
		display: block;
		position: absolute;
		top: calc(80% - 26rem);
		left: calc(69% - 26rem);
		width: 26rem;
		height: 26rem;
		background-color: $green;
		border-radius: 50%;
		opacity: 0.2;

		@supports (mix-blend-mode: multiply) {
			opacity: 0.5;
			mix-blend-mode: multiply;
		}
	}

	img {
		filter: grayscale(100%);
	}
}
</style>
