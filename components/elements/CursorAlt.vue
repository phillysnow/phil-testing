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
			names: ['x', 'y'],
		});

		document.addEventListener('mousemove', (event) => {
			kinet.animate('x', event.clientX - window.innerWidth / 2);
			kinet.animate('y', event.clientY - window.innerHeight / 2);
		});

		kinet.on('tick', (instances: any) => {
			(this.$el as HTMLElement).style.transform = `translate3d(${
				instances.x.current
			}px, ${instances.y.current}px, 0) rotateX(${instances.x.velocity /
				2}deg) rotateY(${instances.y.velocity / 2}deg)`;
		});
	}
}
</script>

<style lang="scss" scoped>
.cursor {
	display: block;
	width: $spacing;
	height: $spacing;
	background: linear-gradient(to top left, #be0000, #fe0000);
	border-radius: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	margin: -$spacing * 0.5 0 0 -$spacing * 0.5;
	pointer-events: none;
	mix-blend-mode: multiply;
	z-index: 20;
}
</style>
