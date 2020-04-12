<template>
	<div class="container">
		<Header />
		<Nuxt />
		<Navigation />
		<CursorAlt v-if="breakingPoint !== 's'" />
	</div>
</template>

<script>
import { Component, Vue, Action } from 'nuxt-property-decorator';
import { Header, Navigation } from '@/components/base';
import { CursorAlt } from '@/components/elements';
import BreakPoint from '@/plugins/breakpoint';

@Component({
	components: {
		Header,
		Navigation,
		CursorAlt,
	},
})
export default class Default extends Vue {
	breakingPoint = '';

	mounted() {
		const breakPoint = new BreakPoint();
		breakPoint.init();

		this.breakingPoint = window.breakPoint;
	}

	// set navigation for all routes
	async middleware({ store, $prismic }) {
		await store.dispatch('fetchMenu', $prismic);
	}
}
</script>
