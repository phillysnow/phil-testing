/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
	if (doc.isBroken) {
		return '/404'
	}
	if (doc.type === 'at_work') {
    return `/actueel/at-work/${doc.uid}`
  }
	else {
		return '/404'
	}
}
