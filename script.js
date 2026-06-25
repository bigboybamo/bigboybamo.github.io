/* ---------- Helpers ---------- */
const $ = selector => document.querySelector(selector);
const escapeHTML = str =>
  String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

document.title = `${main.name} — ${main.role.split('·')[0].trim()}`;

/* ---------- Hero ---------- */
$('#name').textContent = main.name;
$('#role').textContent = main.role;

// Render intro, replacing {key} tokens with inline links from introLinks.
$('#intro').innerHTML = (main.intro || '').replace(/\{(\w+)\}/g, (match, key) => {
  const item = (main.introLinks || {})[key];
  if (!item) return match;
  return `<a href="${item.link}" target="_blank" rel="noopener">${escapeHTML(item.label)}</a>`;
});

/* ---------- About ---------- */
$('#about').innerHTML = (main.about || [])
  .map(p => `<p>${escapeHTML(p.replace(/\s+/g, ' ').trim())}</p>`)
  .join('');

/* ---------- Writing (live from Dev.to, newest first) ---------- */
function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function renderWriting(posts) {
  const { profile } = main.writing || {};
  let html = '';

  if (posts.length) {
    html += '<ul class="writing-list">';
    html += posts
      .map(
        ({ title, link, date }) => `
        <li class="writing-item">
          <a href="${link}" target="_blank" rel="noopener">${escapeHTML(title)}</a>
          ${date ? `<span class="date">${escapeHTML(date)}</span>` : ''}
        </li>`
      )
      .join('');
    html += '</ul>';
  } else {
    html += '<p class="writing-empty">Articles coming soon.</p>';
  }

  if (profile) {
    html += `<a class="writing-profile" href="${profile.link}" target="_blank" rel="noopener">${escapeHTML(profile.label)} &rarr;</a>`;
  }

  $('#writing').innerHTML = html;
}

(async () => {
  const { username, limit = 5, posts: fallback = [] } = main.writing || {};

  // Show fallback (or "coming soon") immediately so there's no empty flash.
  renderWriting(fallback);
  if (!username) return;

  try {
    // Fetch a buffer beyond `limit` so we still hit `limit` real posts after
    // filtering out non-articles (e.g. Dev.to "[Boost]" placeholders).
    const res = await fetch(
      `https://dev.to/api/articles?username=${encodeURIComponent(username)}&per_page=${limit + 5}`
    );
    if (!res.ok) throw new Error(`Dev.to API ${res.status}`);

    // The API returns articles already sorted newest-first.
    const articles = await res.json();
    const isRealArticle = a => a.title && !/^\[.*\]$/.test(a.title.trim());
    const posts = articles
      .filter(isRealArticle)
      .slice(0, limit)
      .map(a => ({
        title: a.title,
        link: a.url,
        date: formatDate(a.published_at)
      }));

    if (posts.length) renderWriting(posts);
  } catch (err) {
    // Network/offline: keep whatever was rendered from the fallback.
    console.warn('Could not load Dev.to articles:', err);
  }
})();

/* ---------- Connect ---------- */
// Logos no longer hosted by Simple Icons (e.g. LinkedIn, removed at the brand's
// request) are inlined here so they render reliably and stay theme-colored.
const localIcons = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
};

function iconURL(slug, isDark) {
  const color = isDark ? 'ededed' : '6b6b76';
  if (localIcons[slug]) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#${color}" d="${localIcons[slug]}"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

function renderConnects(isDark) {
  $('#connects').innerHTML = (main.connects || [])
    .map(
      ({ name, slug, link }) => `
      <a class="connect-link" href="${link}" target="_blank" rel="noopener" title="${escapeHTML(name)}">
        <img class="icon-img" data-slug="${slug}" src="${iconURL(slug, isDark)}" alt="${escapeHTML(name)}" />
        <span>${escapeHTML(name)}</span>
      </a>`
    )
    .join('');
}

/* ---------- Theme ---------- */
const toggle = $('#theme-toggle');
const icon = $('#theme-icon');

function applyTheme(isDark) {
  document.body.classList.toggle('light-mode', !isDark);
  icon.textContent = isDark ? '☀' : '☾';
  renderConnects(isDark);
}

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

applyTheme(saved ? saved === 'dark' : prefersDark.matches);

prefersDark.addEventListener('change', e => {
  if (!localStorage.getItem('theme')) applyTheme(e.matches);
});

toggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('light-mode'); // currently light -> going dark
  applyTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
