<template>
	<nuxt-link to="/" itemprop="url" class="logo" :class="{ dark }">
		<svg>
			<use xlink:href="#logo" />
		</svg>
		<h3>
			the
			<br />Factor
			<br />
			<span>.</span>e
		</h3>
		<p :class="{ hide }">
			human first <br />
			digital agency
		</p>
	</nuxt-link>
</template>

<script>
import { Component, Vue, State } from 'nuxt-property-decorator';
@Component({})
export default class Logo extends Vue {
	@State dark;
	hide = false;

	mounted() {
		setTimeout(() => {
			this.hide = true;
		}, 500);
	}
}
</script>

<style lang="scss" scoped>
.logo {
	display: flex;
	align-items: center;
	text-decoration: none;
	width: 25rem;
	position: relative;

	svg {
		height: $spacing * 1.9;
		width: $spacing * 1.9;
	}

	h3 {
		font-family: sans-serif;
		font-size: 1.14rem;
		width: 2rem;
		color: $color;
		margin-left: $spacing * 2;
		text-transform: uppercase;
		line-height: 1.5;
		letter-spacing: 0.4em;
		opacity: 0;
		text-overflow: '';
		overflow: hidden;
		transition: 0.3s 0.3s linear opacity, 0.3s 0.3s $gom width;

		> span {
			display: inline-block;
			width: 0;
			opacity: 0;
		}
	}

	p {
		position: absolute;
		left: $spacing * 3.9;
		line-height: 1.4;
		color: $color;
		font-size: 1.5rem;
		font-family: $font-highlight;
		transition: 0.3s 0.6s linear opacity;

		&.hide {
			opacity: 0;
		}
	}

	&:hover {
		p {
			opacity: 0;
			transition: 0.3s linear opacity;
		}

		h3 {
			opacity: 1;
			width: 8rem;
		}
	}

	&.dark {
		h3 {
			color: $white;
		}

		p {
			color: $white;
		}

		svg {
			fill: $white;
		}
	}
}
</style>
