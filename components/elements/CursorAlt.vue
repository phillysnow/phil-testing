<template>
	<div class="cursor" :class="{ disable: this.$device.isMobileOrTablet }">
		<span class="sphere"></span>
	</div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import Kinet from 'kinet';

@Component({})
export default class CursorAlt extends Vue {
	mounted() {
		const kinet = new Kinet({
			acceleration: 0.2,
			friction: 0.4,
			names: ['x', 'y', 'z'],
		});

		kinet.animate('z', 1);

		document.addEventListener(
			'mousemove',
			(event) => {
				kinet.animate('x', event.clientX - window.innerWidth / 2);
				kinet.animate('y', event.clientY - window.innerHeight / 2);
			},
			{ passive: true }
		);

		document.addEventListener(
			'mousedown',
			(event) => {
				kinet.animate('z', 0.7);
			},
			{ passive: true }
		);

		document.addEventListener(
			'mouseup',
			(event) => {
				kinet.animate('z', 1);
			},
			{ passive: true }
		);

		kinet.on('tick', (instances) => {
			this.$el.style.transform = `translate3d(${instances.x.current}px, ${instances.y.current}px, 0) scale(${
				instances.z.current
			}) rotateX(${instances.x.velocity / 2}deg) rotateY(${instances.y.velocity / 2}deg)`;
		});
	}
}
</script>

<style lang="scss">
.cursor {
	display: none;
}

@media all and (min-width: $m) {
	* {
		cursor: none;
	}

	.sphere {
		display: block;
		position: absolute;
		width: 1.8rem;
		height: 1.8rem;
		top: -0.2rem;
		left: -0.15rem;
		background: $pink;
		border-radius: 50%;
		margin: -0.9rem 0 0 -0.9rem;
		pointer-events: none;
		transform: scale(1);
		z-index: 10;
		transition: 0.3s $gom transform;
	}

	.cursor {
		display: block;
		width: 1px;
		height: 1px;
		position: fixed;
		pointer-events: none;
		top: 50%;
		left: 50%;
		z-index: 5;
		will-change: transform;

		&.scale {
			.sphere {
				transform: scale(2);
			}
		}

		&.disable {
			display: none;
		}
	}
}
</style>
