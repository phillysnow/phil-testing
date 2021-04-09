export default (context, inject) => {
	const subtitlePrepend = (type, value) => {
		if (!value || !type) return;

		if (type === 'opinie') return `_${value}`;

		return value;
	};

	inject('subtitlePrepend', subtitlePrepend);
};
