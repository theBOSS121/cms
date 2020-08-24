function setUpTyping() {
    for (let i = 0; i < settings.typing.length; i++) {
        let typing = settings.typing[i];
        if (!document.querySelector(typing.id)) {
            // console.warn("typing HTMLElement with id=" + typing.id + " does not exist in HTML");
            continue;
        }
        type(
            typing.strings,
            document.querySelector(typing.id),
            typing.typingSpeed,
            typing.startDelay,
            typing.endDelay,
            true,
            0
        );
        // console.log(strings);
    }
}

function type(
    strings,
    typingHTMLElement,
    typingSpeed = 500,
    startDelay = 500,
    endDelay = 500,
    goingUp = true,
    index = 0,
    currentStringLength = 0
) {
    let displayedString = "";
    let currentString = strings[index];

    let typingInterval = setInterval(() => {
        if (goingUp) {
            currentStringLength++;
            if (currentStringLength == currentString.length) {
                goingUp = false;

                clearInterval(typingInterval);
                setTimeout(() => {
                    type(
                        strings,
                        typingHTMLElement,
                        typingSpeed,
                        startDelay,
                        endDelay,
                        goingUp,
                        index,
                        currentStringLength
                    );
                }, endDelay);
            }
        } else {
            currentStringLength--;
            if (currentStringLength == 0) {
                goingUp = true;
                index++;
                if (index >= strings.length) index = 0;
                currentString = strings[index];
                clearInterval(typingInterval);
                setTimeout(() => {
                    type(
                        strings,
                        typingHTMLElement,
                        typingSpeed,
                        startDelay,
                        endDelay,
                        goingUp,
                        index,
                        currentStringLength
                    );
                }, startDelay);
            }
        }
        displayedString = currentString.slice(0, currentStringLength);
        typingHTMLElement.innerHTML = `<p>${displayedString}</p>`;
    }, typingSpeed);
}
