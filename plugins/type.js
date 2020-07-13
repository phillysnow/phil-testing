export default (context, inject) => {
	const type = (value) => {
		if (!value) return;
		value = value.charAt(0).toUpperCase() + value.slice(1);
		return `${value.replace(/_/g, ' ')}/`;
	};

	inject('type', type);
};
