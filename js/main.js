// get settings
let settings;
readJSONFile("settings.json", function (data) {
    settings = JSON.parse(data);
    init();
});

function init() {
    setupNavigation();
    setupScroll();
    setUpSliders();
}

function readJSONFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}
