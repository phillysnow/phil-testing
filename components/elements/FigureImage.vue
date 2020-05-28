<template>
	<figure :class="[{ loading }, classes]">
		<picture>
			<source
				v-if="image.max"
				type="image/webp"
				:media="`(min-width: ${image.max.dimensions.width}px)`"
				:srcset="image.max.url"
			/>
			<source
				v-if="image.xl"
				type="image/webp"
				:media="`(min-width: ${image.xl.dimensions.width}px)`"
				:srcset="image.xl.url"
			/>
			<source
				v-if="image.l"
				type="image/webp"
				:media="`(min-width: ${image.l.dimensions.width}px)`"
				:srcset="image.l.url"
			/>
			<source
				v-if="image.m"
				type="image/webp"
				:media="`(min-width: ${image.m.dimensions.width}px)`"
				:srcset="image.m.url"
			/>
			<img
				v-if="image"
				:src="image.url"
				:width="width(image.dimensions)"
				:height="height(image.dimensions)"
				:alt="image.alt"
				loading="lazy"
				@load="onLoaded"
			/>
		</picture>
	</figure>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class FigureImage extends Vue {
	@Prop() image;
	@Prop() classes;
	loading = true;

	onLoaded() {
		// this.$emit('loaded', true);
		this.loading = false;
	}

	width(dim) {
		if (!dim) return '0';
		return dim.width;
	}

	height(dim) {
		if (!dim) return '0';
		return dim.height;
	}
}
</script>

<style lang="scss">
img {
	display: block;
	width: 100%;
	height: 100%;
	max-width: 100%;
	object-fit: cover;
	transition: 0.5s ease-in-out opacity;
}

figure {
	height: 100%;
	overflow: hidden;

	&.loading {
		img {
			opacity: 0;
		}
	}

	&.overlay--green {
		background-color: $green;

		img {
			opacity: 0.25;
			filter: grayscale(100%);
		}

		@supports (mix-blend-mode: multiply) {
			img {
				mix-blend-mode: multiply;
				opacity: 0.7;
			}
		}
	}
}
</style>
