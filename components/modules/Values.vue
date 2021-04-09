<template>
	<section class="values" :class="{ dark }">
		<ul class="values-list">
			<li v-for="(item, index) in data.items" :key="index">
				<article>
					<h2 v-if="item.subtitle">{{ item.subtitle }}</h2>
					<h3 v-if="item.title">{{ $prismic.asText(item.title) }}</h3>
					<prismic-rich-text v-if="item.text" :field="item.text" />
				</article>
			</li>
		</ul>
		<div>
			<figureVideo
				v-if="data.primary.video"
				:video="data.primary.video"
				:poster="data.primary.poster"
				parent="values"
			/>
		</div>
	</section>
</template>
<script>
import { Component, Vue, Prop, State } from 'nuxt-property-decorator';
import { FigureVideo } from '@/components/elements';

@Component({
	components: {
		FigureVideo,
	},
})
export default class Values extends Vue {
	@Prop() data;
	@State dark;
}
</script>

<style lang="scss">
.values-list {
	article {
		display: flex;
		justify-content: center;
		flex-direction: column;
		height: 100vh;
		padding: 0 $spacing * 2 0 $spacing * 6;

		h2 {
			color: $pink;
			font-family: $font-highlight;
			font-size: $font;
		}

		h3 {
			margin-top: 0;
			font-size: $font-xxl;
		}
	}
}

.values {
	display: grid;
	grid-template: 1fr / 60rem auto;
	padding: $spacing * 6 0 0;

	> div {
		position: relative;
	}

	figure {
		top: 0;
		position: sticky;
		height: 100vh;
		overflow: hidden;

		video {
			height: 100%;
			width: 177.77777778vh; /* 100 * 16 / 9 */
			min-width: 100%;
			min-height: 56.25vw; /* 100 * 9 / 16 */
			position: absolute;
			left: 50%; /* % of surrounding element */
			top: 50%;
			z-index: -1;
			transform: translate(-50%, -50%); /* % of current element */
		}
	}

	&.dark {
		background-color: $background-dark;
		color: $white;

		h3 {
			color: $white;
		}
	}
}
</style>
