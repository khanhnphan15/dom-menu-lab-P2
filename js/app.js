
const mainEl = document.querySelector('main');
const topMenuEl = document.getElementById('top-menu');
const subMenuEl = document.getElementById('sub-menu');
const topMenuLinks = document.querySelectorAll('#top-menu a');
let showingSubMenu = false;
const menuLinks = [
    { text: 'about', href: '/about' },
    {
        text: 'catalog', href: '#', subLinks: [
            { text: 'all', href: '/catalog/all' },
            { text: 'top selling', href: '/catalog/top' },
            { text: 'search', href: '/catalog/search' },
        ]
    },
    {
        text: 'orders', href: '#', subLinks: [
            { text: 'new', href: '/orders/new' },
            { text: 'pending', href: '/orders/pending' },
            { text: 'history', href: '/orders/history' },
        ]
    },
    {
        text: 'account', href: '#', subLinks: [
            { text: 'profile', href: '/account/profile' },
            { text: 'sign out', href: '/account/signout' },
        ]
    },
];


function setStyles() {
    mainEl.style.backgroundColor = 'var(--main-bg)';
    mainEl.classList.add('flex-ctr');

    topMenuEl.style.height = '100%';
    topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
    topMenuEl.classList.add('flex-around');
    subMenuEl.style.height = '100%';
    subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
    subMenuEl.classList.add('flex-around');
    subMenuEl.style.position = 'absolute';
    subMenuEl.style.top = '0';
}

function setContent() {
    mainEl.innerHTML = '<h1>SEI Rocks!</h1>';
}

function setupMenu() {
    // Menu data structure
    for (let i of menuLinks) {
        let a = document.createElement('a');
        a.href = i.href;
        a.text = i.text;
        topMenuEl.appendChild(a);
    }
}

topMenuEl.addEventListener('click', function (evt) {
    evt.preventDefault();
    const link = evt.target;
    if (link.tagName !== 'A') return;
    console.log(link.text);
    if (link.classList.contains('active')) {
        link.classList.remove('active');
        showingSubMenu = false;
        subMenuEl.style.top = 0;
        return;
    }
    topMenuLinks.forEach((link) => {
        link.classList.remove('active');
    })
    link.classList.add('active');
    let linkConfig = menuLinks.find((i) => i.text === link.text);
    if ('subLinks' in linkConfig && linkConfig.subLinks.length > 0) {
        showingSubMenu = true;
    }
    if (showingSubMenu) {
        buildSubMenu(linkConfig.subLinks);
        subMenuEl.style.top = '100%';
    } else {
        showingSubMenu = false;
        subMenuEl.style.top = '0';
    }
    mainEl.innerHTML = `<h1>${linkConfig.text}</h1>`;
});

function buildSubMenu(subLinks) {
    subMenuEl.innerHTML = '';
    subLinks.forEach(function (link) {
        const linkEl = document.createElement('a');
        linkEl.setAttribute('href', link.href);
        linkEl.text = link.text;
        subMenuEl.appendChild(linkEl);
    });
}

subMenuEl.addEventListener('click', function (evt) {
    evt.preventDefault();
    const link = evt.target;
    if (link.tagName !== 'A') return;
    console.log(link.text);
    showingSubMenu = false;
    subMenuEl.style.top = '0';
    topMenuLinks.forEach(function (link) {
        link.classList.remove('active');
    });
    mainEl.innerHTML = `<h1>${link.text}</h1>`;
})


setStyles();
setContent();
setupMenu();