// SIDEBAR
function openSidebar() {
	closeFilters();
	closeUserLinks();
	let sidebar = document.querySelector('#menu-sidebar');
	sidebar.classList.add('show-dialog');
}

function closeSidebar() {
	let sidebar = document.querySelector('#menu-sidebar');
	sidebar.classList.remove('show-dialog');
}

// USER LINKS
function toggleUserLinks() {
	closeFilters();
	closeSidebar();
	let userLinks = document.querySelector('#user-links');
	userLinks.classList.toggle('show-dialog');
}

function closeUserLinks() {
	let userLinks = document.querySelector('#user-links');
	userLinks.classList.remove('show-dialog');
}

// FILTERS
function openFilters() {
	closeSidebar();
	closeUserLinks();
	let filters = document.querySelector('#filters');
	if (filters) {
		filters.classList.add('show-dialog');
	}
}

function closeFilters() {
	let filters = document.querySelector('#filters');
	if (filters && filters.classList.contains('show-dialog')) {
		filters.classList.remove('show-dialog');
	}
}

// CLOSE ALL
function closeAll() {
	closeFilters();
	closeSidebar();
	closeUserLinks();
}

document.addEventListener('click', e => {
	switch (e.target.parentNode.id) {
		case 'open-sidebar':
			openSidebar();
			return;
		case 'close-sidebar':
			closeSidebar();
			return;
		case 'open-filters':
			openFilters();
			return;
		case 'close-filters':
			closeFilters();
			return;
		case 'user-links-btn':
			toggleUserLinks();
			return;
		case 'user-links':
			closeUserLinks();
			return;

		default:
			switch (e.target.id) {
				case 'open-filters':
					openFilters();
					return;
				case 'close-filters':
					closeFilters();
					return;
				default:
					return;
			}
	}
});
