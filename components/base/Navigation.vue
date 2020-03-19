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
			<li v-for="menuLink in $store.state.menu.menu" :key="menuLink.id">
				<prismic-link :field="menuLink.menu_link">{{ $prismic.asText(menuLink.menu_label) }}</prismic-link>
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
		console.log(this.$store.state.menu.menu);

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
	display: block;
	width: 40rem;
	height: 40rem;
	transform: translateX(20rem);
}

.menu-item {
	color: $pink;
	width: 40rem;
	height: 20rem;

	a {
		font-size: $font-xl;
	}
}
</style>
