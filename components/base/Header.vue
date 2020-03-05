<template>
	<header class="header">
		<Logo />
	</header>
</template>

<script lang="ts">
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
	padding: $spacing;
}
</style>