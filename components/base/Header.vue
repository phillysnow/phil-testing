<template>
	<header class="header">
		<Logo />
	</header>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { Logo } from '@/components/base';

@Component({
	components: {
		Logo,
	},
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.header {
	width: 100%;
	position: absolute;
	z-index: 2;
	padding: $spacing * 1.5 $spacing 0;
}

@media all and (min-width: $m) {
	.header {
		padding: $spacing * 2 $spacing * 2 0;
	}
}
</style>
