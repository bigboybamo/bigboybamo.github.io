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
function iconURL(slug, isDark) {
  return `https://cdn.simpleicons.org/${slug}/${isDark ? 'ededed' : '6b6b76'}`;
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
