<template functional>
	<span class="scroll-label" :class="{ sideway: props.sideway }">
		There is more
		<span>☞</span>
	</span>
</template>

<style lang="scss" scoped>
.scroll-label {
	display: block;
	position: absolute;
	top: $spacing * 2;
	right: 0;
	color: $black;
	font-size: $font-s;
	padding-right: $spacing * 2;

	> span {
		display: inline-block;
		margin-left: $spacing * 0.5;
		line-height: 1.6rem;
		font-size: 4em;
		transform: translateY(0.3em);
	}

	&.sideway {
		transform: rotate(90deg);
	}
}
</style>
