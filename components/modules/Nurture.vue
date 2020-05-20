<template>
	<section class="nurture">
		<article class="nurture-content">
			<div class="nurture-header">
				<p>3. Nurture</p>
				<h2>{{ $prismic.asText(data.nurture_text) }}</h2>
			</div>
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
	</section>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Nurture extends Vue {
	@Prop() data;
}
</script>
<style lang="scss">
.nurture-content {
	display: grid;
	grid-template-columns: 1fr 2fr;
	padding: $spacing * 2 $spacing * 6 $spacing * 2;
}

.nurture-header {
	display: block;
	padding-right: $spacing;

	p {
		color: $pink;
		font-weight: bold;
	}
}

.nurture-group {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: $spacing;
	padding-left: $spacing;

	.title {
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
