<template>
	<main class="home">
		<span class="scroll-label">
			There is more
			<span>☞</span>
		</span>
		<Slider :data="slides" local="false" start="0" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { Slider } from '@/components/modules';

@Component({
	components: {
		Slider,
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
		line-height: 1.6rem;
		font-size: 4em;
		transform: translateY(0.3em);
	}
}
</style>
