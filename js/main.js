// get settings
let settings;
readJSONFile("settings.json", function (data) {
    settings = JSON.parse(data);
    init();
});

function init() {
    setupNavigation();
    setUpSliders();
    setUpTyping();
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
            let collapsesParent = collapses[i].parentElement;
            // if collapsses[i] parent has a class 'collapses' than only one collapse is opened at a time
            if (collapsesParent.classList.contains("collapses")) {
                for (let j = 0; j < collapses.length; j++) {
                    if (j == i) continue;
                    let collapseBody = collapses[j].querySelector(".collapse-body");
                    collapses[j].classList.remove("expended");
                    collapseBody.style.height = "0px";
                }
            }
            // open / close the clicked collapse
            let collapseBody = collapses[i].querySelector(".collapse-body");
            if (!collapses[i].classList.contains("expended")) {
                collapses[i].classList.add("expended");
                collapseBody.style.height = collapseBody.scrollHeight + "px";
            } else {
                collapses[i].classList.remove("expended");
                collapseBody.style.height = "0px";
            }
        });
    }
    // read more
    let readMores = document.querySelectorAll(".read-more");
    for (let i = 0; i < readMores.length; i++) {
        let readMoreContainer = readMores[i].parentElement.querySelector(".read-more-container");
        readMoreContainer.classList.add("collapsed");

        readMores[i].addEventListener("click", (e) => {
            e.preventDefault();
            if (!readMoreContainer.classList.contains("expanded")) {
                readMoreContainer.classList.add("expanded");
                readMoreContainer.style.maxHeight = readMoreContainer.scrollHeight + "px";
                readMores[i].innerHTML = "Read Less";
            } else {
                readMoreContainer.classList.remove("expanded");
                readMoreContainer.classList.add("collapsed");
                // maxHeight is set in css .collapsed {}
                readMoreContainer.style.maxHeight = "";
                readMores[i].innerHTML = "Read more";
            }
        });
    }
    // tabs
    let tabsContainer = document.querySelectorAll(".tabs-container");
    for (let i = 0; i < tabsContainer.length; i++) {
        let tabsNav = tabsContainer[i].querySelector(".tabs-nav");
        let tabsNavItems = tabsNav.querySelectorAll(".tabs-nav-item");
        let tabs = tabsContainer[i].querySelectorAll(".tabs .tab");
        for (let j = 0; j < tabsNavItems.length; j++) {
            let tabId = tabsNavItems[j].getAttribute("data-tab-id");
            tabsNavItems[j].addEventListener("click", () => {
                let tabsOffset = 0;
                for (let a = 0; a < tabs.length; a++) {
                    if (tabId == tabs[a].id) {
                        tabsOffset = a * -100;
                    }
                }
                for (let a = 0; a < tabs.length; a++) {
                    tabs[a].style.left = tabsOffset + "%";
                }
            });
        }
    }
});
