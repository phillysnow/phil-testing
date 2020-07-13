export default (context, inject) => {
	const scroll = () => {
		const scrollPosition = window.scrollY;
		const scrollHeight = window.innerHeight;

		window.scrollTo({
			top: scrollPosition + scrollHeight,
			behavior: 'smooth',
		});
	};

	inject('scroll', scroll);
};
