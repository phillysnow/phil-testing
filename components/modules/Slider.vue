<template>
	<section class="slider" :class="{ active: hover }">
		<ul v-if="slides.length" ref="group" class="slider-group">
			<li
				v-for="(slide, index) in slides"
				ref="items"
				:key="index"
				class="slider-item"
				:class="[
					{
						dark: darken(slide.type),
						'slider-item--image': slide.type === 'opinie',
						'slider-item--image full-slide': slide.type === 'case',
						first: slide.overviewItem,
					},
					shadow(index),
				]"
				:data-id="index"
				@mouseenter="current = index"
				@mouseleave="current = -1"
			>
				<transition :name="transitionName(index)" :css="reload ? false : true" mode="out-in">
					<component
						:is="slide.overviewItem ? 'div' : 'prismic-link'"
						v-if="inViewById[index] && slide.data"
						:key="index"
						:field="slide.overviewItem ? false : slide"
						:itemprop="slide.overviewItem ? false : 'url'"
					>
						<FigureImage
							v-if="(slide.type === 'opinie' || slide.type === 'case') && slide.data.page_image"
							class="slider-image"
							:image="slide.data.page_image"
						/>
						<article>
							<p v-if="slide.type">{{ $type(slide.type) }}</p>
							<h3 v-if="slide.data.page_title">{{ $prismic.asText(slide.data.page_title) }}</h3>
							<p
								v-if="slide.data.page_subtitle"
								:class="{
									small:
										slide.type === 'nieuws' || slide.type === 'event' || slide.type === 'at_work',
								}"
							>
								<svg v-if="slide.type === 'event'">
									<use xlink:href="#calendar" />
								</svg>
								{{ $subtitlePrepend(slide.type, slide.data.page_subtitle) }}
							</p>
						</article>
					</component>
				</transition>
			</li>
		</ul>
		<ul v-else class="slider-group fallback">
			<li class="slider-item slider-item--loading">
				<span></span>
				<span></span>
			</li>
			<li class="slider-item slider-item--loading">
				<span></span>
				<span></span>
			</li>
			<li class="slider-item slider-item--loading">
				<span></span>
				<span></span>
			</li>
			<li class="slider-item slider-item--loading">
				<span></span>
				<span></span>
			</li>
		</ul>
	</section>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import Kinet from 'kinet';
import { FigureImage } from '@/components/elements';

@Component({
	components: {
		FigureImage,
	},
})
export default class Slider extends Vue {
	@Prop() data;
	@Prop() hint;
	@Prop({ default: false }) local;

	inViewById = {};
	current = -1;
	hover = false;
	track = undefined;
	observer = undefined;
	mounted = true;
	reload = false;
	index = 0;
	slideGroup = null;
	margin = 0;
	maxWidth = 0;
	touchstartX = 0;
	touchendX = 0;
	movement = 0;
	animateSlider = null;

	kinetConfig = {
		acceleration: 0.04,
		friction: 0.3,
		names: ['x'],
	};

	kinetConfigMobile = {
		acceleration: 0.05,
		friction: 0.5,
		names: ['x'],
	};

	scroll = (e) => this.wheelMoveY(e);
	touchStart = (e) => this.swipeStart(e);
	touchEnd = (e) => this.swipeEnd(e);
	touchMove = (e) => this.swipeMove(e);

	// what shadow style to use on hover
	shadow(index) {
		if (this.current === -1 || this.hover || this.mounted) return '';
		if (this.current === index) return 'shadow';
		if (this.current + 1 === index) return 'shadow--after';
		if (this.current - 1 === index) return 'shadow--before';
	}

	// which transition to use for slide in left
	// or slide in right.
	transitionName(i) {
		const inViewById = this.cloneInViewById();
		const IDArray = Object.keys(inViewById);
		const index = IDArray.length - 1;

		if (this.reload) return 'reload';
		if (this.mounted) return 'intro';

		if (i < IDArray[index]) {
			return 'before';
		} else {
			return 'after';
		}
	}

