<template>
	<main class="case-post">
		<Hero :data="hero" />
		<Intro :data="intro" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { Hero, Intro } from '@/components/modules';

@Component({
	components: {
		Hero,
		Intro,
	},
})
export default class CasePost extends Vue {
	async asyncData({ $prismic, params, error }) {
		try {
			const doc = await $prismic.api.getByUID('case_post', params.uid);

			return {
				hero: {
					type: doc.type,
					title: doc.data.title,
					subtitle: doc.data.subtitle,
					page_image: doc.data.page_image,
					description: doc.data.description,
				},
				intro: {
					intro_image: doc.data.intro_image,
				},
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
