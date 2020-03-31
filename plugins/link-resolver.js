/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
	if (doc.isBroken) {
		return '/not-found';
	}

	if (doc.type === 'home') {
		return '/';
	}

	if (doc.type === 'story') {
		return '/story';
	}

	if (doc.type === 'story_post') {
		return '/story/' + doc.uid;
	}

	if (doc.type === 'expertise') {
		return '/expertise';
	}

	if (doc.type === 'expertise_post') {
		return '/expertise/' + doc.uid;
	}

	if (doc.type === 'work') {
		return '/work';
	}

	if (doc.type === 'work_post') {
		return '/work/' + doc.uid;
	}

	if (doc.type === 'world') {
		return '/world';
	}

	if (doc.type === 'world_post') {
		return '/world/' + doc.uid;
	}

	return '/not-found';
}