	// styling of cards based on type
	darken(type) {
		if (type === 'services') return true;
		if (type === 'contact') return true;
		if (type === 'over_ons') return true;
		if (type === 'expertise') return true;
		if (type === 'sectore') return true;
		return false;
	}

	get slides() {
		if (this.data) {
			return this.data.filter((item) => {
				if (!item.data) return false;
				return item.data.visable === true;
			});
		}
	}

	@Watch('data')
	dataReset() {
		this.reload = true;
		this.$nextTick(() => {
			this.observer.disconnect();
			this.animateSlider.animate('x', 0);
			this.mountSequence();
		});
	}

	mountSequence() {
		const spacingSize = parseInt(window.getComputedStyle(this.$refs.group).columnGap, 10);

		this.index = 0;
		this.track = this.local ? this.$el : window;
		this.slideGroup = this.$refs.group;
		this.slideGroup.style.transform = `translate3d(0,0,0)`;

		this.margin = spacingSize * 2;
		this.maxWidth = -this.slideGroup.scrollWidth + window.screen.availWidth - spacingSize * 2;

		const observer = new IntersectionObserver(this.handleIntersection);

		for (const el of this.$refs.items) {
			observer.observe(el);
		}
		this.observer = observer;

		setTimeout(() => {
			this.mounted = false;
			this.reload = false;
		}, 600);
	}

	mounted() {
		this.mountSequence();
		this.sliderInteractionInit();
	}

	beforeDestroy() {
		this.animateSlider.off();
		this.observer.disconnect();
		this.track.removeEventListener('wheel', this.scroll, {
			passive: false,
		});
		this.track.removeEventListener('touchstart', this.touchStart, {
			passive: false,
		});
		this.track.removeEventListener('touchend', this.touchEnd, {
			passive: false,
		});
		this.track.removeEventListener('touchmove', this.touchMove, {
			passive: false,
		});
	}

	// keep list in view small for preformance
	cloneInViewById() {
		const inViewById = {};
		for (const [id, inView] of Object.entries(this.inViewById)) {
			if (inView) {
				inViewById[id] = true;
			}
		}
		return inViewById;
	}

	// event handler for elements in view
	handleIntersection(entries, observer) {
		const inViewById = this.cloneInViewById();

		for (const entry of entries) {
			const id = entry.target.dataset.id;

			if (entry.isIntersecting) {
				inViewById[id] = entry.isIntersecting;
			} else if (inViewById[id]) {
				// Leaving view.
				inViewById[id] = false;
			}
		}

		this.inViewById = inViewById;
	}

	sliderInteractionInit() {
		const mobileBreakPoint = window.matchMedia('(max-width: 768px)').matches;

		if (mobileBreakPoint) this.animateSlider = new Kinet(this.kinetConfigMobile);
		else this.animateSlider = new Kinet(this.kinetConfig);

		this.animateSlider.on('tick', (i) => {
			this.slideGroup.style.transform = `translate3d(${i.x.current}px,0,0)`;
			this.slideGroup.style.webkitTransform = `translate3d(${i.x.current}px,0,0)`;
			this.hover = true;

			if (i.x.current === i.x.target) this.hover = false;
		});

		this.track.addEventListener('wheel', this.scroll, { passive: false });

		this.track.addEventListener('touchstart', this.touchStart, {
			passive: false,
		});
		this.track.addEventListener('touchend', this.touchEnd, {
			passive: false,
		});
		this.track.addEventListener('touchmove', this.touchMove, {
			passive: false,
		});
	}

	swipeStart(e) {
		// reset last movement input
		this.movement = 0;
		this.touchstartX = e.changedTouches[0].screenX;
	}

	swipeEnd(e) {
		// give bounce border
		if (this.index >= this.margin && this.index > 0) this.index = this.margin;
		if (!(this.maxWidth <= this.index) && this.index < 0) this.index = this.maxWidth;
		this.animateSlider.animate('x', this.index);
	}

