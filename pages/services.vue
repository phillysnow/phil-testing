<template>
	<main class="services">
		<Hero :content="document" />
		<h1>services</h1>
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
export default class Services extends Vue {
	async asyncData({ $prismic, error }) {
		try {
			const document = (await $prismic.api.getSingle('home')).data;

			return {
				document,
			};
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' });
		}
	}
}
</script>
