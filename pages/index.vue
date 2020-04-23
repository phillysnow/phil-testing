<template>
	<main class="home">
		<Slider :data="slides" />
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
	transition: {
		name: 'test',
		mode: 'in-out',
	},
})
export default class Index extends Vue {
	async asyncData({ $prismic, error }) {
		try {
			const document = (await $prismic.api.getSingle('home', {fetchLinks: ['case_post.page_image', 'case_post.page_title'] })).data;
			
			return {
				document,
				slides: document.highlights
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

// .test-enter-active {
// 	animation: slide-in-from-right 5s ease-out;
// }

@keyframes slide-in-from-right {
	0% {
		transform: translateX(10rem) rotateZ(4deg);
		opacity: 0;
	}

	100% {
		transform: translateX(0) rotateZ(0);
		opacity: 1;
	}
}
</style>
