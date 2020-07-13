export default (context, inject) => {
	const metaHead = (data, $prismic) => {
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

		const titleOg = {
			...(title && {
				name: 'og:title',
				content: `${title} | theFactor.e`,
			}),
		};
		const descriptionOg = {
			...(data.description && {
				name: 'og:description',
				content: data.description,
			}),
		};

		const description = {
			...(data.description && {
				name: 'description',
				content: data.description,
			}),
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
				meta: [titleOg, image, description, descriptionOg],
			};
		}

		return {
			meta: [titleOg, image, description, descriptionOg],
		};
	};
	inject('metaHead', metaHead);
};
