#!/usr/bin/env node
// Статический блог для ИИ-ботов и поисковиков (GEO).
// Из content/blog.json (его правит CMS) собирает /blog/<slug>/index.html — весь текст в HTML, без JS.
// Markdown рендерится той же функцией mdToHtml, что и в blog/post.html, — результат совпадает с CMS.
// Запуск: node scripts/build-blog.js  (после каждой новой статьи в CMS; затем обновить sitemap.xml)
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const SITE = 'https://flyhunt.ai';

// --- mdToHtml берём из blog/post.html, чтобы не держать две копии ---
const postHtml = fs.readFileSync(path.join(ROOT, 'blog/post.html'), 'utf8');
const start = postHtml.indexOf('function mdToHtml(');
const end = postHtml.indexOf('\nconst slug');
if (start < 0 || end < 0) throw new Error('mdToHtml не найдена в blog/post.html');
const mdToHtml = new Function(postHtml.slice(start, end) + '\nreturn mdToHtml;')();

const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/blog.json'), 'utf8'));
const extras = JSON.parse(fs.readFileSync(path.join(__dirname, 'blog-extras.json'), 'utf8'));

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const fmtDate = iso => { const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number); return y ? `${d} ${MONTHS[m - 1]} ${y}` : ''; };

const AUTHOR_ARDAK = { '@type': 'Person', name: 'Ардак Бердибеков', jobTitle: 'Founder & CEO, Flyhunt', url: 'https://www.linkedin.com/in/ardak-berdibekov-9a78425b/', sameAs: ['https://www.linkedin.com/in/ardak-berdibekov-9a78425b/'] };
const ORG = { '@type': 'Organization', '@id': SITE + '/#org', name: 'Flyhunt', url: SITE + '/', logo: { '@type': 'ImageObject', url: SITE + '/images/logo.png' } };

const tpl = fs.readFileSync(path.join(__dirname, 'blog-post-template.html'), 'utf8');
const items = (data.items || []).filter(p => p.slug && /^[a-z0-9_-]+$/i.test(p.slug));

for (const p of items) {
  const x = extras[p.slug] || {};
  const url = `${SITE}/blog/${p.slug}/`;
  const h1 = x.h1 || p.title;
  const seoTitle = x.seoTitle || (p.title + ' — Flyhunt');
  const desc = x.description || strip(p.excerpt).slice(0, 200);
  const modified = x.dateModified || p.date;
  const cover = p.cover ? SITE + encodeURI(p.cover) : SITE + '/images/og-flyhunt.png';
  const author = x.author === 'ardak' ? AUTHOR_ARDAK : ORG;

  const graph = [{
    '@type': 'BlogPosting', '@id': url + '#article', headline: h1, name: p.title, description: desc,
    inLanguage: 'ru', datePublished: p.date, dateModified: modified, mainEntityOfPage: url, url,
    image: cover, author, publisher: ORG, isPartOf: { '@type': 'Blog', '@id': SITE + '/blog/#blog', name: 'Блог Flyhunt', url: SITE + '/blog/' }
  }];
  if (x.about) graph[0].about = { '@id': x.about };
  if (x.faq && x.faq.length) graph.push({ '@type': 'FAQPage', mainEntity: x.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
  graph.push({ '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Flyhunt', item: SITE + '/' },
    { '@type': 'ListItem', position: 2, name: 'Блог', item: SITE + '/blog/' },
    { '@type': 'ListItem', position: 3, name: p.title, item: url }] });
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 1).replace(/</g, '\\u003c');

  const authorLine = x.author === 'ardak'
    ? `Автор: <a href="https://www.linkedin.com/in/ardak-berdibekov-9a78425b/" rel="author">Ардак Бердибеков</a>, основатель Flyhunt`
    : `Команда Flyhunt`;
  const dates = `Опубликовано ${fmtDate(p.date)}` + (modified !== p.date ? ` · обновлено ${fmtDate(modified)}` : '');
  const lead = x.lead ? `<div class="art-lead">${x.lead}</div>` : '';
  const sub = x.h1 && x.h1 !== p.title ? `<p class="art-sub">${esc(p.title)}</p>` : '';
  const after = x.afterHtml || '';
  const faq = x.faq && x.faq.length ? `<h2>Частые вопросы</h2>\n<div class="art-faq">${x.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join('\n')}</div>` : '';
  const cta = `<p class="art-cta"><a class="v2-btn" href="https://app.flyhunt.ai/auth/signup?utm_source=flyhunt.ai&amp;utm_medium=blog&amp;utm_campaign=geo&amp;utm_content=${esc(p.slug)}">Попробовать Flyhunt бесплатно</a></p>`;

  const html = tpl
    .replace(/{{seoTitle}}/g, () => esc(seoTitle))
    .replace(/{{desc}}/g, () => esc(desc))
    .replace(/{{url}}/g, () => url)
    .replace(/{{ogImage}}/g, () => cover)
    .replace('{{ld}}', () => ld)
    .replace('{{cover}}', () => p.cover ? `<img src="${esc(p.cover)}" alt="${esc(p.title)}">` : '💜')
    .replace('{{meta}}', () => `${dates} · ${authorLine}`)
    .replace('{{h1}}', () => esc(h1))
    .replace('{{sub}}', () => sub)
    .replace('{{lead}}', () => lead)
    .replace('{{body}}', () => mdToHtml(p.body))
    .replace('{{after}}', () => after)
    .replace('{{faq}}', () => faq)
    .replace('{{cta}}', () => cta);
  const dir = path.join(ROOT, 'blog', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('ok', '/blog/' + p.slug + '/');
}

// Список статических slug — для ссылок в blog/index.html и редиректа из post.html?slug=
const slugs = items.map(p => p.slug);
fs.writeFileSync(path.join(ROOT, 'blog/static-slugs.js'), 'window.FH_STATIC_POSTS=' + JSON.stringify(slugs) + ';\n');

// Статический список статей внутри blog/index.html (между маркерами) — виден без JS
const idxPath = path.join(ROOT, 'blog/index.html');
let idx = fs.readFileSync(idxPath, 'utf8');
const sorted = items.slice().sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
const list = sorted.map(p => `    <a class="bcard" href="/blog/${p.slug}/">
      <div class="bcover">${p.cover ? `<img src="${esc(p.cover)}" alt="" style="width:100%;height:100%;object-fit:cover">` : '💜'}</div>
      <div class="binfo"><time datetime="${esc(p.date)}">${fmtDate(p.date)}</time><b>${esc(p.title)}</b><p>${esc(strip(p.excerpt))}</p></div>
    </a>`).join('\n');
idx = idx.replace(/<!--STATIC-POSTS-->[\s\S]*?<!--\/STATIC-POSTS-->/, () => `<!--STATIC-POSTS-->\n${list}\n    <!--/STATIC-POSTS-->`);
fs.writeFileSync(idxPath, idx);
console.log('index:', slugs.length, 'posts');
