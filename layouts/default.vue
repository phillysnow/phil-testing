<template>
	<div class="container">
		<Header />
		<Nuxt />
		<CursorAlt />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Header } from '@/components/base';
import { CursorAlt } from '@/components/elements';

@Component({
	components: {
		Header,
		CursorAlt,
	},
})
export default class Default extends Vue {}
</script>
