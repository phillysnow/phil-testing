<template>
	<div class="logo">
		<svg version="1" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 310 310">
			<path
				d="M0 155v155h310V0H0v155zm283-95v33l-94.7.2-94.8.3-.3 94.8L93 283H27V27h256v33zm0 95v33l-47.2.2-47.3.3-.3 47.2-.2 47.3h-66V122h161v33zm0 95v33h-66v-66h66v33z"
			/>
		</svg>
		<h3>
			the
			<br />Factor
			<br />
			<span>.</span>e
		</h3>
	</div>
</template>

<style lang="scss" scoped>
.logo {
	display: flex;
	align-items: center;
	width: 24rem;

	svg {
		height: $spacing * 3;
		width: $spacing * 3;
	}

	h3 {
		font-size: $font-s;
		width: 2rem;
		margin-left: $spacing * 2;
		text-transform: uppercase;
		line-height: 1.5;
		letter-spacing: 0.4em;
		opacity: 0;
		text-overflow: '';
		overflow: hidden;
		transition: 0.3s linear opacity, 0.3s $gom width;

		> span {
			display: inline-block;
			width: 0;
			opacity: 0;
		}
	}

	&:hover {
		h3 {
			opacity: 1;
			width: 12rem;
		}
	}
}
</style>
