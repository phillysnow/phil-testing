<template>
	<nav class="navigation" :class="{ active }">
		<button
			@click="toggleMenu"
			ref="toggleMenu"
			class="menu-button init"
			aria-expanded="false"
			aria-controls="menu"
		>
			menu
		</button>

		<ul id="menu" class="menu" hidden ref="menu" :style="menuStyling">
			<li
				v-for="menuLink in stateMenu.menu"
				:key="menuLink.id"
				@mouseover="cursorHover(true)"
				@mouseleave="cursorHover(false)"
				class="menu-item"
			>
				<prismic-link :field="menuLink.menu_link">{{ $prismic.asText(menuLink.menu_label) }}</prismic-link>
			</li>
		</ul>
	</nav>
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator';

@Component
export default class Navigation extends Vue {
	@State('menu') stateMenu: any;
	private menuStyling: object = {};
	private active: boolean = false;

	mounted() {
		setTimeout(() => {
			(this.$refs.toggleMenu as HTMLElement).classList.remove('init');
		}, 300);
	}

	toggleMenu() {
		if (!(this.$refs.menu as HTMLElement).hidden) {
			this.toggle();
			setTimeout(() => {
				this.menuStyling = {
					display: 'none',
				};
			}, 500);
		} else {
			this.menuStyling = {
				display: 'flex',
			};
			setTimeout(() => {
				this.toggle();
			}, 100);
		}
	}

	toggle() {
		const open = (this.$refs.toggleMenu as HTMLElement).getAttribute('aria-expanded') === 'true';
		(this.$refs.toggleMenu as HTMLElement).setAttribute('aria-expanded', `${!open}`);
		(this.$refs.menu as HTMLElement).hidden = !(this.$refs.menu as HTMLElement).hidden;
		this.active = !this.active;
	}

	cursorHover(value: boolean) {
		const cursor = document.querySelector('.cursor');

		if (!cursor) return;

		if (value) {
			cursor.classList.add('hover');
		} else {
			cursor.classList.remove('hover');
		}
	}
}
</script>

<style lang="scss" scoped>
@mixin rotated-text($num-letters: 100, $angle-span: 180deg, $angle-offset: 0deg) {
	$angle-per-char: $angle-span / $num-letters;

	@for $i from 1 through $num-letters {
		.char#{$i} {
			@include transform(rotate($angle-offset + $angle-per-char * $i));
		}
	}
}

.navigation {
	display: block;
	position: fixed;
	bottom: $spacing * 3;
	left: 50%;
}

.menu-button {
	background: $pink;
	width: 16rem;
	height: 16rem;
	border: 0;
	border-radius: 50%;
	font-size: $font-m;
	letter-spacing: 0.1rem;
}

.menu {
	display: none;
	position: absolute;
	top: -10rem;
	left: -20rem;
}

.menu-item {
	margin: 0 $spacing;

	a {
		font-size: $font-xl;
	}
}
</style>
