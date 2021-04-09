<template>
	<section class="footer">
		<div class="footer-content">
			<nuxt-link to="/" itemprop="url"> © theFactor.e </nuxt-link>
			<p>We ontwikkelen digitale toepassingen die een verschil maken voor mensen.</p>
		</div>
	</section>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss">
.footer {
	background-color: $background-dark;
}

.footer-content {
	display: flex;
	flex-direction: column-reverse;
	justify-content: space-between;
	height: 34rem;
	padding: $spacing * 2 $spacing $spacing * 6;

	p,
	a {
		font-size: $font * 0.8;
		color: $white;
		font-family: $font-highlight-light;
		max-width: 40rem;
	}

	a {
		font-family: $font-highlight;
	}
}

@media all and (min-width: $m + 1) {
	.footer-content {
		flex-direction: row;
		align-items: center;
		padding: $spacing $spacing * 6 $spacing;
	}
}

@media all and (min-width: $l) {
	.footer-content {
		height: 22rem;
		padding: $spacing $spacing * 6 $spacing;
	}
}
</style>
