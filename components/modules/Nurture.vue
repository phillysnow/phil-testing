<template>
	<section class="nurture">
		<article class="nurture-content">
			<article class="nurture-article">
				<p class="bold">3. Nurture</p>
				<h2>{{ $prismic.asText(data.nurture_title) }}</h2>
				<p class="headline"><span>3.1</span> {{ $prismic.asText(data.nurture_headline) }}</p>
				<prismic-rich-text v-if="data.nurture_text" class="text" :field="data.nurture_text" />
				<ul class="nurture-group">
					<li v-for="(item, index) in data.nurture_list" :key="index">
						<p class="title">
							<span>{{ `3.${index + 1} ` }}</span
							>{{ $prismic.asText(item.title) }}
						</p>
						<prismic-rich-text v-if="item.text" class="text" :field="item.text" />
					</li>
				</ul>
			</article>
			<FigureImage v-if="data.nurture_image" :image="data.nurture_image" />

			<!-- nurture_title: doc.data.nurture_title,
					nurture_image: doc.data.nurture_image,
					nurture_headline: doc.data.nurture_headline,
					nurture_text: doc.data.nurture_text,
					nurture_list: doc.data.nurture_list, -->
		</article>
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
export default class Nurture extends Vue {
	@Prop() data;
}
</script>
<style lang="scss">
.nurture {
	padding-top: $spacing * 4;
}

.nurture-content {
	display: grid;
	grid-template-columns: 40rem auto;
	background-color: $white;
	padding: $spacing * 3 $spacing * 6 $spacing * 3;

	@include stripes();
}

.nurture-article {
	display: block;
	padding-right: $spacing;

	.bold {
		font-weight: bold;
		color: $pink;
	}

	h2 {
		margin: 0 0 $spacing * 2;
	}

	.headline {
		font-weight: bold;

		> span {
			color: $pink;
		}
	}

	.text {
		p {
			font-size: $font;
			font-weight: 100;
			line-height: 1.8;
		}
	}
}

.nurture-group {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: $spacing;
	padding-left: $spacing;
}
</style>
