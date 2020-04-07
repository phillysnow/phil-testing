<template>
	<transition name="appear" appear>
		<div class="slider">
			<ul ref="group" class="slider--group">
				<li ref="items" v-for="i in range" :key="i" class="slider--item" :data-id="i">
					<transition :name="transitionName(i)">
						<nuxt-link to="/" itemprop="url" v-if="inViewById[i]" :key="i">{{ i }}</nuxt-link>
					</transition>
				</li>
			</ul>
			<transition name="scroll">
				<span v-show="Vscroll" class="scroll--label">
					scroll down
				</span>
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

	mounted() {
		let observer = new IntersectionObserver(this.handleIntersection);
		for (let el of this.$refs.items) {
			observer.observe(el);
		}
		this.observer = observer;

		this.slideList();

		setInterval(() => {
			this.Vscroll = true;
		}, 5000);
	}

	beforeDestroy() {
		this.observer.disconnect();
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

	slideList() {
		let index = 0;
		const slidergroup = this.$refs.group;

		const kinet = new Kinet({
			acceleration: 0.08,
			friction: 0.5,
			names: ['x'],
		});

		window.addEventListener(
			'wheel',
			(e) => {
				e.preventDefault();
				e = window.event || e;

				index -= e.deltaY;
				this.Vscroll = false;

				kinet.animate('x', index);
			},
			false
		);

		kinet.on('tick', (inst) => {
			slidergroup.style.transform = `translateX(${inst.x.current}px)`;
		});
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
		return Array.from({ length: 20 }, (_, i) => i + 1);
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
	width: 40rem;
	height: 100%;
	user-select: none;
	padding: $spacing;

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		color: $white;
		font-size: $font-title;
		background-color: $green;
	}
}

.scroll--label {
	display: block;
	transition: 0.3s opacity, 0.5s transform;
	font-size: $font-s;
	text-transform: uppercase;
	opacity: 0.8;
	padding-left: $spacing * 2;
	transform: translateY(-6rem);
}

// page transition

.scroll-enter-active {
	opacity: 0;
	transform: translateY(-4rem);
}

.scroll-leave-active {
	opacity: 0;
	transform: translateY(-4rem);
}

.before-enter-active {
	animation: slide-in-from-left 1s ease-out;
}

.after-enter-active {
	animation: slide-in-from-right 1s ease-out;
}

.appear-enter-active {
	opacity: 0;

	.before-enter-active,
	.after-enter-active {
		animation: none;
	}
}

@keyframes slide-in-from-left {
	0% {
		transform: translate(-20rem, 10rem) rotateZ(4deg);
		opacity: 0;
	}

	50% {
		opacity: 1;
	}

	100% {
		transform: translate(0) rotateZ(0);
	}
}

@keyframes slide-in-from-right {
	0% {
		transform: translate(20rem, -10rem) rotateZ(4deg);
		opacity: 0;
	}

	50% {
		opacity: 1;
	}

	100% {
		transform: translate(0) rotateZ(0);
	}
}
</style>
