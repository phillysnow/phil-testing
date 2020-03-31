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
	padding-left: $spacing * 4;
	padding-top: $spacing * 3;
	z-index: 2;
}
</style>
