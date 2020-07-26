// get settings
let settings;
readJSONFile("settings.json", function (data) {
    settings = JSON.parse(data);
    console.log(settings);
    // set navigation
    setNavigation();

    setUpScroll();
});

function setNavigation() {
    let navHolder = document.querySelector(".main-nav");
    for (let i = 0; i < settings.navLinks.length; i++) {
        let navItem = settings.navLinks[i];
        if ((navItem.href == null || navItem.href == "#") && navItem.goto != null) {
            navHolder.innerHTML += `
                <li><a href="#" goto="${navItem.goto}">${
                navItem.name.charAt(0).toUpperCase() + navItem.name.slice(1)
            }</a></li>
            `;
        } else if (navItem.href != null) {
            navHolder.innerHTML += `
                <li><a href="${navItem.href}">${
                navItem.name.charAt(0).toUpperCase() + navItem.name.slice(1)
            }</a></li>
            `;
        } else {
            navHolder.innerHTML += `
                <li><a href="#">${
                    navItem.name.charAt(0).toUpperCase() + navItem.name.slice(1)
                }</a></li>
            `;
        }
    }
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
