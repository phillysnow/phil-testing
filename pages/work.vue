<template>
	<main class="work">
		<Hero :content="document" />
	</main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Hero } from '@/components/modules';
import { Options } from '@/types';

@Component({
	components: {
		Hero,
	},
})
export default class Work extends Vue {
	async asyncData({ $prismic, error }: Options) {
		try {
			const document = (await $prismic.api.getSingle('work')).data;

			return {
				document,
			};
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' });
		}
	}
}
</script>
