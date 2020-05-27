<template>
	<section class="footer">
		<div class="footer-content">
			<p>© theFactor.e</p>
			<p>
				We ontwikkelen digitale toepassingen die een verschil maken voor mensen.
			</p>
		</div>
	</section>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss">
.footer {
	background-color: $black;
}

.footer-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40rem;
	padding: $spacing $spacing * 6 $spacing;

	p {
		font-size: $font-s * 0.9;
		color: $white;
		max-width: 30rem;
	}
}
</style>
