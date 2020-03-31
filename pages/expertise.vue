<template>
	<main class="expertise">
		<Hero :content="document" />
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
export default class Expertise extends Vue {
	async asyncData({ $prismic, error }) {
		try {
			const document = (await $prismic.api.getSingle('expertise')).data;

			return {
				document,
			};
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' });
		}
	}
}
</script>
