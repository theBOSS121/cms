function setupLanguage() {
    // langCode = localStorage.setItem("lang", "en");
    langCode = localStorage.getItem("lang");
    if (!langCode) {
        // fallback language
        langCode = settings.defaultLanguage;
    }
    readLanguageJSON();
}

let lang;
let defaultLang;
function readLanguageJSON() {
    readJSONFile("/cms/language/" + langCode + ".json", function (data) {
        lang = JSON.parse(data);
        if (langCode == settings.defaultLanguage) {
            defaultLang = lang;
            langTagsToText();
        } else {
            readJSONFile("/cms/language/" + settings.defaultLanguage + ".json", function (data) {
                defaultLang = JSON.parse(data);
                langTagsToText();
            });
        }
    });
}

function langTagsToText() {
    if (!lang || !defaultLang) return;
    let langAttr = document.querySelectorAll("[lang-id]");
    for (let i = 0; i < langAttr.length; i++) {
        let langId = langAttr[i].getAttribute("lang-id");
        let langText = lang[langId];
        if (!langText) langText = defaultLang[langId];
        langAttr[i].innerHTML = langText;
    }
}
