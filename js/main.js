// get settings
let settings;
readJSONFile("settings.json", function (data) {
    settings = JSON.parse(data);
    init();
});

function init() {
    setupNavigation();
    setUpSliders();
    // everything that could have links for scrolling needs to be before this
    setupScroll();
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

// triggers when the whole page is loded including styles, images and other resources
document.addEventListener("DOMContentLoaded", (e) => {
    // collapse
    let collapses = document.querySelectorAll(".collapse");
    for (let i = 0; i < collapses.length; i++) {
        collapses[i].addEventListener("click", (e) => {
            if(!collapses[i].classList.contains('expended')) {
                collapses[i].classList.add('expended');
                collapses[i].style.height = collapses[i]
            }
        });
    }
});
