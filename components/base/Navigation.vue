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
			<li class="menu-item">
				<nuxt-link to="/" itemprop="url">Home</nuxt-link>
			</li>
			<li class="menu-item">
				<nuxt-link to="/projects" itemprop="url">Projects</nuxt-link>
			</li>
			<li class="menu-item">
				<nuxt-link to="/about" itemprop="url">About</nuxt-link>
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