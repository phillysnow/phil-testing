<template>
	<main class="story">
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
export default class Story extends Vue {
	async asyncData({ $prismic, error }: Options) {
		try {
			const document = (await $prismic.api.getSingle('story')).data;

			return {
				document,
			};
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' });
		}
	}
}
</script>
