/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'home') {
    return `/`
  }
	if (doc.type === 'contact') {
		return '/contact'
	}
	if (doc.type === 'over_ons') {
		return '/over-ons'
	}
	if (doc.type === 'default') {
		return `/${doc.uid}`
	}

  if (doc.type === 'page') {
    return `/${doc.lang}/${doc.uid}`
  }

	if (doc.type === 'at_work') {
    return `/actueel/atwork/${doc.uid}`
  }

  return '/not-found'
}