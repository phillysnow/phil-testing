<template>
	<transition>
		<button
			v-if="appear && !theEnd"
			v-cursor-focus="cursorState()"
			class="more"
			:class="{ 'more--sideway': sideway, 'more--animate': animate, 'more--end': theEnd, dark }"
			@click="event()"
		>
			There is more
			<svg>
				<use xlink:href="#hand" />
			</svg>
		</button>
		<button
			v-else-if="appear"
			class="more more--end"
			:class="{ 'more--sideway': sideway, 'more--animate': animate, dark }"
		>
			That was it
		</button>
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
	timeout = 200;
	theEnd = false;
	text = 'There is more';
	scroll = () => this.pageTracking();

	cursorState() {
		return this.sideway ? 'more-down' : 'more';
	}

	@Emit('click')
	event() {
		this.$gtm.push({
			event: 'tfe-event',
			'tfe-data': {
				category: 'Interaction',
				action: 'There is more',
				label: this.sideway ? 'vertical' : 'horizontal',
			},
		});
		return true;
	}

	mounted() {
		this.appear = true;
		setTimeout(() => {
			this.animate = true;
		}, 500);

		if (this.sideway) {
			document.addEventListener('scroll', this.scroll, { passive: true });
		}
	}

	pageTracking() {
		if (this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
				this.theEnd = true;
			} else {
				this.theEnd = false;
			}
			// update timeout time too
		}, 200);
	}
}
</script>

<style lang="scss" scoped>
.more {
	display: block;
	position: absolute;
	top: $spacing * 1.4;
	right: 6rem;
	font-family: $font-highlight;
	font-size: $font-s;
	padding-right: $spacing * 2;
	z-index: 3;
	background-color: transparent;
	color: transparent;
	outline: none;
	border: none;
	user-select: none;

	> svg {
		display: inline-block;
		position: absolute;
		margin-left: $spacing * 0.5;
		width: 3em;
		height: 2em;
		top: -0.6em;
		right: -0.5rem;
		color: $color;
	}

	&--sideway {
		display: none;

		> svg {
			right: -5.5rem;
		}
	}

	&--animate {
		> svg {
			animation: point 2s 2 forwards;
		}
	}

	&--end {
		> svg {
			color: transparent;
		}
	}

	&.dark {
		color: $pink;

		> svg {
			fill: $pink;
		}
	}
}

@media all and (min-width: $s) {
	.more {
		top: $spacing * 1.8;
		color: $color;
	}
}

@media all and (min-width: $m) {
	.more {
		top: $spacing * 2.3;

		&--sideway {
			display: block;
			transform: rotate(90deg) translateY(-6.5em);
			padding-right: 0;
			position: fixed;
			top: 50%;
		}

		&--end {
			transform: rotate(90deg) translateY(-5.8em);
		}
	}
}

@media all and (min-width: $l) {
	.more {
		&--sideway {
			transform: rotate(90deg) translateY(-4em);
		}

		&--end {
			transform: rotate(90deg) translateY(-3.6em);
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
