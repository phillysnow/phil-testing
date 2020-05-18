/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
	if (doc.isBroken) return '/not-found';

	// custom pages
	if (doc.type === 'home') return '/';
	if (doc.type === 'contact') return '/contact';
	if (doc.type === 'about_us') return '/over-ons';
	if (doc.type === 'services') return '/services';
	if (doc.type === 'default') return `/${doc.uid}`;

	// overview pages
	if (doc.type === 'case') return '/cases';
	if (doc.type === 'opinion') return '/opinies';
	if (doc.type === 'actual') return '/actueel';

	// detail pages
	if (doc.type === 'case_post') return `/cases/${doc.uid}`;
	if (doc.type === 'opinion_post') return `/opinies/${doc.uid}`;
	if (doc.type === 'news_post') return `/actueel/${doc.uid}`;
	if (doc.type === 'event_post') return `/actueel/${doc.uid}`;

	return '/not-found';
}
