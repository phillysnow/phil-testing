<template>
	<section class="harmonize">
		<article class="harmonize-content">
			<div class="harmonize-header">
				<p>2. Harmonize</p>
				<h2>{{ $prismic.asText(data.harmonize_title) }}</h2>
			</div>
			<ul class="harmonize-group">
				<li v-for="(item, index) in data.harmonize_list" :key="index">
					<h4 class="headline">
						<span>{{ `2.${index + 1} ` }}</span
						>{{ $prismic.asText(item.headline) }}
					</h4>
					<prismic-rich-text v-if="item.text" class="text" :field="item.text" />
				</li>
			</ul>
		</article>
	</section>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Harmonize extends Vue {
	@Prop() data;
}
</script>
<style lang="scss">
.harmonize-content {
	display: grid;
	grid-template-columns: 40rem auto;
	padding: $spacing * 6 $spacing * 6 $spacing;
}

.harmonize-header {
	padding-right: $spacing * 2;

	p {
		color: $pink;
		font-weight: bold;
	}
}

.harmonize-group {
	padding-left: $spacing;

	.headline {
		font-family: $font-base;
		font-weight: bold;

		> span {
			color: $pink;
		}
	}

	.text {
		padding: $spacing * 0.5 0 $spacing * 2;
	}

	li:last-of-type {
		.text {
			padding-bottom: 0;
		}
	}
}
</style>
