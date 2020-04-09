<template>
	<main class="case-post">
		<Hero :data="document" />
		<h1>case-post</h1>
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
export default class CasePost extends Vue {
	async asyncData({ $prismic, params, error }) {
		try {
			const document = (await $prismic.api.getByUID('case_post', params.uid)).data;

			return {
				document,
			};
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' });
		}
	}
}
</script>
<style lang="scss" scoped>
.case-post {
	height: 100%;
}
</style>
