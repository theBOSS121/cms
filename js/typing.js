function setUpTyping() {
    for (let i = 0; i < settings.typing.length; i++) {
        let typing = settings.typing[i];
        let typingHTMLElement = document.querySelector(typing.id);
        let strings = typing.strings;
        let index = 0;
        let displayedString = "";
        let currentString = strings[index];
        let currentStringLength = currentString.length;

        displayedString = strings[index].slice(0, currentStringLength / 2);

        typingHTMLElement.innerHTML = `<p>${displayedString}</p>`;
        // console.log(strings);
    }
}
