async function loadPortfolio(){
 try{const r=await fetch('data.json');if(!r.ok)throw Error('data.json not found');render(await r.json())}
 catch(e){console.error(e);document.getElementById('projects-list').innerHTML='<p class="muted">Could not load data.json. Upload it beside index.html.</p>'}
}
function put(id,value){const el=document.getElementById(id);if(el&&value!=null)el.textContent=value}
function list(parent,items){const ul=document.createElement('ul');(items||[]).forEach(v=>{const li=document.createElement('li');li.textContent=v;ul.appendChild(li)});parent.appendChild(ul)}
function link(parent,label,url){if(!url)return;const a=document.createElement('a');a.textContent=label;a.href=url;if(/^https?:/i.test(url)){a.target='_blank';a.rel='noopener noreferrer'}parent.appendChild(a)}
function render(d){
 put('name',d.name);put('subtitle',d.title);put('intro',d.intro);put('location',d.location);put('contact',d.phone);put('about',d.about);put('emailText',d.email);
 if(d.avatar)document.getElementById('avatar').src=d.avatar;
 ['gmail','contactButton'].forEach(id=>{const e=document.getElementById(id);if(e)e.href='mailto:'+d.email});
 if(d.facebook)document.getElementById('facebook').href=d.facebook;
 if(d.github)document.getElementById('githubLink').href=d.github;
 if(d.resume)document.getElementById('resumeLink').href=d.resume;
 const tech=document.getElementById('tech-stack');tech.replaceChildren();
 (d.tech||[]).forEach(g=>{const b=document.createElement('div');b.className='tech-block';const h=document.createElement('h4');h.textContent=g.title;b.appendChild(h);list(b,g.items);tech.appendChild(b)});
 const skills=document.getElementById('skills-list');skills.replaceChildren();
 (d.skills||[]).forEach(g=>{const b=document.createElement('div');b.className='skill-group';const h=document.createElement('h4');h.textContent=g.title;b.appendChild(h);list(b,g.items);skills.appendChild(b)});
 const projects=document.getElementById('projects-list');projects.replaceChildren();
 (d.projects||[]).forEach(p=>{const card=document.createElement('article');card.className='project-card';const visual=document.createElement('div');visual.className='project-visual';visual.textContent=p.symbol||'PROJECT';card.appendChild(visual);const body=document.createElement('div');body.className='project-body';const h=document.createElement('h3');h.textContent=p.name;body.appendChild(h);const desc=document.createElement('p');desc.textContent=p.description;body.appendChild(desc);
 if(p.technologies?.length){const tags=document.createElement('div');tags.className='tags';p.technologies.forEach(t=>{const x=document.createElement('span');x.className='tag';x.textContent=t;tags.appendChild(x)});body.appendChild(tags)}
 const links=document.createElement('div');links.className='project-links';link(links,'GitHub repository ↗',p.github);link(links,'Live demo ↗',p.demo);if (p.name && p.name.toLowerCase().includes('pal ai') && p.demo) {
  link(links, 'Install This App ↗', p.demo);
} if(links.children.length)body.appendChild(links);
 if(p.video){const label=document.createElement('p');label.className='video-label';label.textContent=p.videoLabel||'Project video';body.appendChild(label);const video=document.createElement('video');video.className='project-video';video.controls=true;video.preload='metadata';video.playsInline=true;video.src=p.video;if(p.poster)video.poster=p.poster;body.appendChild(video)}
 card.appendChild(body);projects.appendChild(card)});
 const exp=document.getElementById('experience');exp.replaceChildren();(d.experience||[]).forEach(x=>{const b=document.createElement('article');b.className='exp-item';const h=document.createElement('h4');h.textContent=x.role;b.appendChild(h);if(x.years){const m=document.createElement('div');m.className='exp-meta';m.textContent=x.years;b.appendChild(m)}const p=document.createElement('p');p.textContent=x.description;b.appendChild(p);exp.appendChild(b)});
 const edu=document.getElementById('education');edu.replaceChildren();(d.education||[]).forEach(x=>{const b=document.createElement('div');b.className='education-item';const strong=document.createElement('strong');strong.textContent=x.degree;b.appendChild(strong);const span=document.createElement('span');span.textContent=x.place+' · '+x.year;b.appendChild(span);edu.appendChild(b)});
 const ach=document.getElementById('achievements');ach.replaceChildren();(d.achievements||[]).forEach(x=>{const b=document.createElement('div');b.className='achievement';b.textContent='• '+x;ach.appendChild(b)});put('year',new Date().getFullYear())
}
document.addEventListener('DOMContentLoaded',loadPortfolio);
