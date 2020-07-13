<template>
	<nav class="nav" :class="{ active: menuActive }">
		<transition name="button">
			<button
				v-if="!hidden"
				ref="toggleMenu"
				v-cursor-focus="'scale'"
				class="nav-button"
				:aria-expanded="menuActive"
				aria-controls="menu"
				@click="toggle()"
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
		</transition>
		<transition name="menu">
			<div v-show="menuActive" class="nav-menu">
				<ul v-if="stateMenu.top_menu" class="nav-top">
					<li
						v-for="item in stateMenu.top_menu"
						:key="item.id"
						v-cursor-focus="'scale'"
						class="nav-item"
						:style="delay(10)"
						@click="toggle()"
					>
						<prismic-link v-if="item.link" :field="item.link">{{
							$prismic.asText(item.label)
						}}</prismic-link>
					</li>
				</ul>
				<ul v-if="stateMenu.dynamic_menu" class="nav-dynamic">
					<li
						v-for="(item, index) in stateMenu.dynamic_menu"
						:key="item.link.id"
						v-cursor-focus="'scale'"
						class="nav-item"
						:style="delay(index)"
						@click="toggle()"
					>
						<prismic-link v-if="item.link" :field="item.link">{{
							$prismic.asText(item.label)
						}}</prismic-link>
					</li>
				</ul>
				<ul v-if="stateMenu.core_menu" class="nav-core">
					<li
						v-for="(item, index) in stateMenu.core_menu"
						:key="item.link.id"
						v-cursor-focus="'scale'"
						class="nav-item"
						:style="delay(index + 3)"
						@click="toggle()"
					>
						<prismic-link v-if="item.link" :field="item.link">{{
							$prismic.asText(item.label)
						}}</prismic-link>
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
	hidden = true;

	toggle() {
		this.menuActive = !this.menuActive;
		document.body.style.overflow = this.menuActive ? 'hidden' : '';
	}

	delay(i) {
		return { transitionDelay: `${i * 100 + 400}ms` };
	}

	mounted() {
		this.hidden = false;
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
	border: 2px solid $white;
	box-shadow: 0 0 4rem 0 rgba($black, 0.2);
	transition: 0.3s box-shadow;
	z-index: 2;
	outline: none;

	& svg {
		display: block;
		pointer-events: none;
		stroke: $background-dark;
		height: 32px;
		width: 32px;
	}

	& path {
		transition: 0.3s ease-in-out all;
		stroke-dasharray: 32;
		stroke-dashoffset: 0;
	}

	&:hover {
		box-shadow: 0 1rem 4rem 1rem rgba($black, 0.2);
	}
}

.nav {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	width: 100%;
	z-index: 3;
	bottom: $spacing * 1.5;

	&.active {
		.nav-button {
			background-color: $background-dark;
		}

		svg {
			stroke: $white;
		}

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
	position: fixed;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	top: 0;
	left: 0;
	background-color: $background-dark;
	padding: $spacing;

	> ul {
		display: flex;
		padding: $spacing 0;
	}
}

.nav-item {
	text-align: center;

	a {
		color: $color-light;
		font-size: $font-xxl;
		font-family: $font-highlight;
		text-decoration: none;
		padding: 1rem;
	}
}

ul.nav-top {
	flex-direction: column;
	order: 2;
	padding-bottom: $spacing * 6;

	.nav-item {
		padding-top: $spacing;
	}

	a {
		font-size: $font;
	}
}

ul.nav-core,
ul.nav-dynamic {
	display: flex;
	flex-direction: column;
	width: 100%;
	order: 1;

	@supports (display: grid) {
		display: grid;
		grid-template: repeat(3, 1fr) / 1fr;
		gap: $spacing;
	}
}

@media all and (min-width: $m) {
	.nav {
		bottom: $spacing * 3;
	}

	.nav-menu {
		justify-content: space-around;
		padding: $spacing * 6 $spacing * 4;

		> ul {
			margin: 0 auto;
			max-width: $max-widht;
			padding: $spacing 0;
		}
	}

	ul.nav-core,
	ul.nav-dynamic {
		flex-direction: row;

		@supports (display: grid) {
			grid-template: 1fr / repeat(3, 1fr);
			gap: $spacing * 1.5;
		}
	}

	.nav-item {
		text-align: left;

		a {
			font-size: $font-xxl * 1.15;
		}

		&:nth-child(2) {
			text-align: center;
		}

		&:nth-child(3) {
			text-align: right;
		}
	}

	ul.nav-top {
		flex-wrap: wrap;
		flex-direction: row;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;

		.nav-item {
			padding-top: 0;
			padding-bottom: $spacing;
			padding-right: $spacing * 2;

			a {
				font-size: $font;
			}

			&:last-child {
				padding-right: 0;
			}
		}
	}
}

// animations
.menu-enter-active {
	transition: opacity 0.5s;

	li {
		transition: transform 0.2s, opacity 0.3s;
	}
}

.menu-leave-active {
	transition: opacity 0.5s 0.5s;

	li {
		transition: transform 0.3s 0s, opacity 0.3s 0s !important;
	}
}

.menu-enter,
.menu-leave-to {
	opacity: 0;

	li {
		opacity: 0;
		transform: translateY(1em);
	}
}

.button-enter-active {
	transition: opacity 0.5s 0.6s, transform 0.5s 0.6s $gom;
}

.button-enter {
	opacity: 0;
	transform: scale(0);
}
</style>
