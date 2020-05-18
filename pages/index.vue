<template>
	<main class="home">
		<span class="scroll-label">
			there is more
			<span>☞</span>
		</span>
		<Slider :data="slides" local="false" start="0" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { Hero, Slider } from '@/components/modules';

@Component({
	components: {
		Hero,
		Slider,
	},
})
export default class Index extends Vue {

	async asyncData({ $prismic, error }) {
		try {
			const document = (
				await $prismic.api.getSingle('home', { fetchLinks: ['case_post.page_image', 'case_post.title', 'case_post.subtitle'] })
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
}

.scroll-label {
	display: block;
	position: absolute;
	top: $spacing * 2;
	right: 0;
	color: $black;
	font-size: $font-s;
	padding-right: $spacing * 2;

	> span {
		display: inline-block;
		margin-left: $spacing * 0.5;
		font-size: $font-title;
		transform: translateY(1.3rem);
	}
}
</style>
