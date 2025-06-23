const getDOM = selector => () => {
  return document.querySelector(selector);
};

document.title = `${main.name} | ${main.role}`

// Values DOM nodes
const dom = {
  main: {
    name: getDOM('#main #name'),
    mail: getDOM('#main #mail'),
    img: getDOM('#main #img'),
    role: getDOM('#main #role'),
    connects: getDOM('#main #connects'),
    links: getDOM('#main #links')
  },
  projects: getDOM('#projects'),
  logo: getDOM('#projects-page #logo')
};

function assignDOM(dom, value, options) {
  console.log('dom, value, img:', dom, value, img);

  if (options && options.isImg) {
    dom.src = value;
    return;
  }

  if (options && options.isAdjacent) {
    dom.insertAdjacentHTML('afterbegin', value);
  }

  dom.innerHTML = value;
}

// Assigning

// MAIN

assignDOM(dom.main.name(), main.name);
assignDOM(dom.main.mail(), main.mail);
dom.main.mail().href = `mailto:${main.mail}?Subject=Hello%20again`;
assignDOM(dom.main.img(), main.img, { isImg: true });
assignDOM(dom.main.role(), main.role);
// assignDOM(dom.main.links(), main.links)

// External Links (ICONS)
const connectsDOM = main.connects
  .map(({ name, iconName, link }) => {
    if (name === 'LinkedIn') {
      return `<a href=${link} target="_blank"><ion-icon name="${iconName}"  class="linkedin-icon" title="${name}"></ion-icon></a>`;
    } else {
      return `<a href="${link}" target="_blank" title="${name}">${iconName}</a>`;
    }
  })
  .join('\n');
assignDOM(dom.main.connects(), connectsDOM);

// Internal Links
const getLinks = links =>
  links
    .map(({ name, link }) => `<a href="${link}" class="text-pink-500" >${name}</a>`)
    .map((link, index, links) => index === links.length - 1 ? link: `${link} - `)
    .join('\n');
assignDOM(dom.main.links(), getLinks(main.links));

const toggleButton = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const isDark = document.body.classList.contains('dark-mode');
  icon.setAttribute('name', isDark ? 'sunny-outline' : 'moon-outline');

   document.querySelectorAll('.icon-img').forEach(img => {
    const currentSrc = img.src;
    const parts = currentSrc.split('/');
    const iconName = parts[3]; 
    img.src = isDark
      ? `https://cdn.simpleicons.org/${iconName}/white`
      : `https://cdn.simpleicons.org/${iconName}`;
  });
});



