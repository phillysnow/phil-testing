<template>
	<nav class="navigation" :class="{ active }">
		<button
			@click="toggleMenu"
			ref="toggleMenu"
			class="menu-button init"
			aria-expanded="false"
			aria-controls="menu"
			@mouseover="cursorHover(true, 'menu')"
			@mouseleave="cursorHover(false, 'menu')"
		></button>

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

<script>
import { Component, Vue, State } from 'nuxt-property-decorator';

@Component
export default class Navigation extends Vue {
	@State('menu') stateMenu;
	menuStyling = {};
	active = false;

	mounted() {
		setTimeout(() => {
			this.$refs.toggleMenu.classList.remove('init');
		}, 300);
	}

	toggleMenu() {
		if (!this.$refs.menu.hidden) {
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
		const open = this.$refs.toggleMenu.getAttribute('aria-expanded') === 'true';
		this.$refs.toggleMenu.setAttribute('aria-expanded', `${!open}`);
		this.$refs.menu.hidden = !this.$refs.menu.hidden;
		this.active = !this.active;
	}

	cursorHover(value, extraClass = '') {
		const cursor = document.querySelector('.cursor');
		if (!cursor) return;

		const classListItems = ['hover'];
		if (extraClass) classListItems.push(extraClass);

		if (value) {
			cursor.classList.add(...classListItems);
		} else {
			cursor.classList.remove(...classListItems);
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
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	width: 100%;
	bottom: $spacing * 3;
}

.menu-button {
	background: $pink;
	width: $spacing * 3.5;
	height: $spacing * 3.5;
	border: 0;
	border-radius: 50%;
	font-size: $font-m;
	letter-spacing: 0.1rem;
}

.menu {
	display: none;
	position: absolute;
	top: -5rem;
	left: 22%;
}

.menu-item {
	margin: 0 $spacing;

	a {
		font-size: $font-xl;
	}
}
</style>
