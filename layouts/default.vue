<template>
	<div class="container">
		<Header />
		<Nuxt />
		<Navigation />
		<CursorAlt />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Header, Navigation } from '@/components/base';
import { CursorAlt } from '@/components/elements';

@Component({
	components: {
		Header,
		Navigation,
		CursorAlt,
	},
})
export default class Default extends Vue {
	async middleware({ store, $prismic }) {
		await store.dispatch('fetchMenu', $prismic);
	}
}
</script>
