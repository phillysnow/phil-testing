<template>
	<div class="cookie">
		<p>
			Door deze website te gebruiken, gaat u akkoord met onze 🍪
			<a href="/legal/cookie-policy">cookie policy</a>
		</p>
		<button>
			<i class="close">close</i>
		</button>
	</div>
</template>

<style lang="scss" scoped>
.cookie {
	display: block;
	position: fixed;
	bottom: $spacing * 1.5;
	background-color: $green;
	left: 0;
	right: 0;
	width: 20rem;
}
</style>
