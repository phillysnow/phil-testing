<template>
	<main class="home">
		<!-- {{ document.page_title }} -->
	</main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Index extends Vue {
	async asyncData({ $prismic, error }) {
		try {
			const document = (await $prismic.api.getSingle('test')).data;

			console.log(document);

			return {
				document,
			};
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' });
		}
	}
}
</script>
