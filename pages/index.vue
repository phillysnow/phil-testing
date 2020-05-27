<template>
	<main class="home">
		<ScrollIndicator />
		<Slider v-if="slides" :data="slides" local="false" start="0" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { ScrollIndicator } from '@/components/elements';

import { Slider } from '@/components/modules';

@Component({
	layout: 'home',
	components: {
		Slider,
		ScrollIndicator,
	},
})
export default class Index extends Vue {
	async asyncData({ $prismic, error }) {
		try {
			const document = (
				await $prismic.api.getSingle('home', { fetchLinks: ['case_post.title', 'case_post.subtitle'] })
			).data;

			return {
				document,
				slides: document.highlights,
			};
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' });
		}
	}
}
</script>
<style lang="scss" scoped>
.home {
	height: 100vh;
	position: relative;
	overflow: hidden;
	background-color: $background;
}
</style>
