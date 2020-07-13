<template>
	<section class="partners">
		<article v-if="data.primary">
			<h2 v-if="data.primary.subtitle">{{ data.primary.subtitle }}</h2>
			<h3 v-if="data.primary.title">{{ $prismic.asText(data.primary.title) }}</h3>
			<prismic-rich-text v-if="data.primary.text" :field="data.primary.text" />
		</article>
		<ul v-if="data.items" class="partners-group">
			<li v-for="(item, index) in data.items" :key="index" class="partners-item">
				<prismic-link v-if="item.link" :field="item.link">
					<FigureImage class="partners-image" :image="item.image" />
				</prismic-link>
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
export default class Stack extends Vue {
	@Prop() data;
}
</script>

<style lang="scss">
.partners {
	padding: $spacing * 2 $spacing $spacing;

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

.partners-group {
	display: grid;
	grid-template: 1fr / repeat(4, 1fr);
	gap: $spacing * 1.5;
}

@media all and (min-width: $m) {
	.partners {
		padding: $spacing * 6;

		> article {
			padding-bottom: $spacing * 4;
		}
	}
}
</style>
