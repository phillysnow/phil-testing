<template>
	<main class="default-post">
		<section class="hero">
			<div class="hero-content">
				<h1 v-if="doc.page_title">{{ $prismic.asText(doc.page_title) }}</h1>
				<prismic-rich-text v-if="doc.description" class="hero-text" :field="doc.description" />
			</div>
		</section>
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class DefaultPost extends Vue {
	async asyncData({ $prismic, params, error }) {
		try {
			const doc = await $prismic.api.getByUID('default', params.uid);

			return {
				doc,
			};
		} catch (e) {
			console.error(e);
			error({ statusCode: 404, message: 'Page not found' });
		}
	}
}
</script>
<style lang="scss" scoped>
.hero-content {
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: $spacing * 7 $spacing * 6 $spacing * 4;
	position: relative;

	p {
		font-size: $font-l;
		font-weight: bold;
		margin-top: $spacing * 1.5;
	}

	h1 {
		line-height: 1.1;
		letter-spacing: 0.03em;
		max-width: 90rem;
		margin-top: $spacing;
	}
}
</style>
