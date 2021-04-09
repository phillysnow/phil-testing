<template>
	<nav class="nav" :class="{ active: menuActive }">
		<transition name="button">
			<nuxt-link
				v-if="detailpage && routeBack"
				v-cursor-focus="'scale'"
				:to="routeBack"
				class="nav-back"
				aria-label="vorige pagina"
			>
				<svg>
					<use xlink:href="#chevron" />
				</svg>
			</nuxt-link>
		</transition>

		<transition name="button">
			<button
				v-if="!hidden"
				ref="toggleMenu"
				v-cursor-focus="'scale'"
				class="nav-button"
				:aria-expanded="menuActive"
				aria-controls="menu"
				aria-label="Menu"
				@click="toggle()"
			>
				<svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke-linejoin="round" stroke-width="9.5%">
					<path d="M1 8 L32 8" />
					<path d="M1 17 L32 17" />
					<path d="M1 26 L32 26" />
				</svg>
			</button>
		</transition>

		<transition name="menu">
			<div v-show="menuActive" class="nav-menu">
				<nuxt-link to="/"
					><span v-cursor-focus="'link'" @click="toggle()">Terug naar de homepage</span></nuxt-link
				>
				<ul v-if="stateMenu.dynamic_menu" class="nav-dynamic">
					<li
						v-for="(item, index) in stateMenu.dynamic_menu"
						:key="item.link.id"
						v-cursor-focus="'link'"
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
						v-cursor-focus="'link'"
						class="nav-item"
						:style="delay(index + 3)"
						@click="toggle()"
					>
						<prismic-link v-if="item.link" :field="item.link">{{
							$prismic.asText(item.label)
						}}</prismic-link>
					</li>
				</ul>

				<div class="nav-footer">
					<ul v-if="stateMenu.top_menu" class="nav-bottom">
						<li
							v-for="item in stateMenu.top_menu"
							:key="item.id"
							v-cursor-focus="'link'"
							:style="delay(10)"
							@click="toggle()"
						>
							<prismic-link v-if="item.link" :field="item.link">{{
								$prismic.asText(item.label)
							}}</prismic-link>
						</li>
					</ul>
					<p :style="delay(10)"><span>human first</span> digital agency</p>
				</div>
			</div>
		</transition>
	</nav>
</template>

<script>
import { Component, Vue, State } from 'nuxt-property-decorator';

@Component
export default class Navigation extends Vue {
	@State('menu') stateMenu;
	@State('routeBack') routeBack;
	@State('detailpage') detailpage;
	menuActive = false;
	hidden = true;

	toggle() {
		this.menuActive = !this.menuActive;
		document.body.style.overflow = this.menuActive ? 'hidden' : '';
		this.$gtm.push({
			event: 'tfe-event',
			'tfe-data': {
				category: 'Interaction',
				action: 'Menu',
				label: this.menuActive ? 'Open' : 'Closed',
			},
		});
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
	box-shadow: 0 1rem 4rem 0 rgba($black, 0.2);
	transition: box-shadow 0.3s;
	z-index: 2;
	outline: none;
	margin-bottom: $spacing * 5;

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
		box-shadow: 0 2rem 4rem 1rem rgba($black, 0.2);
	}
}

.nav-back {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: $spacing * 3;
	bottom: 0;
	width: $spacing * 2;
	height: $spacing * 2;
	margin-bottom: $spacing * 1.5;
	z-index: 2;
	outline: none;
	border-radius: 50%;
	background-color: $black;
	box-shadow: 0 1rem 4rem 0 rgba($black, 0.2);
	transition: background-color 0.3s;

	& svg {
		display: block;
		height: 22px;
		width: 22px;
		stroke: $white;
		transform: rotate(180deg);
	}

	&:hover {
		background-color: $green;
	}
}

.nav {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	width: 100%;
	z-index: 3;
	bottom: 0;
	height: 1px;

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
	padding: $spacing * 2 $spacing $spacing;

	> ul {
		display: flex;
		padding: $spacing 0 0;
	}

	> a {
		text-align: center;

		span {
			color: $pink;
			font-family: $font-highlight;
			font-size: $font;
		}
	}
}

.nav-footer {
	width: 100%;
	align-items: center;
	padding: $spacing 0 $spacing * 6;

	p {
		color: $white;
		font-size: $font * 0.8;
		line-height: 2.2;
		font-family: $font-highlight-light;
		text-align: center;

		> span {
			font-family: $font-highlight;
		}
	}

	ul {
		padding-bottom: $spacing;
	}

	li {
		text-align: center;
	}

	a {
		color: $white;
		font-size: $font * 0.8;
		font-family: $font-highlight-light;
		font-weight: normal;
		line-height: 2.2;
		letter-spacing: 0;
	}
}

ul.nav-core,
ul.nav-dynamic {
	display: flex;
	flex-direction: column;
	width: 100%;

	@supports (display: grid) {
		display: grid;
		grid-template: repeat(3, 1fr) / 1fr;
		gap: $spacing;
	}
}

// animations
.menu-enter-active {
	transition: opacity 0.5s;

	li,
	p,
	> a {
		transition: transform 0.2s, opacity 0.3s;
	}
}

.menu-leave-active {
	transition: opacity 0.5s 0.5s;

	li,
	p,
	> a {
		transition: transform 0.3s 0s, opacity 0.3s 0s !important;
	}
}

.menu-enter,
.menu-leave-to {
	opacity: 0;

	li,
	p,
	> a {
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

.nav-item {
	text-align: center;

	a {
		color: $color-light;
		font-size: $font-xxl;
		font-family: $font-highlight;
		padding: 1rem 0;
		transition: color 0.2s;

		&:hover {
			color: $green;
		}
	}
}

@media all and (min-width: $s) {
	.nav-button {
		margin-bottom: $spacing * 5.5;
	}

	.nav-back {
		margin-bottom: $spacing * 1.7;
	}
}

@media all and (min-width: $m) {
	.nav-button {
		margin-bottom: $spacing * 9.3;
	}

	.nav-back {
		margin-bottom: $spacing * 3.6;
	}

	.nav-menu {
		justify-content: space-between;
		padding: $spacing * 4 $spacing * 4 $spacing * 4;

		> ul,
		> div {
			margin: 0 auto;
			max-width: $max-widht;
			padding: $spacing 0 0;
		}
	}

	.nav-item {
		text-align: left;

		a {
			font-size: $font-xxl * 0.9;
		}

		&:nth-child(2) {
			text-align: center;
		}

		&:nth-child(3) {
			text-align: right;
		}
	}

	.nav-footer {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: space-between;

		p {
			position: relative;
			top: -0.3rem;
		}

		> ul {
			display: flex;
			padding-bottom: 0;
			order: 1;
		}

		a {
			padding: 0 $spacing * 0.5;
			border-right: 1px solid $pink;
		}

		li {
			&:last-child {
				a {
					border-right: none;
					padding-right: 0;
				}
			}
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

	@media all and (max-height: 820px) {
		.nav-button {
			margin-bottom: $spacing * 5;
		}

		.nav-back {
			margin-bottom: $spacing * 1.5;
		}
	}
}

@media all and (min-width: 901px) {
	.nav-item {
		a {
			font-size: $font-xxl * 1.15;
		}
	}
}
</style>