	swipeMove(e) {
		const movement = this.touchstartX - e.changedTouches[0].screenX;
		const result = movement - this.movement;

		this.movement = movement;
		this.index -= result * 2.6;

		this.animateSlider.animate('x', this.index);
	}

	wheelMoveY(e) {
		e.preventDefault();
		e = window.event || e;

		const direction = e.deltaY + e.deltaX;

		this.index -= direction;

		if (this.index >= this.margin && direction < 0) this.index = this.margin;
		if (!(this.maxWidth <= this.index) && direction > 0) this.index = this.maxWidth;

		return this.animateSlider.animate('x', this.index);
	}

	@Watch('hint')
	slideRight() {
		this.index -= 600;

		if (!(this.maxWidth <= this.index) && this.index < 0) this.index = this.maxWidth;

		this.animateSlider.animate('x', this.index);
	}
}
</script>

<style lang="scss">
ul.slider-group {
	display: grid;
	gap: $spacing * 2;
	padding-left: $spacing;
	grid-auto-flow: column;
	grid-template: 1fr / 1fr;
	width: 100%;
	margin-bottom: 14vh;
	will-change: transform;
}

.slider-item {
	width: 36rem;
	height: 36rem;
	user-select: none;
	position: relative;

	&::before {
		content: '';
		display: block;
		position: absolute;
		bottom: $spacing;
		left: $spacing;
		box-shadow: 0 0 4rem -2rem rgba($black, 0);
		width: calc(100% - 4.8rem);
		height: calc(100% - 4.8rem);
		transition: 0.3s all;
	}

	a,
	div {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: relative;
		z-index: 0;
		padding: $spacing * 1.5;
		width: 100%;
		height: 100%;
		background-color: $white;
		color: $color;
		overflow: hidden;
		transition: 0.5s background-color;
	}

	h3 {
		color: $color-head;
		font-size: $font-xl * 0.8;
		line-height: 1.4;
	}

	p {
		margin-top: $spacing;
		font-size: $font * 0.8;
		font-family: $font-highlight;
		letter-spacing: 0.05em;

		&.small {
			font-family: $font-highlight-light;
		}

		svg {
			fill: currentColor;
			width: 1em;
			height: 1em;
			margin-right: 0.5em;
			transform: translateY(-0.1em);
		}
	}

	&--image {
		figure {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			background-color: $white;
			transition: background-color 0.4s;
		}

		img {
			transform: translate3d(23%, 0, 0);
			opacity: 0.4;
			mix-blend-mode: multiply;
			filter: grayscale(100%);
			transition: transform 0.4s 0.1s, opacity 0.4s;
		}

		figure + article {
			h3,
			p {
				transition: transform 0.4s 0.1s, opacity 0.4s 0.1s;
			}

			p:last-of-type {
				transition: color 0.4s 0.1s;
			}
		}

		&.full-slide {
			img {
				transform: translate3d(100%, 0, 0);
				opacity: 0;
				filter: grayscale(0);
			}
		}
	}

	&--loading {
		position: relative;
		background-color: $loading-down;
		animation: loader 0.8s infinite alternate;

		> span {
			position: absolute;
			background-color: darken($loading-up, 3%);
			width: 80%;
			height: 3rem;
			left: 4rem;
			bottom: 6rem;

			&:nth-child(2) {
				width: 60%;
				bottom: 12rem;
			}
		}

		@keyframes loader {
			to {
				background-color: $loading-up;
			}
		}
	}

	&.first {
		width: 32rem;

		&::before {
			content: none;
		}

		div {
			padding-left: 0;
			background-color: transparent;
			transition: none;
		}

		h3 {
			margin-bottom: $spacing * 2.5;
		}
	}

	&.shadow {
		&::before {
			box-shadow: 0 7rem 4rem -2rem rgba($black, 0.3);
		}

		&--before {
			&::before {
				transform: rotate(4deg);
				box-shadow: 0 7rem 4rem -2rem rgba($black, 0.3);
			}
		}

		&--after {
			&::before {
				transform: rotate(-4deg);
				box-shadow: 0 7rem 4rem -2rem rgba($black, 0.3);
			}
		}
	}

	&.dark {
		a {
			background-color: $background-dark;
			color: $white;
		}

		h3 {
			color: $white;
		}
	}
}

