/**
 * To learn more about Link Resolving check out the Prismic documentation
 */

export default function(doc: any) {
	if (doc.isBroken) {
		return '/not-found';
	}

	if (doc.type === 'test') {
		return '/test';
	}

	// if (doc.type === 'post') {
	// 	return '/blog/' + doc.uid;
	// }

	return '/not-found';
}
