<template>
	<main class="case-post">
		<Hero :data="document" />
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
			const doc = (await $prismic.api.getByUID('case_post', params.uid));
			
			return {
				document: {
					type: doc.type,
					...doc.data
				}
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
