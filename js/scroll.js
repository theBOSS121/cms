function smoothScroll(target, duration) {
	let t = document.querySelector(target);
	if (t === null) {
		console.error('Element with that target not exist: ' + target);
		return;
	}
	let tPos = t.getBoundingClientRect().top;
	let startPosintion = window.pageYOffset;
	let distance = tPos - navigationHeight;
	let startTime = null;

	function animation(currentTime) {
		if (startTime == null) startTime = currentTime;
		let timeElapsed = currentTime - startTime;

		let run = easeInOut(timeElapsed, startPosintion, distance, duration);

		window.scrollTo(0, run);

		if (timeElapsed < duration) requestAnimationFrame(animation);
		else afterScrollHandler();
	}

	function easeInOut(t, b, c, d) {
		if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
		return (c / 2) * ((t -= 2) * t * t + 2) + b;
	}
	// function easeInOutQuart(t, b, c, d) {
	//     if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
	//     return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
	// }
	// function easeOutCubic(t, b, c, d) {
	//     return c * ((t = t / d - 1) * t * t + 1) + b;
	// }

	// function easeOutQuart(t, b, c, d) {
	//     return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	// }

	requestAnimationFrame(animation);
}

function afterScrollHandler() {
	if (secondAnim) {
		secondAnim = false;
	} else {
		setTimeout(() => (scrollingLinkPressed = false), 20);
	}
}

function postAfterScrollHandler() {}

function setupScroll() {
	let links = document.querySelectorAll('a');

	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener('click', function () {
			if (scrollingLinkPressed) secondAnim = true;
			let target = links[i].getAttribute('goto');
			if (target != null) {
				scrollingLinkPressed = true;
				smoothScroll(target, 500);
			}
		});
	}
	if (settings.navType == 0 || settings.navType == 1) {
		navigationHeight = document.querySelector('header nav').clientHeight;
	}
}
let secondAnim = false;
let navigationHeight = 0;
