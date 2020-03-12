<template>
	<nav class="navigation" :class="{ active }">
		<button
			@click="toggleMenu"
			ref="toggleMenu"
			class="menu-button init"
			aria-expanded="false"
			aria-controls="menu"
		>menu</button>

		<ul id="menu" class="menu" hidden ref="menu" :style="menuStyling">
			<li class="menu-item top">
				<svg width="100%" height="100%" viewBox="0 0 262 262">
					<path d="M 148 139
					m -97, 0
					a 97,97 0 1,0 -194,0" id="path-top" />
					<text>
						<textPath xlink:href="#path-top">
							<nuxt-link to="/" itemprop="url">Home</nuxt-link>
							<nuxt-link to="/" itemprop="url">Home</nuxt-link>
							<nuxt-link to="/" itemprop="url">Home</nuxt-link>
						</textPath>
					</text>
				</svg>
			</li>
			<li class="menu-item bottom">
				<svg width="100%" height="100%" viewBox="0 0 262 262">
					<path d="M 148 139
					m -97, 0
					a 97,97 0 1,0 -194,0" id="path-bottom" />
					<text>
						<textPath xlink:href="#path-bottom">
							<nuxt-link to="/" itemprop="url">Home</nuxt-link>
							<nuxt-link to="/" itemprop="url">Home</nuxt-link>
							<nuxt-link to="/" itemprop="url">Home</nuxt-link>
						</textPath>
					</text>
				</svg>
			</li>
		</ul>
	</nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Navigation extends Vue {
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
		const open =
			(this.$refs.toggleMenu as HTMLElement).getAttribute(
				'aria-expanded'
			) === 'true';
		(this.$refs.toggleMenu as HTMLElement).setAttribute(
			'aria-expanded',
			`${!open}`
		);
		(this.$refs.menu as HTMLElement).hidden = !(this.$refs
			.menu as HTMLElement).hidden;
		this.active = !this.active;
	}
}
</script>

<style lang="scss" scoped>
.nav {
	display: block;
	position: fixed;
	bottom: 0;
	left: 50%;
}

.menu-button {
	background: $pink;
}

.menu {
	display: flex;
}

.menu-item {
	color: $pink;
}
</style>
