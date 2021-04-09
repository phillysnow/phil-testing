export default (context, inject) => {
	const scroll = () => {
		const scrollPosition = window.scrollY;
		const scrollHeight = window.innerHeight;

		window.scrollTo({
			top: scrollPosition + scrollHeight,
			behavior: 'smooth',
		});
	};

	const scrollTo = (element, to, duration) => {
		const start = element.scrollTop;
		const change = to - start;
		const increment = 5;
		let currentTime = 0;

		const MathEaseInOutQuad = (t, b, c, d) => {
			t /= d / 2;
			if (t < 1) return (c / 2) * t * t + b;
			t--;
			return (-c / 2) * (t * (t - 2) - 1) + b;
		};

		const animateScroll = () => {
			currentTime += increment;
			const val = MathEaseInOutQuad(currentTime, start, change, duration);
			element.scrollTop = val;
			if (currentTime < duration) {
				setTimeout(animateScroll, increment);
			}
		};
		animateScroll();
	};

	inject('scroll', scroll);
	inject('scrollTo', scrollTo);
};
