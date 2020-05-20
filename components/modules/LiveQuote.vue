<template>
	<section class="livequote">
		<div class="livequote-content">
			<figure></figure>
			<article>
				<h2>{{ $prismic.asText(data.livequote_title) }}</h2>
			</article>
		</div>
	</section>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { FigureImage, ScrollIndicator } from '@/components/elements';

@Component({
	components: {
		FigureImage,
		ScrollIndicator,
	},
})
export default class LiveQuote extends Vue {
	@Prop() data;
}
</script>

<style lang="scss">
.livequote-content {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: $spacing $spacing * 6 $spacing;
	position: relative;
}
</style>