.slider-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
}

.slider {
	transition: 0.5s opacity;
	overflow: hidden;

	&:not(.active) {
		.slider-item {
			&:hover {
				a {
					background-color: $green;
				}

				&.first {
					div {
						background-color: transparent;
					}
				}

				&.dark a {
					background-color: $pink;
				}
			}

			&--image {
				&:hover {
					figure + article {
						h3,
						p {
							transform: translateX(-4rem);
							opacity: 0;
							transition: transform 0.4s, opacity 0.4s;
						}

						p:last-of-type {
							transform: translateX(0);
							opacity: 1;
							color: $white;
							transition: color 0.4s 0.1s;
						}
					}

					figure {
						background-color: $green;
						transition: background-color 0.4s 0.2s;
					}

					img {
						transform: translateX(0);
						opacity: 0.9;
						transition: transform 0.4s, opacity 0.4s;
					}
				}

				&.full-slide {
					&:hover {
						img {
							opacity: 1;
						}
					}
				}
			}
		}
	}

	&--upnext {
		margin-top: 15rem;
		margin-bottom: 18.3vw;

		ul {
			z-index: 2;
		}
	}

	&--full {
		display: flex;
		align-items: center;
		height: 100%;
	}
}

@media all and (min-width: $s) {
	.slider-item {
		width: 44rem;
		height: 44rem;

		&.first {
			width: 44rem;
		}

		a {
			padding: $spacing * 2;
		}
	}
}

@media all and (min-width: $m) {
	ul.slider-group {
		padding-left: $spacing * 2;
		gap: $spacing * 3;
		margin-bottom: 8vh;
	}

	.slider-item {
		width: 50rem;
		height: 50rem;

		&.first {
			width: 50rem;
		}

		h3 {
			font-size: $font-xl;
		}

		p {
			font-size: $font;
		}
	}

	.slider--full {
		@media all and (max-height: 820px) {
			.slider-item {
				width: 50rem;
				height: 50rem;
			}
		}

		@media all and (max-height: 750px) {
			.slider-item {
				width: 46rem;
				height: 46rem;
			}
		}
	}
}

// @media all and (min-width: $l) {
// 	.slider-item {
// 		width: 55rem;
// 		height: 55rem;
// 	}
// }

// big ass screens for tiny hights - Trump
@media all and (min-width: $desktop) {
	.slider--full {
		@media all and (max-height: 1020px) {
			align-items: flex-end;
		}

		@media all and (max-height: 880px) {
			.slider-item {
				width: 50rem;
				height: 50rem;
			}
		}

		@media all and (max-height: 825px) {
			.slider-item {
				width: 46rem;
				height: 46rem;
			}
		}
	}
}

// slide-item animation
.before-enter-active {
	animation: slide-in-from-left 1.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.after-enter-active {
	animation: slide-in-from-right 1.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.intro-enter-active {
	animation: intro 0.6s ease-in-out;
}

.reload-enter-active,
.reload-leave-active {
	transition: none;
}

@keyframes slide-in-from-left {
	0% {
		transform: translate3d(-20rem, 3rem, 0) rotateZ(-8deg);
	}

	100% {
		transform: translate3d(0, 0, 0);
	}
}

@keyframes slide-in-from-right {
	0% {
		transform: translate3d(20rem, -3rem, 0) rotateZ(8deg);
	}

	100% {
		transform: translate3d(0, 0, 0);
	}
}

@keyframes intro {
	0% {
		transform: translate3d(40rem, 0, 0) rotateZ(2deg);
		opacity: 0;
	}

	30% {
		opacity: 1;
	}

	100% {
		transform: translate3d(0, 0, 0);
	}
}
</style>
