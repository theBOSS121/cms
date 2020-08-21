function setUpSliders() {
    let sliders = settings.sliders;
    // loop through all the sliders from settings
    for (let i = 0; i < sliders.length; i++) {
        // get slider from html
        let slider = document.querySelector(sliders[i].id);
        if (slider == null) {
            // console.warn("Slider with id: " + sliders[i].id + " does not exit in HTML");
            continue;
        }
        slider.classList.add("no-select");
        // add dragable area to slider
        let draggableArea = document.createElement("div");
        draggableArea.classList.add("slider-draggable-area");
        slider.appendChild(draggableArea);
        // add slides div (slides wrapper, class="slides") to slider
        let slides = document.createElement("div");
        slides.classList.add("slides");
        slides.setAttribute("data-slides-to-show", sliders[i].slidesToShow);
        slider.appendChild(slides);
        // Add dots to slider
        let sliderDots = document.createElement("div");
        if (sliders[i].dots) {
            sliderDots.classList.add("dots");
            slider.appendChild(sliderDots);
        }
        // add buttons to slider
        let btnPrev = document.createElement("div");
        let btnNext = document.createElement("div");
        if (sliders[i].arrows) {
            btnPrev.classList.add("btn-prev");
            slider.appendChild(btnPrev);
            btnNext.classList.add("btn-next");
            slider.appendChild(btnNext);
            let btnPrevIcon = document.createElement("i");
            btnPrevIcon.classList.add("fas", "fa-chevron-left");
            btnPrev.appendChild(btnPrevIcon);
            let btnNextIcon = document.createElement("i");
            btnNextIcon.classList.add("fas", "fa-chevron-right");
            btnNext.appendChild(btnNextIcon);
        }
        // add every slides (class="slider-slide") to slides div
        for (let j = 0; j < sliders[i].slides.length; j++) {
            let s = document.createElement("div");
            s.classList.add("slider-slide");
            // add slide img to slide
            let img = document.createElement("img");
            img.src = sliders[i].slides[j].img;
            s.appendChild(img);
            // add content to slide
            let content = sliders[i].slides[j].content;
            if (content) {
                let contentDiv = document.createElement("div");
                contentDiv.classList.add("slider-content");
                for (let a = 0; a < content.length; a++) {
                    // add every content element and its attributes
                    let element = document.createElement(content[a].type);
                    element.innerHTML = content[a].innerHTML;
                    if (content[a].attr) {
                        for (let b = 0; b < content[a].attr.length; b++) {
                            element.setAttribute(content[a].attr[b].type, content[a].attr[b].value);
                        }
                    }

                    contentDiv.appendChild(element);
                }
                s.appendChild(contentDiv);
            }
            s.appendChild(img);
            slides.appendChild(s);
            // add a dot for every slide
            if (sliders[i].dots) {
                let dot = document.createElement("div");
                dot.classList.add("dot");
                sliderDots.appendChild(dot);
            }
        }
        let sliderSlides = slides.querySelectorAll(sliders[i].id + " .slider-slide");
        let dots = document.querySelectorAll(sliders[i].id + " .dots .dot");
        // vettings
        let slidesToShow = 1;
        if (sliders[i].slidesToShow) slidesToShow = sliders[i].slidesToShow;
        let slideWidth = slides.clientWidth / slidesToShow;
        let speed = 500;
        if (sliders[i].speed) speed = sliders[i].speed;
        let autoPlaySpeed = 5000;
        if (sliders[i].autoPlaySpeed) autoPlaySpeed = sliders[i].autoPlaySpeed;
        // variables for sliding
        let currentSlide = 0;
        let currentPixelPosition = 0,
            desiredPixelPosition = 0;
        let numOfSlides = slides.children.length;
        let sliding = false; // not currently used, but can determine when sliding
        // cloning first slide, to make first and last the same ------------
        let sSlides = document.querySelectorAll(sliders[i].id + " .slides .slider-slide");
        for (let j = 0; j < sliderSlides.length; j++) {
            slides.appendChild(sSlides[j].cloneNode(true));
        }
        for (let j = 0; j < sliderSlides.length; j++) {
            slides.appendChild(sSlides[j].cloneNode(true));
        }
        // starting offset to middle so you can't reach the edge -----------
        currentPixelPosition = -(currentSlide + numOfSlides) * slideWidth;
        desiredPixelPosition = -(currentSlide + numOfSlides) * slideWidth;
        slides.style.left = currentPixelPosition + "px";
        // resize fix ------------------------------------------------------
        window.addEventListener("resize", () => {
            slideWidth = slides.clientWidth / slidesToShow;
            currentPixelPosition = -(currentSlide + numOfSlides) * slideWidth;
            desiredPixelPosition = -(currentSlide + numOfSlides) * slideWidth;
            slides.style.left = currentPixelPosition + "px";
        });
        // autoplay ---------------------------------------------------------
        let autoplay;
        if (sliders[i].autoPlay) {
            startAutoPlay();
        }
        function startAutoPlay() {
            autoplay = setInterval(() => {
                moveRight(speed);
            }, autoPlaySpeed);
            if (speed == autoPlaySpeed) {
                moveRight(speed);
            }
        }
        function stopAutoPlay() {
            if (autoplay) {
                clearInterval(autoplay);
            }
        }
        // dots slide ------------------------------------------------------
        for (let j = 0; j < dots.length; j++) {
            dots[j].addEventListener("click", (e) => {
                if (sliders[i].autoPlay) {
                    stopAutoPlay();
                    startAutoPlay();
                }
                currentSlide = j;
                desiredPixelPosition = -(currentSlide + numOfSlides) * slideWidth;
                slide(speed);
            });
        }
        // dragging slide --------------------------------------------------
        let startX = 0,
            endX = 0,
            currentX = 0,
            lastX = 0;
        let dragging = false;
        let draggingSpeed = 0;
        let highSpeed = false;
        let currentTime = new Date().getTime(),
            lastTime = currentTime;
        let highSpeedTime = currentTime;

        if (sliders[i].dragging) {
            slider.addEventListener("mousedown", (e) => {
                let x = e.offsetX;
                if (e.target != draggableArea) {
                    x = e.offsetX + e.target.getBoundingClientRect().left;
                    if (e.target instanceof HTMLAnchorElement) {
                        return;
                    }
                }
                draggingStart(x);
            });
            window.addEventListener("mouseup", (e) => {
                if (startX == currentX) {
                    dragging = false;
                    return;
                }
                let x = e.offsetX;
                if (e.target != draggableArea)
                    x = e.offsetX + e.target.getBoundingClientRect().left;
                draggingEnd(x);
            });
            slider.addEventListener("mousemove", (e) => {
                let x = e.offsetX;
                if (e.target != draggableArea)
                    x = e.offsetX + e.target.getBoundingClientRect().left;
                draggingMove(x);
            });
            slider.addEventListener("touchstart", (e) => {
                draggingStart(e.changedTouches[0].clientX);
            });
            slider.addEventListener("touchend", (e) => {
                draggingEnd(e.changedTouches[0].clientX);
            });
            slider.addEventListener("touchmove", (e) => {
                draggingMove(e.changedTouches[0].clientX);
            });
        }

        function draggingStart(x) {
            dragging = true;
            startX = x;
            currentX = startX;
            if (sliders[i].autoPlay) {
                stopAutoPlay();
            }
        }

        function draggingEnd(x) {
            dragging = false;
            endX = x;
            currentPixelPosition += -(startX - currentX);
            let highSpeedInTime = false;
            if (highSpeed) {
                currentTime = new Date().getTime();
                if (currentTime - highSpeedTime < 300) {
                    highSpeedInTime = true;
                } else {
                    highSpeed = false;
                }
            }
            if (Math.abs(endX - startX) > slideWidth / 2 || highSpeedInTime) {
                if (endX - startX > 0) {
                    moveLeft(speed);
                } else {
                    moveRight(speed);
                }
            } else {
                slide(speed / 2);
                currentPixelPosition = -(currentSlide + numOfSlides) * slideWidth;
                desiredPixelPosition = -(currentSlide + numOfSlides) * slideWidth;
            }
            startX = 0;
            endX = 0;
            currentX = 0;
            if (sliders[i].autoPlay) {
                startAutoPlay();
            }
        }

        function draggingMove(x) {
            if (dragging) {
                currentX = x;
                currentTime = new Date().getTime();
                slides.style.left = currentPixelPosition - (startX - currentX) + "px";

                draggingSpeed = (currentX - lastX) / (currentTime - lastTime);
                if (Math.abs(draggingSpeed) > 1.8) {
                    highSpeedTime = currentTime;
                    highSpeed = true;
                } else {
                    if (currentTime - highSpeedTime > 300) {
                        highSpeed = false;
                    }
                }

                lastX = currentX;
                lastTime = currentTime;
            }
        }
        // btn slide ------------------------------------------------------------------
        if (sliders[i].arrows) {
            btnPrev.addEventListener("click", () => {
                moveLeft(speed);

                if (sliders[i].autoPlay) {
                    stopAutoPlay();
                    startAutoPlay();
                }
            });

            btnNext.addEventListener("click", () => {
                moveRight(speed);

                if (sliders[i].autoPlay) {
                    stopAutoPlay();
                    startAutoPlay();
                }
            });
        }
        function moveLeft(speed) {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide += numOfSlides;
                if (
                    currentPixelPosition - slideWidth * numOfSlides >
                    -3 * numOfSlides * slideWidth
                ) {
                    currentPixelPosition -= slideWidth * numOfSlides;
                }
            }
            desiredPixelPosition = -(currentSlide + numOfSlides) * slideWidth;
            slide(speed);
        }
        function moveRight(speed) {
            currentSlide++;
            if (currentSlide > numOfSlides) {
                currentSlide -= numOfSlides;
                if (currentPixelPosition + slideWidth * numOfSlides < 0) {
                    currentPixelPosition += slideWidth * numOfSlides;
                }
            }
            desiredPixelPosition = -(currentSlide + numOfSlides) * slideWidth;
            slide(speed);
        }
        // function that moves from current to desiret position in (duration) miliseconds
        function slide(duration) {
            sliding = true;
            let startPosintion = currentPixelPosition;
            let distance = desiredPixelPosition - currentPixelPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime == null) startTime = currentTime;
                let timeElapsed = currentTime - startTime;
                // value from 0 to distance based duration, currentTime on bazier curve -> easeInOut
                // sample
                // let run = bazier(0, -0.5, 1.5, 1, timeElapsed / duration) * distance + startPosintion;
                let run = easeOutCubic(timeElapsed, startPosintion, distance, duration);
                currentPixelPosition = run;
                slides.style.left = run + "px";
                if (timeElapsed < duration) requestAnimationFrame(animation);
                else {
                    currentPixelPosition = desiredPixelPosition;
                    sliding = false;
                }
            }
            // function easeInOut(t, b, c, d) {
            //     if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
            //     return (c / 2) * ((t -= 2) * t * t + 2) + b;
            // }
            // function easeInOutQuart(t, b, c, d) {
            //     if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
            //     return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
            // }
            function easeOutCubic(t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            }
            // function easeOutQuart(t, b, c, d) {
            //     return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            // }
            // function linear(t, b, c, d) {
            //     return c * (t / d) + b;
            // }
            // not working desirably
            // function bazier(p1, p2, p3, p4, t) {
            //     let a = 1 - t;
            //     return a * a * a * p1 + 3 * a * a * t * p2 + 3 * a * t * t * p3 + t * t * t * p4;
            // }
            requestAnimationFrame(animation);
        }
    }
}
