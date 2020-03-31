<template>
	<div class="sphere">
		<div class="circle">
			<span class="bubble"></span>
			<span class="shadow"></span>
		</div>
	</div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class Sphere extends Vue {
	mounted() {
		const cards = document.querySelector('.circle');
		const images = document.querySelectorAll('.bubble');
		const backgrounds = document.querySelectorAll('.shadow');
		const range = 40;

		// const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
		const calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1); // thanks @alice-mx

		let timeout;
		document.addEventListener(
			'mousemove',
			({ x, y }) => {
				if (timeout) {
					window.cancelAnimationFrame(timeout);
				}

				timeout = window.requestAnimationFrame(() => {
					const yValue = calcValue(y, window.innerHeight);
					const xValue = calcValue(x, window.innerWidth);

					cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

					[].forEach.call(images, (image) => {
						image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
					});

					[].forEach.call(backgrounds, (background) => {
						background.style.transform = `translateX(${-xValue * 2}px) translateY(${-yValue * 2}px)`;
					});
				});
			},
			false
		);
	}
}
</script>

<style lang="scss" scoped>
.sphere {
	display: block;
	width: 10rem;
	height: 10rem;
	transform: translateX(40rem);
}

.circle {
	display: block;
	width: 10rem;
	height: 10rem;
	border-radius: 50%;
	position: relative;
	background: radial-gradient(circle at 50% 120%, #ddd, #c6c6c6 10%, #f7f7f7 80%, #ddd 100%);

	&::before {
		content: '';
		position: absolute;
		top: 1%;
		left: 5%;
		width: 90%;
		height: 90%;
		border-radius: 50%;
		background: radial-gradient(circle at 50% 0, #fff, rgba(255, 255, 255, 0) 58%);
		filter: blur(5px);
		z-index: 2;
	}
}

.bubble {
	display: inline-block;
	width: 100%;
	height: 100%;
	border-radius: 100%;
	position: relative;
	z-index: 1;
	background-color: transparent;

	&::before {
		content: '';
		filter: blur(0);
		height: 80%;
		width: 40%;
		background: radial-gradient(
			circle at 130% 130%,
			rgba(255, 255, 255, 0) 0,
			rgba(255, 255, 255, 0) 46%,
			rgba(255, 255, 255, 0.8) 50%,
			rgba(255, 255, 255, 0.8) 58%,
			rgba(255, 255, 255, 0) 60%,
			rgba(255, 255, 255, 0) 100%
		);
		transform: translateX(131%) translateY(58%) rotateZ(168deg) rotateX(10deg);
	}

	&::after {
		content: '';
		display: block;
		background: radial-gradient(
			circle at 50% 80%,
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 0) 74%,
			white 80%,
			white 84%,
			rgba(255, 255, 255, 0) 100%
		);
	}
}

.shadow {
	display: inline-block;
	width: 60%;
	height: 60%;
	border-radius: 100%;
	position: relative;
	z-index: -1;
	background-color: rgba($black, 0.2);
	box-shadow: 0 0 4rem 5rem rgba($black, 0.2);
}
</style>
