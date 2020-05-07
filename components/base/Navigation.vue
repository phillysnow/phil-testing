<template>
	<nav class="nav" :class="{ active: menuActive }">
		<button
			@click="toggle()"
			ref="toggleMenu"
			class="nav-button"
			aria-expanded="false"
			aria-controls="menu"
			@mouseover="cursorHover(true, 'menu')"
			@mouseleave="cursorHover(false, 'menu')"
		></button>
		<transition name="menu">
			<div v-show="menuActive" class="nav-menu">
				<ul v-if="stateMenu.top_menu" class="nav-top">
					<li
						v-for="item in stateMenu.top_menu"
						:key="item.id"
						@click="toggle()"
						@mouseover="cursorHover(true)"
						@mouseleave="cursorHover(false)"
						class="nav-item"
					>
						<prismic-link v-if="item.link" :field="item.link">{{ $prismic.asText(item.label) }}</prismic-link>
					</li>
				</ul>
				<ul v-if="stateMenu.dynamic_menu" class="nav-dynamic">
					<li
						v-for="item in stateMenu.dynamic_menu"
						:key="item.link.id"
						@click="toggle()"
						@mouseover="cursorHover(true)"
						@mouseleave="cursorHover(false)"
						class="nav-item"
					>
						<prismic-link v-if="item.link" :field="item.link">{{ $prismic.asText(item.label) }}</prismic-link>
					</li>
				</ul>
				<ul v-if="stateMenu.core_menu" class="nav-core">
					<li
						v-for="item in stateMenu.core_menu"
						:key="item.link.id"
						@click="toggle()"
						@mouseover="cursorHover(true)"
						@mouseleave="cursorHover(false)"
						class="nav-item"
					>
						<prismic-link v-if="item.link" :field="item.link">{{ $prismic.asText(item.label) }}</prismic-link>
					</li>
				</ul>
			</div>
		</transition>
	</nav>
</template>

<script>
import { Component, Vue, State } from 'nuxt-property-decorator';

@Component
export default class Navigation extends Vue {
	@State('menu') stateMenu;
	menuActive = false;

	toggle() {
		this.menuActive = !this.menuActive;
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
@mixin rotated-text(
	$num-letters: 100,
	$angle-span: 180deg,
	$angle-offset: 0deg
) {
	$angle-per-char: $angle-span / $num-letters;

	@for $i from 1 through $num-letters {
		.char#{$i} {
			@include transform(rotate($angle-offset + $angle-per-char * $i));
		}
	}
}

.nav {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	width: 100%;
	bottom: $spacing * 3;
}

.nav-button {
	background: $pink;
	width: $spacing * 3.5;
	height: $spacing * 3.5;
	border: 0;
	z-index: 2;
	border-radius: 50%;
	font-size: $font-m;
	letter-spacing: 0.1rem;
}

.nav-menu {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: $background;
	padding: $spacing * 6 $spacing * 4;

	> ul {
		display: flex;
		padding: $spacing 0;
	}
}

.nav-item {
	padding-left: $spacing;

	a {
		color: $color;
		font-size: $font-xl;
		text-decoration: none;
		text-transform: capitalize;
	}

	&:first-child {
		padding-left: 0;
	}
}

// animations
.menu-enter-active,
.menu-leave-active {
	transition: opacity 0.5s, transform 0.3s;
}

.menu-enter,
.menu-leave-to {
	opacity: 0;
	transform: translateY(20rem);
}
</style>
