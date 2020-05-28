<template>
	<section class="livequote">
		<div class="livequote-content">
			<EmbedYoutube :embed="data.video" />
			<article class="livequote-article">
				<div>
					<h2>{{ $prismic.asText(data.title) }}</h2>
					<p><span>_Marvin Reingoud</span> Concept & Design</p>
				</div>
			</article>
		</div>
	</section>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { FigureImage, ScrollIndicator, EmbedYoutube } from '@/components/elements';

@Component({
	components: {
		FigureImage,
		ScrollIndicator,
		EmbedYoutube,
	},
})
export default class LiveQuote extends Vue {
	@Prop() data;
}
</script>

<style lang="scss">
.livequote {
	padding: $spacing * 6 $spacing * 6 $spacing;
}

.livequote-content {
	display: grid;
	grid-template-columns: 40rem auto;
	position: relative;
	background-color: $white;
	box-shadow: 0 10rem 6rem -6rem rgba($grey, 0.2);

	@include stripes();
}

.livequote-article {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: $spacing * 2;

	> div {
		max-width: 60rem;
	}

	p {
		margin-top: $spacing * 2;

		> span {
			color: $pink;
			font-weight: bold;
		}
	}
}
</style>
