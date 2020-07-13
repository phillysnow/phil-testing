<template>
	<transition>
		<span
			v-if="appear"
			class="more"
			:class="{ 'more--sideway': sideway, 'more--animate': animate, dark }"
			@click="event()"
		>
			There is more
			<span>☞</span>
		</span>
	</transition>
</template>
<script>
import { Component, Vue, Prop, Emit, State } from 'nuxt-property-decorator';

@Component({})
export default class More extends Vue {
	@Prop() sideway;
	@State dark;
	animate = false;
	appear = false;

	@Emit('click')
	event() {
		return true;
	}

	mounted() {
		this.appear = true;
		setTimeout(() => {
			this.animate = true;
		}, 500);
	}
}
</script>

<style lang="scss" scoped>
.more {
	display: block;
	position: absolute;
	top: $spacing * 0.2;
	right: 0;
	font-family: $font-highlight;
	font-size: $font-s;
	padding-right: $spacing;
	z-index: 3;
	color: transparent;
	width: 9rem;
	user-select: none;

	> span {
		display: inline-block;
		margin-left: $spacing * 0.5;
		line-height: 1.6rem;
		font-size: 4em;
		transform: translateY(0.3em);
		color: $color;
	}

	&--sideway {
		display: none;
	}

	&--animate {
		> span {
			animation: point 2s 2 forwards;
		}
	}

	&.dark {
		color: $pink;

		> span {
			color: $pink;
		}
	}
}

@media all and (min-width: $m) {
	.more {
		top: $spacing * 2;
		padding-right: $spacing * 2;
		color: $color;
		width: 24rem;

		&--sideway {
			display: block;
			transform: rotate(90deg) translateY(-6.5em);
			padding-right: 0;
			position: fixed;
			top: 50%;
		}
	}
}

@keyframes point {
	0%,
	20%,
	60%,
	100% {
		transform: translateX(0) translateY(0.3em);
	}

	40%,
	80% {
		transform: translateX(0.5em) translateY(0.3em);
	}
}

.v-enter-active,
.v-leave-active {
	transition: opacity 1s;
}

.v-enter,
.v-leave-to {
	opacity: 0;
}
</style>
