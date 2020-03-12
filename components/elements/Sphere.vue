<template>
	<div class="circle">
		<span class="bubble"></span>
	</div>
</template>

<style lang="scss" scoped>
.circle {
	display: block;
	width: 10rem;
	height: 10rem;
	transform: translateX(40rem);
	border-radius: 50%;
	position: relative;
	background: radial-gradient(
		circle at 50% 120%,
		#ddd,
		#c6c6c6 10%,
		#f7f7f7 80%,
		#ddd 100%
	);

	&::before {
		content: '';
		position: absolute;
		top: 1%;
		left: 5%;
		width: 90%;
		height: 90%;
		border-radius: 50%;
		background: radial-gradient(
			circle at 50% 0,
			#fff,
			rgba(255, 255, 255, 0) 58%
		);
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
		transform: translateX(131%) translateY(58%) rotateZ(168deg)
			rotateX(10deg);
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
</style>
