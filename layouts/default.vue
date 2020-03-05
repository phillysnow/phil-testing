<template>
	<div class="container">
		<Header />
		<Nuxt />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Header } from '@/components/base';

@Component({
	components: {
		Header,
	},
})
export default class Default extends Vue {}
</script>