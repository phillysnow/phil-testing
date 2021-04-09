export default (context, inject) => {
	const metaHead = (data, $prismic, page) => {
		let metaImage;

		if (data.meta_image && data.meta_image.url) {
			metaImage = data.meta_image.url;
		} else if (data.fallback.page_image && data.fallback.page_image.url) {
			metaImage = data.fallback.page_image.url;
		}

		let title;

		if (data.title) {
			title = data.title;
		} else {
			title = $prismic.asText(data.fallback.page_title);
		}

		const descriptionFallback =
			'Wij maken menselijke technologie voor digitale mensen. Door te weten wat technisch mogelijk is én wat mensen bezighoudt. Samenwerken?';

		let bodyClass = {};

		if (page) {
			bodyClass = {
				class: [`page--${page}`],
			};
		}

		const canonical = {
			rel: 'canonical',
			href: `https://tfe.nl${data.url}`,
		};

		const titleOg = {
			...(title && {
				name: 'og:title',
				content: `${title} | theFactor.e`,
			}),
		};

		const descriptionOg = {
			name: 'og:description',
			content: data.description ? data.description : descriptionFallback,
		};

		const description = {
			name: 'description',
			content: data.description ? data.description : descriptionFallback,
		};

		const image = {
			...(metaImage && {
				name: 'og:image',
				content: metaImage,
			}),
		};
		if (title) {
			return {
				title: `${title} | theFactor.e`,
				link: [canonical],
				bodyAttrs: bodyClass,
				meta: [titleOg, image, description, descriptionOg],
			};
		}

		return {
			link: [canonical],
			bodyAttrs: bodyClass,
			meta: [titleOg, image, description, descriptionOg],
		};
	};
	inject('metaHead', metaHead);
};
