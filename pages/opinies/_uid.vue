<template>
	<main class="opinion-post">
		<Hero :data="document" />
		<h1>opinion-post</h1>
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { Hero } from '@/components/modules';

@Component({
	components: {
		Hero,
	},
})
export default class OpinionPost extends Vue {
	async asyncData({ $prismic, error }) {
		try {
			const document = (await $prismic.api.getSingle('home')).data;

			return {
				document,
			};
		} catch (e) {
			console.error(e);
			error({ statusCode: 404, message: 'Page not found' });
		}
	}
}
</script>
