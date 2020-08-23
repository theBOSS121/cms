function setupNavigation() {
    let mainNav = document.querySelector(".main-nav");
    if (!mainNav) {
        console.warn('<nav class="main-nav"></nav> does not exist in HTML');
        return;
    }
    let mainNavContainer = document.createElement("div");
    mainNavContainer.classList.add(
        "container",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    );
    // add logo to mainNavigation
    let navLogo = document.createElement("a");
    navLogo.classList.add("nav-logo");
    navLogo.href = "#";
    navLogo.setAttribute("goto", "body");
    let navLogoImg = document.createElement("img");
    navLogoImg.src = settings.navLogoSrc;
    navLogo.appendChild(navLogoImg);
    mainNavContainer.appendChild(navLogo);
    // add main-nav-desktop ul to the navigation
    let navHolder = document.createElement("ul");
    navHolder.classList.add("main-nav-desktop");
    mainNavContainer.appendChild(navHolder);
    // add main-nav-mobile ul to the navigation
    let mobileNavHolder = document.createElement("ul");
    mobileNavHolder.classList.add("main-nav-mobile");
    mainNavContainer.appendChild(mobileNavHolder);
    // add show-hide-menu btn to the navigation
    let showHideMenu = document.createElement("a");
    showHideMenu.classList.add("show-hide-menu");
    showHideMenu.href = "#";
    mainNavContainer.appendChild(showHideMenu);

    navHolder.classList.add("d-none", "d-" + settings.navExpend + "-flex");
    mobileNavHolder.classList.add(
        "d-" + settings.navExpend + "-none",
        "d-flex",
        "justify-content-center",
        "align-items-center",
        "flex-direction-column",
        "text-align-center"
    );
    mainNav.appendChild(mainNavContainer);
    showHideMenu.classList.add("d-" + settings.navExpend + "-none");
    // main-nav HTML
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
        } else if (navItem.href == null && navItem.goto == null && navItem.dropDown) {
            navHolder.innerHTML += `
                <li><a>${navItem.name.charAt(0).toUpperCase() + navItem.name.slice(1)}</a></li>
            `;
        } else {
            navHolder.innerHTML += `
                <li><a href="#">${
                    navItem.name.charAt(0).toUpperCase() + navItem.name.slice(1)
                }</a></li>
            `;
        }
    }
    for (let i = 0; i < settings.navLinks.length; i++) {
        if (settings.navLinks[i].dropDown) {
            let ul = document.createElement("ul");
            ul.classList.add("dropdown");
            for (let j = 0; j < settings.navLinks[i].dropDown.length; j++) {
                let navItem = settings.navLinks[i].dropDown[j];
                var li = document.createElement("li");

                if ((navItem.href == null || navItem.href == "#") && navItem.goto != null) {
                    li.innerHTML += `
                        <a href="#" goto="${navItem.goto}">${
                        navItem.name.charAt(0).toUpperCase() + navItem.name.slice(1)
                    }</a>
                    `;
                } else if (navItem.href != null) {
                    li.innerHTML += `
                        <a href="${navItem.href}">${
                        navItem.name.charAt(0).toUpperCase() + navItem.name.slice(1)
                    }</a>
                    `;
                } else {
                    li.innerHTML += `
                        <a href="#">${
                            navItem.name.charAt(0).toUpperCase() + navItem.name.slice(1)
                        }</a>
                    `;
                }
                ul.appendChild(li);
            }
            navHolder.children[i].appendChild(ul);
            navHolder.children[i].classList.add("dropdown-parent");
        }
    }
    // mobile navigation HTML
    mobileNavHolder.innerHTML = navHolder.innerHTML;
    // hiding navigation
    let lastYPos = window.pageYOffset;
    let currentYPos = window.pageYOffset;
    let mobileNavShown = false;

    if (settings.navType == 1) {
        window.addEventListener("scroll", () => {
            if (scrollingLinkPressed) return;
            currentYPos = window.pageYOffset;
            if (lastYPos < currentYPos && currentYPos > 160 && !mobileNavShown) {
                mainNav.classList.add("hidden");
            } else {
                mainNav.classList.remove("hidden");
            }

            lastYPos = currentYPos;
        });
    }
    // adding classes based on settings
    if (settings.navType == 0) {
        mainNav.classList.add("nav-type-0");
    } else if (settings.navType == 1) {
        mainNav.classList.add("nav-type-1");
    }
    // show hide menu
    showHideMenu.addEventListener("click", (e) => {
        e.preventDefault();
        let mobileNav = document.querySelector(".main-nav-mobile");
        mobileNav.classList.toggle("show");
        if (mobileNavShown) {
            mobileNavShown = false;
            showHideMenu.classList.remove("close");
        } else {
            mobileNavShown = true;
            showHideMenu.classList.add("close");
        }
    });

    let mobileLinks = document.querySelectorAll(".main-nav-mobile li a");
    for (let i = 0; i < mobileLinks.length; i++) {
        mobileLinks[i].addEventListener("click", () => {
            if (mobileNavShown) {
                let mobileNav = document.querySelector(".main-nav-mobile");
                mobileNav.classList.remove("show");
                showHideMenu.classList.remove("close");
                mobileNavShown = false;
            }
        });
    }
}

let scrollingLinkPressed = false;
