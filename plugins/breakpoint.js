'use strict';

export default class BreakPoint {
	init() {
		if (typeof window !== 'undefined') {
			this.setBreakPoint();
			window.addEventListener(
				'resize',
				() => {
					this.setBreakPoint();
				},
				{ passive: true }
			);
		}
	}

	setBreakPoint() {
		const x = window.innerWidth;
		switch (true) {
			case x >= 1669:
				window.breakPoint = 'max';
				break;
			case x >= 1199:
				window.breakPoint = 'xl';
				break;
			case x >= 991:
				window.breakPoint = 'l';
				break;
			case x >= 767:
				window.breakPoint = 'm';
				break;
			default:
				window.breakPoint = 's';
				break;
		}
	}
}
