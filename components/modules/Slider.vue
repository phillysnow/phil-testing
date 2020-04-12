<template>
	<transition name="appear" appear>
		<div class="slider">
			<ul ref="group" class="slider--group">
				<li ref="items" v-for="i in range" :key="i" class="slider--item" :data-id="i">
					<transition :name="transitionName(i)">
						<nuxt-link to="/" itemprop="url" v-if="inViewById[i]" :key="i">
							Marvin👨‍🎨
							<br />make this Pretty👉
						</nuxt-link>
					</transition>
				</li>
			</ul>
			<transition name="scroll">
				<span v-show="Vscroll" class="scroll--label">scroll down</span>
			</transition>
		</div>
	</transition>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import Kinet from 'kinet';

@Component({})
export default class Slider extends Vue {
	@Prop() slides;
	inViewById = {};
	observer = undefined;
	Vscroll = false;
	index = 0;
	sliderAnimation = new Kinet({
		acceleration: 0.04,
		friction: 0.3,
		names: ['x'],
	});

	mounted() {
		let observer = new IntersectionObserver(this.handleIntersection);
		for (let el of this.$refs.items) {		
			observer.observe(el);
		}
		this.observer = observer;

		this.slideList();
		this.scrollIndicator();
	}

	beforeDestroy() {
		this.observer.disconnect();
		window.removeEventListener('wheel', (e) =>  this.slideListAnimate(e), false);
	}

	cloneInViewById() {
		let inViewById = {};
		for (let [id, inView] of Object.entries(this.inViewById)) {
			if (inView) {
				inViewById[id] = true;
			}
		}
		return inViewById;
	}

	handleIntersection(entries, observer) {
		let inViewById = this.cloneInViewById();

		for (let entry of entries) {
			let id = entry.target.dataset.id;

			if (entry.isIntersecting) {
				inViewById[id] = entry.isIntersecting;
			} else if (inViewById[id]) {
				// Leaving view.
				inViewById[id] = false;
			}
		}

		this.inViewById = inViewById;
	}

	transitionName(i) {
		const inViewById = this.cloneInViewById();
		const IDArray = Object.keys(inViewById);
		const index = IDArray.length - 1;

		if (i < IDArray[index]) {
			return 'before';
		} else {
			return 'after';
		}
	}

	scrollIndicator() {
		setInterval(() => {
			this.Vscroll = true;
		}, 5000);
	}

	slideList() {
		const slideGroup = this.$refs.group;
		const margin = window.screen.availWidth * 0.4;
		const maxWidth = -slideGroup.scrollWidth + (margin * 1.5);

		this.sliderAnimation.on('tick', (i) => {
			slideGroup.style.transform = `translateX(${i.x.current}px)`;
		});
		
		window.addEventListener('wheel', (e) =>  this.slideListAnimate(e, margin, maxWidth), false);
	}

	slideListAnimate(e, margin, maxWidth) {
		e.preventDefault();
		e = window.event || e;
	
		this.index -= e.deltaY;
		this.Vscroll = false;
		
		if(this.index >= margin && e.deltaY < 0) this.index = margin;
		if(!(maxWidth <= this.index) && e.deltaY > 0) this.index = maxWidth;

		this.sliderAnimation.animate('x', this.index);
	}

	// test items generator
	identity = (x) => x;

	Array = {
		from(iterable, transform = identity) {
			let list = [];
			for (let i = 0; i < iterable.length; i++) {
				list.push(transform(iterable[i], i));
			}
			return list;
		},
	};

	get range() {
		return Array.from({ length: 8 }, (_, i) => i + 1);
	}
	// end test items generator
}
</script>

<style scoped lang="scss">
.slider {
	transition: 0.5s opacity;
	overflow: hidden;
}

.slider--group {
	display: grid;
	grid-gap: $spacing * 2;
	grid-template-rows: 1fr;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	width: 100%;
	height: 55rem;
	margin: 20rem auto;
}

.slider--item {
	width: 50rem;
	height: 100%;
	user-select: none;
	padding: $spacing;
	transition: 0.5s transform;

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		color: $white;
		font-size: $font-title;
		line-height: 1.2;
		text-align: center;
		text-decoration: none;
		background-color: $green;
		box-shadow: 0 5rem 8rem -2rem rgba($black, 0.1);
		transition: 0.5s box-shadow;
	}

	&:hover {
		transform: scale(1.1);

		a {
			box-shadow: 0 7rem 8rem -2rem rgba($black, 0.1);
		}
	}
}

.scroll--label {
	display: block;
	transition: 0.3s opacity, 0.5s transform;
	font-size: $font-s * 0.8;
	text-transform: uppercase;
	opacity: 0.8;
	padding-left: $spacing * 2;
	transform: translateY(-6rem);
}

// scroll--label animation
.scroll-enter-active {
	opacity: 0;
	transform: translateY(-4rem);
}

.scroll-leave-active {
	opacity: 0;
	transform: translateY(-4rem);
}

// slide--item animation
.before-enter-active {
	animation: slide-in-from-left 1.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.after-enter-active {
	animation: slide-in-from-right 1.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes slide-in-from-left {
	0% {
		transform-origin: bottom;
		transform: translate(-20rem, 3rem) rotateZ(-8deg);
	}

	100% {
		transform: translate(0);
	}
}

@keyframes slide-in-from-right {
	0% {
		transform-origin: top;
		transform: translate(20rem, -3rem) rotateZ(8deg);
	}

	100% {
		transform: translate(0);
	}
}

// page appear animation
.appear-enter-active {
	opacity: 0;

	.before-enter-active,
	.after-enter-active {
		animation: none;
	}
}
</style>
