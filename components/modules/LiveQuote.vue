<template>
	<section class="livequote">
		<div class="livequote-content">
			<figureVideo
				v-if="data.primary.video"
				:video="data.primary.video"
				:poster="data.primary.poster"
				parent="livequote"
			/>
			<article>
				<div>
					<h2>{{ $prismic.asText(data.primary.quote) }}</h2>
					<p>
						<span>{{ `_${data.primary.name}` }}</span> {{ data.primary.position }}
					</p>
				</div>
			</article>
		</div>
	</section>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { FigureVideo } from '@/components/elements';

@Component({
	components: {
		FigureVideo,
	},
})
export default class LiveQuote extends Vue {
	@Prop() data;
}
</script>

<style lang="scss" scoped>
.livequote {
	padding: $spacing * 2 $spacing * 0.5 $spacing * 2;
}

.livequote-content {
	position: relative;
	background-color: $white;
	box-shadow: 0 10rem 6rem -6rem rgba($grey, 0.2);

	@include stripes();

	> figure {
		max-height: 50rem;
	}
}

article {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: $spacing * 2 $spacing;

	> div {
		max-width: 70rem;
	}

	h2 {
		@include break-long-word;

		text-overflow: ellipsis;
		overflow: hidden;
		max-height: 7.7em;
	}

	p {
		margin-top: $spacing * 2;
		font-family: $font-head;
		font-style: italic;

		> span {
			color: $pink;
			font-style: normal;
			font-weight: bold;
		}
	}
}

section.livequote .livequote-content {
	padding-bottom: 0;
}

@media all and (min-width: $m) {
	.livequote {
		padding: $spacing * 5 $spacing * 3 $spacing * 2;
	}

	.livequote-content {
		display: grid;
		grid-template: 60rem / 40rem auto;

		> figure {
			max-height: inherit;
		}
	}

	article {
		padding: $spacing * 2;
	}
}

@media all and (min-width: $l) {
	.livequote {
		padding: $spacing * 6 $spacing * 6 $spacing * 2;
	}
}
</style>
