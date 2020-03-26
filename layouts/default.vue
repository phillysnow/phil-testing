<template>
	<div class="container">
		<Header />
		<Nuxt />
		<Navigation />
		<CursorAlt />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Action } from 'nuxt-property-decorator';
import { Header, Navigation } from '@/components/base';
import { CursorAlt } from '@/components/elements';
import { Options } from '@/types';

@Component({
	components: {
		Header,
		Navigation,
		CursorAlt,
	},
})
export default class Default extends Vue {
	// set navigation for all routes
	async middleware({ store, $prismic }: Options) {
		await store.dispatch('fetchMenu', $prismic);
	}
}
</script>
