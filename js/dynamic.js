/* ============================================================
   ДИНАМИЧЕСКИЙ КОНТЕНТ — подгружается из /content/*.json,
   которые редактирует маркетолог через /admin (Decap CMS).
   Без сборки: обычный fetch в браузере при загрузке страницы.
   ============================================================ */
async function loadJSON(path){
  try{
    const r = await fetch(path, {cache:'no-store'});
    if(!r.ok) throw new Error(r.status);
    return (await r.json()).items || [];
  }catch(e){ console.warn('Не удалось загрузить', path, e); return []; }
}
function fmtDateRu(iso){
  const d = new Date(iso+'T00:00:00');
  const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
function initials(name){ return (name||'').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(); }

/* ---------- 1. Логотипы клиентов ---------- */
async function renderClientLogos(){
  const el = document.getElementById('clientLogos'); if(!el) return;
  const items = await loadJSON('/content/client_logos.json');
  const withLogo = items.filter(i=>i.company_name);
  if(withLogo.length===0){ document.querySelector('.logos').style.display='none'; return; }
  el.innerHTML = withLogo.map(i=> i.logo
    ? `<img src="${i.logo}" alt="${i.company_name}" style="height:28px;width:auto;filter:grayscale(1);opacity:.65;transition:.3s" onmouseover="this.style.filter='none';this.style.opacity=1" onmouseout="this.style.filter='grayscale(1)';this.style.opacity=.65">`
    : `<span>${i.company_name}</span>`
  ).join('');
}

/* ---------- 2. Партнёры-рекрутёры ---------- */
async function renderPartners(){
  const el = document.getElementById('partnersGrid'); if(!el) return;
  const items = await loadJSON('/content/partners.json');
  el.innerHTML = items.map(p=>`
    <div class="pcard reveal">
      <div class="photo" style="${p.photo?`background:none;padding:0;overflow:hidden`:''}">${p.photo?`<img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:initials(p.name)}</div>
      <b>${p.name}</b><i>${p.role}</i><p>${p.description}</p>
    </div>`).join('');
  el.querySelectorAll('.reveal').forEach(node=>io.observe(node));
}

/* ---------- 3. Аватарки сообщества ---------- */
async function renderCommunityAvatars(){
  const el = document.getElementById('communityAvatars'); if(!el) return;
  const items = await loadJSON('/content/community_avatars.json');
  el.innerHTML = items.slice(0,10).map(a=> a.photo
    ? `<span style="background:none;padding:0;overflow:hidden"><img src="${a.photo}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></span>`
    : `<span>${a.initials||'?'}</span>`
  ).join('');
}

/* ---------- 4. Ближайший ивент ---------- */
async function renderEvent(){
  const el = document.getElementById('eventCard'); if(!el) return;
  const items = await loadJSON('/content/events.json');
  const today = new Date().toISOString().slice(0,10);
  const upcoming = items.filter(e=>e.date >= today).sort((a,b)=>a.date.localeCompare(b.date));
  if(upcoming.length===0){ document.getElementById('event').style.display='none'; return; }
  const e = upcoming[0];
  el.innerHTML = `
    <div class="event-card reveal">
      <div class="event-poster">${e.cover?`<img src="${e.cover}" alt="" style="width:100%;height:100%;object-fit:cover">`:'AI×HR'}</div>
      <div class="event-info">
        <div class="event-badges"><span class="badge">${e.format}</span><span class="badge date">${fmtDateRu(e.date)} · ${e.time}</span><span class="badge">${e.city}</span></div>
        <b>${e.title}</b>
        <p>${e.excerpt}</p>
        <a class="btn-sm" href="/events/event.html?slug=${e.slug}">Подробнее</a>
      </div>
    </div>`;
  el.querySelectorAll('.reveal').forEach(node=>io.observe(node));
}

/* ---------- 5. Блог (превью последних 3 статей) ---------- */
async function renderBlog(){
  const el = document.getElementById('blogGrid'); if(!el) return;
  const items = await loadJSON('/content/blog.json');
  if(items.length===0){ document.getElementById('blog').style.display='none'; return; }
  const sorted = [...items].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
  el.innerHTML = sorted.map(p=>`
    <a class="bcard reveal" href="/blog/post.html?slug=${p.slug}">
      <div class="bcover">${p.cover?`<img src="${p.cover}" alt="" style="width:100%;height:100%;object-fit:cover">`:'💜'}</div>
      <div class="binfo">
        <time datetime="${p.date}">${fmtDateRu(p.date)}</time>
        <b>${p.title}</b>
        <p>${p.excerpt}</p>
      </div>
    </a>`).join('');
  el.querySelectorAll('.reveal').forEach(node=>io.observe(node));
}

Promise.all([renderClientLogos(), renderPartners(), renderCommunityAvatars(), renderEvent(), renderBlog()]);
