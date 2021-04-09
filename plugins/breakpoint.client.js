'use strict';

export class BreakPoint {
	init() {
		const debounce = (func, wait, immediate) => {
			let timeout;
			return () => {
				const context = this;
				const args = arguments;
				const later = function () {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				const callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		};

		if (typeof window !== 'undefined') {
			this.setBreakPoint();
			window.addEventListener(
				'resize',
				debounce(() => this.setBreakPoint(), 100, false),
				{ passive: true }
			);
		}
	}

	setBreakPoint() {
		const x = window.innerWidth;
		const prevBreakpoint = window.breakPoint;
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

		if (prevBreakpoint !== window.breakPoint) {
			this.emmitBreakpointChangeEvent();
		}
	}

	emmitBreakpointChangeEvent() {
		let event = null;
		if (typeof Event === 'function') {
			event = new Event('breakpointChange');
		} else {
			event = document.createEvent('Event');
			event.initEvent('breakpointChange', true, true);
		}

		document.dispatchEvent(event);
	}
}

const breakPoint = new BreakPoint();
breakPoint.init();
