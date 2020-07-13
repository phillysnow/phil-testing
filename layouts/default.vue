<template>
	<div class="container">
		<Sprite />
		<Header />
		<Nuxt />
		<Cookie />
		<Navigation />
		<CursorAlt v-if="point !== 's'" />
		<Footer />
	</div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { Header, Navigation, Footer, Sprite, Cookie } from '@/components/base';
import { CursorAlt } from '@/components/elements';

@Component({
	components: {
		Header,
		Navigation,
		CursorAlt,
		Sprite,
		Cookie,
		Footer,
	},
})
export default class Default extends Vue {
	point = '';

	mounted() {
		this.point = window.breakPoint;
	}

	// set navigation for all routes
	async middleware({ store, $prismic }) {
		await store.dispatch('fetchMenu', $prismic);
	}
}
</script>

<style lang="scss">
@include font-family();
@include transition();
</style>
