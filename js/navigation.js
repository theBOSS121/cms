function setupNavigation() {
	let navHolder = document.querySelector('.main-nav');
	for (let i = 0; i < settings.navLinks.length; i++) {
		let navItem = settings.navLinks[i];
		if ((navItem.href == null || navItem.href == '#') && navItem.goto != null) {
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
	for (let i = 0; i < settings.navLinks.length; i++) {
		if (settings.navLinks[i].dropDown) {
			let ul = document.createElement('ul');
			ul.classList.add('drop-down');
			for (let j = 0; j < settings.navLinks[i].dropDown.length; j++) {
				let navItem = settings.navLinks[i].dropDown[j];
				var li = document.createElement('li');

				if (
					(navItem.href == null || navItem.href == '#') &&
					navItem.goto != null
				) {
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
													navItem.name.charAt(0).toUpperCase() +
													navItem.name.slice(1)
												}</a>
                    `;
				}
				ul.appendChild(li);
			}
			navHolder.children[i].appendChild(ul);
		}
	}

	let nav = document.querySelector('header nav');
	let lastYPos = window.pageYOffset;
	let currentYPos = window.pageYOffset;

	if (settings.navType == 1) {
		window.addEventListener('scroll', () => {
			if (scrollingLinkPressed) return;
			currentYPos = window.pageYOffset;
			if (lastYPos < currentYPos && currentYPos > 160) {
				nav.classList.add('hidden');
			} else {
				nav.classList.remove('hidden');
			}

			lastYPos = currentYPos;
		});
	}

	if (settings.navType == 0) {
		nav.classList.add('nav-type-0');
	} else if (settings.navType == 1) {
		nav.classList.add('nav-type-1');
	}
}

let scrollingLinkPressed = false;
