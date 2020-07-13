/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
	if (doc.isBroken) return '/404';

	// custom pages
	if (doc.type === 'home') return '/';
	if (doc.type === 'contact') return '/contact';
	if (doc.type === 'over_ons') return '/over-ons';
	if (doc.type === 'default') return `/${doc.uid}`;
	if (doc.type === 'services') return '/services';

	// overview pages
	if (doc.type === 'cases') return '/cases';
	if (doc.type === 'opinies') return '/opinies';
	if (doc.type === 'actueel') return '/actueel';

	// detail pages
	if (doc.type === 'case') return `/cases/${doc.uid}`;
	if (doc.type === 'opinie') return `/opinies/${doc.uid}`;
	if (doc.type === 'nieuws') return `/actueel/nieuws/${doc.uid}`;
	if (doc.type === 'event') return `/actueel/events/${doc.uid}`;
	if (doc.type === 'sector') return `/services/sectoren/${doc.uid}`;
	if (doc.type === 'expertise') return `/services/expertises/${doc.uid}`;

	return '/404';
}
