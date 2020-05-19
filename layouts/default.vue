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
		console.log(
			'%c ',
			'padding-left:100%;padding-top:50%;background-size:cover;background-image:url("https://i.giphy.com/media/MM0Jrc8BHKx3y/giphy.webp")'
		);
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

<style lang="scss">
/* playfair-display-800 - latin */
@font-face {
	font-family: 'Playfair Display';
	font-style: normal;
	font-weight: 800;
	src: local('Playfair Display'), url('../assets/fonts/playfair-display-v20-latin-800.woff2') format('woff2'),
		url('../assets/fonts/playfair-display-v20-latin-800.woff') format('woff');
}
</style>
