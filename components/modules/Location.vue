<template>
	<section id="location" class="location">
		<div>
			<ul v-if="link.items" class="links-group">
				<li v-for="(item, index) in link.items" :key="index">
					<prismic-link
						v-if="item.link && item.label"
						class="links-item"
						:class="{
							'links-item--light': item.white || item.phone,
							'links-item--dark': !item.white && !item.phone,
						}"
						:field="item.link"
					>
						{{ item.label }}
						<span v-if="item.white">✎</span>
						<span v-if="item.phone">☏</span>
						<span v-if="!item.white && !item.phone">➚</span>
					</prismic-link>
				</li>
			</ul>
			<ul v-if="location.items" class="location-group">
				<li v-for="(item, index) in location.items" :key="index" class="location-item">
					<h4 v-if="item.location || item.type" class="location-title">
						<span>{{ item.location }}</span
						>, {{ item.type || 'bezoekadres' }}
					</h4>
					<p v-if="item.street">{{ item.street }}</p>
					<p v-if="item.postcode && item.location">{{ item.postcode }} {{ item.location }}</p>
					<a v-if="item.telephone" :href="`tel:${item.telephone}`">{{ item.telephone }}</a>
					<prismic-link v-if="item.route.url" class="link" :field="item.route"
						>Route <span>›</span></prismic-link
					>
				</li>
			</ul>
		</div>
		<transition>
			<template v-if="slideUp">
				<FigureImage v-if="link.primary.image.url" :image="link.primary.image" />
			</template>
		</transition>
		<span class="background-dark"></span>
	</section>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { FigureImage } from '@/components/elements';

@Component({
	components: {
		FigureImage,
	},
})
export default class Location extends Vue {
	@Prop() link;
	@Prop() location;

	slideUp = false;

	mounted() {
		setTimeout(() => {
			this.slideUp = true;
		}, 300);
	}
}
</script>

<style lang="scss" scoped>
.location-group {
	display: grid;
	grid-template: 1fr / 1fr;
	gap: $spacing * 1.5;
	padding-top: $spacing * 2;
}

.location-title {
	font-size: $font;
	font-family: $font-highlight-light;
	color: $white;
	padding-bottom: $spacing;

	> span {
		font-family: $font-highlight;
	}
}

.links-item {
	display: block;
	padding: $spacing $spacing * 3.5 $spacing $spacing * 2;
	font-family: $font-highlight;
	position: relative;
	min-width: 36rem;
	transition: all 0.3s;

	> span {
		position: absolute;
		display: inline-block;
		right: $spacing * 2;
		color: $pink;
		font-size: 2em;
		line-height: 1em;
		padding-left: 0.5em;
		transition: color 0.3s;
	}

	&--light {
		border: 1px solid $white;
		background-color: $white;
		color: $color;
	}

	&--dark {
		border: 1px solid $white;
		color: $white;

		> span {
			transform: translateY(0.16em);
		}
	}

	&:hover {
		border: 1px solid $green;
		background-color: $green;
		color: $color;

		> span {
			color: $color;
		}
	}
}

.location-item {
	p {
		color: $white;
	}

	a {
		display: block;
		color: $white;
	}

	.link {
		font-family: $font-highlight;

		> span {
			display: inline-block;
			color: $pink;
			font-size: 2em;
			line-height: 1em;
			transform: translateY(0.16em);
		}
	}

	figure {
		height: auto;
		padding-bottom: $spacing;
		max-width: 35rem;
	}
}

.location {
	@include section-padding();

	> div {
		display: grid;
		grid-template: auto 1fr / 100%;
	}

	article {
		padding-bottom: $spacing * 2;

		h2 {
			color: $pink;
			font-family: $font-highlight;
			font-size: $font;
		}

		h3 {
			font-size: $font-xxl;
			margin-top: 0.5em;
		}
	}
}

.links-group {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	max-width: 60rem;

	li {
		width: 100%;
		padding-top: $spacing;

		&:first-child {
			padding-top: 0;
		}
	}
}

.image {
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: -1;
	opacity: 0.5;
}

.background-dark {
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: -2;
	background-color: $background-dark;
}

@media all and (min-width: $s) {
	.links-group {
		li {
			width: unset;
		}
	}
}

@media all and (min-width: $s) {
	.location-group {
		grid-template: 1fr / repeat(2, 1fr);
	}
}

@media all and (min-width: $m) {
	.location {
		@include section-padding('m');

		article {
			padding-bottom: 0;
			padding-right: $spacing * 2;
		}
	}

	.location-item {
		justify-self: center;
	}
}

@media all and (min-width: $l) {
	.location {
		@include section-padding('l');

		> div {
			display: grid;
			grid-template: 1fr / 40rem auto;
		}
	}

	.location-group {
		padding-top: 0;
	}
}

// animations
.v-enter-active,
.v-leave-active {
	transition: all 1s;
}

.v-enter,
.v-leave-to {
	transform: translate3d(0, 100%, 0);
}
</style>
