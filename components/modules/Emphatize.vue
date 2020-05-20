<template>
	<section class="emphatize">
		<article class="emphatize-content">
			<div class="emphatize-header">
				<p>1. Emphatize</p>
				<h2>{{ $prismic.asText(data.emphatize_title) }}</h2>
			</div>
			<ul class="emphatize-group">
				<li v-for="(item, index) in data.emphatize_list" :key="index">
					<h4 class="headline">
						<span>{{ `1.${index + 1} ` }}</span
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
export default class Emphatize extends Vue {
	@Prop() data;
}
</script>
<style lang="scss">
.emphatize-content {
	display: grid;
	grid-template-columns: 1fr 2fr;
	padding: $spacing * 2 $spacing * 6 $spacing * 2;
}

.emphatize-header {
	display: block;
	padding-right: $spacing;

	p {
		color: $pink;
		font-weight: bold;
	}
}

.emphatize-group {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: $spacing;
	padding-left: $spacing;

	.headline {
		font-family: $font-base;
		font-weight: bold;

		> span {
			color: $pink;
		}
	}

	.text {
		padding-top: $spacing * 0.5;

		p {
			font-size: $font;
			font-weight: 100;
			line-height: 1.8;
		}
	}
}
</style>
