<template>
	<section class="links">
		<div>
			<ul class="links-group">
				<li v-for="(item, index) in data.items" :key="index">
					<a
						v-if="item.component_link && item.label"
						class="links-item links-item--light"
						:href="item.component_link"
						>{{ item.label }} <span>↧</span></a
					>
					<prismic-link
						v-else-if="item.link && item.label"
						class="links-item links-item--dark"
						:field="item.link"
					>
						{{ item.label }} <span>➚</span>
					</prismic-link>
				</li>
			</ul>
		</div>
		<transition>
			<template v-if="slideUp">
				<FigureImage v-if="data.primary.image.url" :image="data.primary.image" />
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
export default class LinkGroup extends Vue {
	@Prop() data;

	slideUp = false;

	mounted() {
		setTimeout(() => {
			this.slideUp = true;
		}, 300);
	}
}
</script>
<style lang="scss" scoped>
.links {
	@include section-padding();
}

.links-group {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	max-width: 60rem;

	li {
		width: 100%;
		padding-top: $spacing;
	}
}

.links-item {
	display: block;
	padding: $spacing $spacing * 3.5 $spacing $spacing * 2;
	font-family: $font-highlight;
	position: relative;
	min-width: 36rem;

	> span {
		position: absolute;
		display: inline-block;
		right: $spacing * 2;
		color: $pink;
		font-size: 2em;
		line-height: 1em;
		padding-left: 0.5em;
	}

	&--light {
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
}

.image {
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: -1;
	opacity: 0.5;

	&::before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba($black, 0.6);
	}
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

@media all and (min-width: $m) {
	.links {
		@include section-padding('m');
	}
}

@media all and (min-width: $l) {
	.links {
		@include section-padding('l');
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
