<template>
	<ul class="slider">
		<li class="item"></li>
		<li class="item"></li>
		<li class="item"></li>
		<li class="item"></li>
		<li class="item"></li>
	</ul>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Slider extends Vue {
	@Prop() slides;

	mounted() {}
}
</script>

<style scoped lang="scss">
.slider {
	display: grid;
	grid-gap: $spacing * 2;
	grid-template-rows: 1fr;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	width: 100%;
	height: 55rem;
	margin: 20rem auto;
}

.item {
	width: 40rem;
	height: 100%;
	background-color: $green;
	user-select: none;
	opacity: 0.6;
}
</style>
