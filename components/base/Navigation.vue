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
		>
			<svg
				aria-label="Menu"
				viewBox="0 0 32 32"
				width="16"
				height="16"
				fill="none"
				stroke-linejoin="round"
				stroke-width="9.5%"
			>
				<path d="M1 8 L32 8" />
				<path d="M1 17 L32 17" />
				<path d="M1 26 L32 26" />
			</svg>
		</button>
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
.nav-button {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: $white;
	width: $spacing * 3.5;
	height: $spacing * 3.5;
	border-radius: 50%;
	border: 0;
	z-index: 2;

	& svg {
		display: block;
		pointer-events: none;
		stroke: $black;
		height: 32px;
		width: 32px;
	}

	& path {
		transition: 0.3s ease-in-out all;
		stroke-dasharray: 32;
		stroke-dashoffset: 0;
	}
}

.nav {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	width: 100%;
	z-index: 3;
	bottom: $spacing * 3;

	&.active {
		path {
			stroke-dashoffset: 0;

			&:nth-child(1) {
				transform: rotate(-45deg) translateY(8px);
				transform-origin: center;
			}

			&:nth-child(3) {
				transform: rotate(45deg) translateY(-10px);
				transform-origin: center;
			}
		}

		path:nth-child(2) {
			opacity: 0;
			stroke-dashoffset: 32;
		}
	}
}

.nav-menu {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: var(--color);
	padding: $spacing $spacing * 4 $spacing * 6;

	> ul {
		display: flex;
		padding: $spacing 0;
	}
}

.nav-item {
	padding-left: $spacing;

	a {
		color: var(--background);
		font-size: $font-title;
		font-weight: 800;
		text-decoration: none;
		text-transform: capitalize;
	}

	&:first-child {
		padding-left: 0;
	}
}

.nav-top {
	position: absolute;
	top: 0;

	a {
		font-size: $font-s;
		font-weight: 400;
	}
}

.nav-core,
.nav-dynamic {
	display: flex;
	width: 100%;
	justify-content: space-between;
}

// animations
.menu-enter-active {
	transition: opacity 0.5s;

	ul {
		transition: transform 0.3s 0.5s, opacity 0.3s 0.5s;
	}
}

.menu-leave-active {
	transition: opacity 0.5s 0.5s;

	ul {
		transition: transform 0.3s, opacity 0.3s;
	}
}

.menu-enter,
.menu-leave-to {
	opacity: 0;

	ul {
		opacity: 0;
		transform: translateY(4rem);
	}
}
</style>
