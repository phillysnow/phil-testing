<template>
	<section class="text-list">
		<article>
			<header v-if="data.primary.title.length && data.primary.title[0].text" class="text-list-header">
				<h2 v-if="name">{{ `${number ? `${number}.` : ''} ${name}` }}</h2>
				<h3>{{ $prismic.asText(data.primary.title) }}</h3>
			</header>
			<div v-else class="text-list-spacer"></div>
			<ul class="text-list-group">
				<li v-for="(item, index) in data.items" :key="index">
					<h4 v-if="item.headline.length && item.headline[0].text">
						<span v-if="number">{{ `${number}.${index + 1} ` }}</span
						>{{ $prismic.asText(item.headline) }}
					</h4>
					<prismic-rich-text v-if="item.text" class="rich-text" :field="item.text" />
				</li>
			</ul>
		</article>
	</section>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class TextList extends Vue {
	@Prop() data;
	@Prop() number;
	@Prop() name;
}
</script>

<style lang="scss">
.text-list {
	padding: $spacing * 6 $spacing $spacing;

	article {
		display: grid;
		grid-template: auto 1fr / 100%;
	}
}

.text-list-header {
	padding-bottom: $spacing * 2;

	h2 {
		color: $pink;
		font-family: $font-highlight;
		font-size: $font;
	}

	h3 {
		font-size: $font-xxl;
	}
}

.text-list-group {
	display: grid;
	grid-template: 1fr / 1fr;
	gap: $spacing * 2 $spacing * 3;
	padding-left: $spacing;

	> li {
		width: 100%;
	}

	h4 {
		font-family: $font-highlight;
		font-size: $font;

		> span {
			font-family: $font-highlight;
			color: $pink;
		}
	}

	.rich-text {
		padding-top: $spacing * 0.5;
	}
}

.text-list--single {
	.text-list-group {
		display: grid;
		grid-template: 1fr / 1fr;
		gap: unset;

		> li {
			padding-bottom: $spacing * 2;

			&:last-of-type {
				padding-bottom: 0;
			}
		}
	}
}

@media all and (min-width: $m) {
	.text-list-group {
		grid-template: 1fr / 1fr 1fr;
	}

	.text-list-header {
		padding-bottom: 0;
		padding-right: $spacing * 2;
	}

	.text-list {
		padding: $spacing * 6 $spacing * 6 $spacing;

		article {
			display: grid;
			grid-template: 1fr / 40rem auto;
		}
	}
}
</style>
