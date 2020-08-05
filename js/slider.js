let slider = document.querySelector('.slider');
let slides = document.querySelector('.slider .slides');
let images = slides.querySelectorAll('img');
let btnPrev = document.querySelector('.btn-prev');
let btnNext = document.querySelector('.btn-next');
let currentSlide = 0,
	previousSlide = 0;
let currentPixelPosition = 0;
let numOfSlides = slides.children.length;

let firstImg = document.querySelector('.slides img');
slides.appendChild(firstImg.cloneNode(true));

btnPrev.addEventListener('click', () => {
	currentSlide--;
	if (currentSlide < 0) {
		currentSlide += numOfSlides;
		currentPixelPosition -= slider.clientWidth * numOfSlides;
	}
	slide(500, 1);
});

btnNext.addEventListener('click', () => {
	currentSlide++;
	if (currentSlide > numOfSlides) {
		currentSlide -= numOfSlides;
		currentPixelPosition += slider.clientWidth * numOfSlides;
	}
	slide(500, -1);
});

function slide(duration, dir) {
	let startPosintion = 0;
	let distance = slider.clientWidth;
	let startTime = null;

	function animation(currentTime) {
		if (startTime == null) startTime = currentTime;
		let timeElapsed = currentTime - startTime;

		let run = easeInOut(timeElapsed, startPosintion, distance, duration) * dir;

		slides.style.left = run + currentPixelPosition + 'px';
		if (timeElapsed < duration) requestAnimationFrame(animation);
		else {
			currentPixelPosition += distance * dir;
		}
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
