<template>
	<section class="figure">
		<div class="figure-content">
			<FigureImage v-if="data.image" class="figure-image" :image="data.image" />
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
export default class FigureModule extends Vue {
	@Prop() data;
}
</script>

<style lang="scss">
.figure {
	padding: $spacing * 7 0 $spacing;
	position: relative;
}

.figure-image {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 42rem;

	@include stripes();

	&::after {
		content: '';
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 26rem;
		height: 26rem;
		background-color: $green;
		border-radius: 50%;
		opacity: 0.2;

		@supports (mix-blend-mode: multiply) {
			opacity: 1;
			mix-blend-mode: multiply;
		}
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(100%);
	}
}

@media all and (min-width: $m) {
	.figure {
		padding: $spacing * 7 $spacing * 6 $spacing;
	}

	.figure-image {
		height: 52rem;
	}
}

@media all and (min-width: $xl) {
	.figure-image {
		height: 72rem;
	}
}
</style>
