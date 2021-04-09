<template>
	<section class="partners">
		<article v-if="data.primary">
			<h2 v-if="data.primary.subtitle">{{ data.primary.subtitle }}</h2>
			<h3 v-if="data.primary.title">{{ $prismic.asText(data.primary.title) }}</h3>
			<prismic-rich-text v-if="data.primary.text" :field="data.primary.text" />
		</article>
		<ul v-if="data.items" class="partners-group">
			<li v-for="(item, index) in data.items" :key="index" class="partners-item">
				<prismic-link v-if="item.link.url" :field="item.link">
					<FigureImage class="partners-image" :image="item.image" />
				</prismic-link>
				<div v-else>
					<FigureImage class="partners-image" :image="item.image" />
				</div>
			</li>
		</ul>
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
export default class Partners extends Vue {
	@Prop() data;
}
</script>

<style lang="scss">
.partners {
	@include section-padding();

	> article {
		margin: 0 auto;
		max-width: 80rem;

		h2 {
			color: $pink;
			font-size: $font;
			font-family: $font-highlight;
		}

		h3 {
			font-size: $font-xxl;
			margin-top: 0;
		}
	}
}

ul.partners-group {
	display: grid;
	grid-template: 1fr / repeat(2, 1fr);
	gap: $spacing * 1.5;
	padding: $spacing * 3 0 $spacing;
}

.partners-image {
	filter: grayscale(100%);
	transition: 0.3s ease filter;
}

.partners-item {
	&:hover {
		.partners-image {
			filter: grayscale(0%);
		}
	}
}

@media all and (min-width: $m) {
	.partners {
		@include section-padding('m');
	}

	ul.partners-group {
		grid-template: 1fr / repeat(3, 1fr);
		padding: $spacing * 4 0 $spacing;
	}
}

@media all and (min-width: $l) {
	.partners {
		@include section-padding('l');
	}

	ul.partners-group {
		grid-template: 1fr / repeat(4, 1fr);
		padding: $spacing * 5 0 $spacing * 2;
	}
}
</style>
