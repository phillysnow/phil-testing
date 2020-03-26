<template>
	<span class="cursor"></span>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Kinet from 'kinet';

@Component({})
export default class CursorAlt extends Vue {
	// private links: NodeListOf<HTMLLinkElement>;

	mounted() {
		const kinet: any = new Kinet({
			acceleration: 0.08,
			friction: 0.3,
			names: ['x', 'y', 'z'],
		});

		kinet.animate('z', 1);

		document.addEventListener('mousemove', (event) => {
			kinet.animate('x', event.clientX - window.innerWidth / 2);
			kinet.animate('y', event.clientY - window.innerHeight / 2);
		});

		document.addEventListener('mousedown', (event) => {
			kinet.animate('z', 0.7);
		});

		document.addEventListener('mouseup', (event) => {
			kinet.animate('z', 1);
		});

		kinet.on('tick', (instances: any) => {
			(this.$el as HTMLElement).style.transform = `translate3d(${instances.x.current}px, ${
				instances.y.current
			}px, 0) scale(${instances.z.current}) rotateX(${instances.x.velocity / 2}deg) rotateY(${instances.y
				.velocity / 2}deg)`;
		});
	}
}
</script>

<style lang="scss" scoped>
.cursor {
	display: block;
	width: 1.8rem;
	height: 1.8rem;
	background: linear-gradient(to top left, #be0000, #fe0000);
	border-radius: 50%;
	position: fixed;
	top: 50%;
	left: 50%;
	margin: -0.9rem 0 0 -0.9rem;
	pointer-events: none;
	// mix-blend-mode: multiply;
	z-index: 10;
	transition: 0.3s $gom width, 0.3s $gom height;

	&.hover {
		width: 4rem;
		height: 4rem;
		mix-blend-mode: multiply;
	}
}
</style>
