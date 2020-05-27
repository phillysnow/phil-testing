<template>
	<section class="nurture">
		<div class="nurture-content">
			<article>
				<p class="bold">3. Nurture</p>
				<h2>{{ $prismic.asText(data.nurture_title) }}</h2>
				<p class="headline"><span>3.1</span> {{ $prismic.asText(data.nurture_headline) }}</p>
				<prismic-rich-text v-if="data.nurture_text" :field="data.nurture_text" />
				<ul class="nurture-group">
					<li v-for="(item, index) in data.nurture_list" :key="index">
						<prismic-link v-if="item.link" :field="item.link"
							>{{ $prismic.asText(item.label) }} >></prismic-link
						>
					</li>
				</ul>
			</article>
			<FigureImage v-if="data.nurture_image" :image="data.nurture_image" />
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
export default class Nurture extends Vue {
	@Prop() data;
}
</script>
<style lang="scss" scoped>
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

article {
	padding-right: $spacing * 2;

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
}

figure {
	height: 100%;
	max-height: 120rem;
	// max-width: 80rem;
}

.nurture-group {
	padding-top: $spacing * 2;

	a {
		display: block;
		background-color: $white;
		padding: $spacing * 1.5 $spacing * 2;
		color: $grey;
		text-decoration: none;
		font-weight: bold;
	}

	li {
		border-top: 1px solid $light-grey;

		&:first-child {
			border-top: none;
		}

		&:nth-child(odd) {
			a {
				color: $pink;
			}
		}
	}
}
</style>
