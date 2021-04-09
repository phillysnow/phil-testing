<template>
	<main class="error">
		<figure>
			<picture>
				<img :src="image" alt="" />
			</picture>
		</figure>
		<article>
			<h1 class="title">{{ message() }}</h1>
			<p v-if="statusCode() === 404" class="description">
				<NuxtLink class="error-link" to="/">Terug naar home <span>☞</span></NuxtLink>
			</p>
			<p v-else class="description">
				An error occurred while rendering the page. Check developer tools console for details.
			</p>
		</article>
	</main>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
	head() {
		return {
			title: `${this.message()} | theFactor.e`,
		};
	},
})
export default class Error extends Vue {
	@Prop() error;

	image = require(`@/assets/images/error.gif`);

	statusCode() {
		return (this.error && this.error.statusCode) || 500;
	}

	message() {
		return (this.error && this.error.message) || 'Error';
	}

	// lifecycles
	mounted() {
		this.$store.commit('SET_THEME', true);
	}
}
</script>
<style lang="scss" scoped>
.error {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	height: 100vh;
	width: 100%;
}

h1,
p {
	color: $white;
}

p {
	font-size: $font-l;
}

a {
	font-family: $font-highlight;
	font-size: $font-l;
	padding-right: $spacing;
	color: $green;

	> span {
		display: inline-block;
		margin-left: $spacing * 0.5;
		line-height: 1.6rem;
		font-size: 3em;
		transform: translateY(0.3em);
		transition: 0.3s;
	}

	&:hover {
		span {
			transform: translateY(0.3em) translateX(0.2em);
		}
	}
}

article {
	max-width: 60rem;
	margin: 0 auto;
	text-align: center;
}

figure {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;

	img {
		display: block;
		width: 100%;
		height: 100%;
		max-width: 100%;
		object-fit: cover;
	}
}
</style>
