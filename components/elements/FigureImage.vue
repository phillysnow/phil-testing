<template>
	<figure class="image">
		<picture>
			<source v-if="image.max" type="image/webp" media="(min-width: 1670px)" :srcset="image.max.url" />
			<source v-if="image.xl" type="image/webp" media="(min-width: 1200px)" :srcset="image.xl.url" />
			<source v-if="image.l" type="image/webp" media="(min-width: 992px)" :srcset="image.l.url" />
			<source v-if="image.m" type="image/webp" media="(min-width: 768px)" :srcset="image.m.url" />
			<source v-if="image" type="image/webp" :srcset="image.url" />
			<img
				v-if="image"
				:src="image.url"
				:width="width(image.dimensions)"
				:height="height(image.dimensions)"
				:alt="image.alt"
				loading="lazy"
				@load="onLoaded()"
			/>
		</picture>
	</figure>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class FigureImage extends Vue {
	@Prop() image;
	loading = true;

	onLoaded() {
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

.image {
	height: 100%;
	overflow: hidden;

	&--overlay-green {
		background-color: $green;

		img {
			opacity: 0.25;
			filter: grayscale(100%);
		}

		@supports (mix-blend-mode: multiply) {
			img {
				mix-blend-mode: multiply;
				opacity: 0.9;
			}
		}
	}

	&--align-right {
		img {
			position: absolute;
			bottom: 0;
			right: 0;
			z-index: -1;
			width: auto;
			height: calc(100% - 45rem);
		}
	}
}

@media all and (min-width: $m) {
	.image {
		&--align-right {
			img {
				height: auto;
				width: calc(100% - 60rem);
				max-width: 1200px;
				margin-left: 40%;
				object-position: 0% 50%;
				z-index: 0;
			}
		}
	}
}
</style>
