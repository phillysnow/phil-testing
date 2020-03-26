<template> </template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Slider extends Vue {
	@Prop() slides;

	mounted() {}
}
</script>

<style lang="scss">
.hooper {
	width: 100%;
	margin: 0 auto;
}

.hooper-list {
	perspective: 100rem;
}

.hooper-track {
	display: flex;
	transform-style: preserve-3d;
}

.hooper-slide {
	display: block;
	width: 30rem;
	height: 60rem;
	padding: $spacing;
	background: $grey;
	color: $white;
	font-size: 5rem;
	transition: 0.3s $gom all;
}
</style>
