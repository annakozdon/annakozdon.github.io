/* ─────────────────────────────────────────
   DATA DECLARATIONS (populated from data.json)
───────────────────────────────────────── */
let JOBS=[];
let VALUES_CHIPS=[];
let THINKING_CHIPS=[];
let BOOST_DATA={space:[],sensory:[],culture:[]};
let WIZYTOWKA_ITEMS=[];
let EMPLOYER_DATA={};

/* ─────────────────────────────────────────
   LOGO HELPERS
───────────────────────────────────────── */
const LOGOS = {
  allegro:`<svg width="28" height="18" viewBox="0 0 36 22"><text x="50%" y="78%" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="900" fill="#fff">a</text></svg>`,
  bloomroot:`<svg width="38" height="38" viewBox="0 0 48 48" fill="none"><path d="M24 7c-6 0-12 5-13 11 5 0 10 4 11 9 1-5 6-9 11-9-1-6-9-11-9-11z" fill="#72c498"/><path d="M14 26c0 6 5 12 10 15 5-3 10-9 10-15-4-1-7-2-10 0-3-2-6-1-10 0z" fill="#4caf50"/></svg>`,
  skycash:`<svg width="30" height="16" viewBox="0 0 44 20"><text x="50%" y="80%" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="800" fill="#fff">sky</text></svg>`,
  airbnb:`<svg width="28" height="28" viewBox="0 0 36 36" fill="none"><path d="M18 3C14 10 8 15 8 21a10 10 0 0 0 20 0c0-6-6-11-10-18z" fill="#FF5A5F"/><circle cx="18" cy="14" r="3" fill="#fff"/></svg>`,
  'ikea-wawa':`<svg width="34" height="16" viewBox="0 0 50 20"><text x="50%" y="80%" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="900" fill="#ffda1a">IKEA</text></svg>`,
  'ikea-krakow':`<svg width="34" height="16" viewBox="0 0 50 20"><text x="50%" y="80%" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="900" fill="#ffda1a">IKEA</text></svg>`,
  'mixa-wawa':`<svg width="40" height="20" viewBox="0 0 56 24"><text x="50%" y="78%" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="700" fill="#7b35cc" font-style="italic">Mixa</text></svg>`,
  'mixa-krakow':`<svg width="40" height="20" viewBox="0 0 56 24"><text x="50%" y="78%" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="700" fill="#7b35cc" font-style="italic">Mixa</text></svg>`,
  paypal:`<svg width="22" height="26" viewBox="0 0 30 34"><text x="50%" y="70%" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="900" fill="#009cde">P</text></svg>`,
  znany:`<svg width="28" height="14" viewBox="0 0 40 20"><text x="50%" y="80%" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="#fff">ZL</text></svg>`,
};

function logoStyle(job){
  if(job.id==='airbnb') return 'background:#fff0ef;border:1.5px solid #ffd0cc;';
  if(job.id==='mixa-wawa'||job.id==='mixa-krakow') return 'background:#f0e8ff;';
  return `background:${job.logoColor};`;
}

/* ─────────────────────────────────────────
   CARD BUILDER
───────────────────────────────────────── */
const PIN_SVG=`<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#8e8ba3"/></svg>`;
const BAG_SVG=`<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6h-2.18c.07-.44.18-.88.18-1a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3c0 .12.11.56.18 1H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM4 19V8h2.18C7.1 10.27 9.37 12 12 12s4.9-1.73 5.82-4H20v11H4z" fill="#8e8ba3"/></svg>`;

function buildCard(job){
  return `<li role="listitem">
    <article class="job-card" role="button" tabindex="0"
      aria-label="${job.company} – ${job.role}, ${job.location}"
      onclick="showJobDetail('${job.id}')" onkeydown="cardKey(event,'${job.id}')">
      <div class="jc-top">
        <div class="company-logo" style="${logoStyle(job)}">${LOGOS[job.id]||''}</div>
        <div><div class="jc-name">${job.company}</div><div class="jc-role">${job.role}</div></div>
      </div>
      <div class="jc-meta">
        <div class="jc-meta-row">${PIN_SVG}<span>${job.location}</span>${BAG_SVG}<span style="margin-left:6px">${job.salary.replace(' brutto','')}</span></div>
        <div class="jc-meta-row"><span class="jc-tags">${job.tags}</span></div>
      </div>
    </article>
  </li>`;
}

/* ─────────────────────────────────────────
   SKELETON BUILDER
───────────────────────────────────────── */
function buildSkeletons(n){
  const widths=[['60%','40%','80%','65%'],['55%','35%','75%','60%'],['70%','45%','85%','70%'],['50%','38%','72%','55%']];
  return Array.from({length:n},(_,i)=>{
    const w=widths[i%4];
    return `<li role="listitem">
      <article class="job-card skeleton-card" aria-hidden="true">
        <div class="jc-top">
          <div class="sk-circle shimmer"></div>
          <div style="flex:1;display:flex;flex-direction:column;gap:6px">
            <span class="sk-line shimmer" style="width:${w[0]};height:13px"></span>
            <span class="sk-line shimmer" style="width:${w[1]};height:11px"></span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;margin-top:8px">
          <span class="sk-line shimmer" style="width:${w[2]};height:11px"></span>
          <span class="sk-line shimmer" style="width:${w[3]};height:11px"></span>
        </div>
      </article>
    </li>`;
  }).join('');
}

/* ─────────────────────────────────────────
   STATE
───────────────────────────────────────── */
let _currentJobId='bloomroot';
let _isLoggedIn=false;
let _userName='Anna Kowalska';
let _userEmail='annakowalska@email.com';
let _hasCustomAvatar=false;
// Where login was triggered from: 'apply' or 'home'
let _loginOrigin='home';

/* ─────────────────────────────────────────
   TOAST
───────────────────────────────────────── */
let _toastTimer=null;
function showToast(msg,type='success'){
  const t=document.getElementById('toast');
  t.className='toast toast-'+type+' show';
  const icon=type==='success'
    ?`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#2a7d4f"/></svg>`
    :`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#c62828"/></svg>`;
  t.innerHTML=`${icon}<span>${msg}</span><button class="toast-close" onclick="hideToast()" aria-label="Zamknij">×</button>`;
  if(_toastTimer) clearTimeout(_toastTimer);
  _toastTimer=setTimeout(hideToast,4000);
}
function hideToast(){
  document.getElementById('toast').classList.remove('show');
}

/* ─────────────────────────────────────────
   AVATAR
───────────────────────────────────────── */
function getInitials(name){
  return name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
}
function updateAllAvatars(){
  const initials=getInitials(_userName);
  const avatarDefaultSvg=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#666"/></svg>`;
  const homeCont=document.getElementById('home-avatar-content');
  const resCont=document.getElementById('results-avatar-content');
  const menuCont=document.getElementById('menu-avatar-content');
  if(_isLoggedIn){
    const initHtml=`<span class="avatar-initials">${initials}</span>`;
    if(homeCont) homeCont.innerHTML=initHtml;
    if(resCont) resCont.innerHTML=initHtml;
    if(menuCont) menuCont.innerHTML=initHtml;
    const menuBtn=document.getElementById('menu-avatar-btn');
    if(menuBtn) menuBtn.classList.add('has-initials');
  } else {
    if(homeCont) homeCont.innerHTML=avatarDefaultSvg;
    if(resCont) resCont.innerHTML=avatarDefaultSvg;
    if(menuCont) menuCont.innerHTML='';
    const menuBtn=document.getElementById('menu-avatar-btn');
    if(menuBtn) menuBtn.classList.remove('has-initials');
  }
  const nameEl=document.getElementById('menu-user-name');
  const emailEl=document.getElementById('menu-user-email');
  if(nameEl) nameEl.textContent=_userName;
  if(emailEl) emailEl.textContent=_userEmail;
}
function openAvatarModal(){
  const circle=document.getElementById('avatar-modal-circle');
  const delBtn=document.getElementById('avatar-delete-btn');
  if(_hasCustomAvatar){
    circle.style.background='linear-gradient(135deg,#7c5cbf,#2a7d4f)';
    circle.textContent='';
    delBtn.style.display='';
  } else {
    circle.style.background='var(--border)';
    circle.innerHTML=`<span class="avatar-initials" style="font-size:24px">${getInitials(_userName)}</span>`;
    delBtn.style.display='none';
  }
  document.getElementById('avatar-modal').classList.add('open');
}
function closeAvatarModal(){
  document.getElementById('avatar-modal').classList.remove('open');
}
function changeAvatarDemo(){
  _hasCustomAvatar=true;
  closeAvatarModal();
  showToast('Zdjęcie profilowe zostało zaktualizowane.');
}
function deleteAvatarDemo(){
  _hasCustomAvatar=false;
  closeAvatarModal();
  showToast('Zdjęcie profilowe zostało usunięte.');
}

/* ─────────────────────────────────────────
   PROFILE CTA
───────────────────────────────────────── */
function saveProfileDemo(){
  const activeTab=document.querySelector('.profile-tab.active');
  const tab=activeTab?activeTab.id.replace('tab-',''):'bio';
  const msgs={bio:'Bio zostało zapisane.',boosters:'Boostery i blokery zostały zapisane.',card:'Wizytówka jest gotowa do udostępnienia.'};
  showToast(msgs[tab]||'Zapisano.');
}

/* ─────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────── */
const _history=[];

function showScreen(id){
  const prev=document.querySelector('.screen.active');
  if(prev&&prev.id!==id) _history.push(prev.id);
  _doShowScreen(id);
}

function _doShowScreen(id){
  document.querySelectorAll('.screen').forEach(s=>{
    s.classList.remove('active');
    s.setAttribute('aria-hidden','true');
  });
  const el=document.getElementById(id);
  if(!el) return;
  history.pushState({id: id}, "")
  el.classList.add('active');
  el.removeAttribute('aria-hidden');
  el.scrollTop=0;
  const titles={
    'screen-home':'NeuroBooster – Oferty',
    'screen-filters':'Filtry | NeuroBooster',
    'screen-results':'Wyniki wyszukiwania | NeuroBooster',
    'screen-detail':'Szczegóły oferty | NeuroBooster',
    'screen-employer':'Strona pracodawcy | NeuroBooster',
    'screen-login':'Logowanie | NeuroBooster',
    'screen-apply':'Aplikuj | NeuroBooster',
    'screen-success':'Aplikacja wysłana | NeuroBooster',
    'screen-documents':'Dokumenty | NeuroBooster',
    'screen-profile':'Ustawienia profilu | NeuroBooster',
    'screen-favourites':'Ulubione | NeuroBooster',
    'screen-applications':'Moje aplikacje | NeuroBooster',
    'screen-app-detail':'Status aplikacji | NeuroBooster'
  };
  document.title=titles[id]||'NeuroBooster';
}

function goBack(){
  if(_history.length>0){
    const prev=_history.pop();
    _doShowScreen(prev);
  } else {
    _doShowScreen('screen-home');
  }
}

function openMenu(){
  document.getElementById('menu-overlay').classList.add('open');
  document.getElementById('menu-overlay').removeAttribute('aria-hidden');
}
function closeMenu(){
  document.getElementById('menu-overlay').classList.remove('open');
  document.getElementById('menu-overlay').setAttribute('aria-hidden','true');
}
function openFromMenu(id){
  closeMenu();
  showScreen(id);
}

function avatarClick(){
  if(_isLoggedIn) openMenu();
  else handleLoginFromHome();
}

function handleApplyClick(){
  if(_isLoggedIn){
    showApplyScreen();
  } else {
    _loginOrigin='apply';
    showScreen('screen-login');
  }
}

function handleLoginFromHome(){
  _loginOrigin='home';
  showScreen('screen-login');
}

function handleLogout(){
  _isLoggedIn=false;
  updateAllAvatars();
  closeMenu();
  showToast('Zostałeś/aś wylogowany/a.','success');
  _doShowScreen('screen-home');
  _history.length=0;
}

function goToMyApplications(){
  _history.length=0;
  _doShowScreen('screen-home');
  _history.push('screen-home');
  _doShowScreen('screen-applications');
}

function cardKey(e,id){if(e.key==='Enter'||e.key===' '){e.preventDefault();showJobDetail(id);}}

/* ─────────────────────────────────────────
   JOB DETAIL
───────────────────────────────────────── */
function showJobDetail(id){
  const job=JOBS.find(j=>j.id===id);
  if(!job) return;

  var matches=fillMatches(job, "match");
  var mismatches=fillMatches(job, "mismatch");

  console.log(matches);
  console.log(mismatches);

  document.getElementById('dt-date').textContent='Data dodania: '+job.date;
  document.getElementById('dt-logo').innerHTML=`<div class="detail-logo" style="${logoStyle(job)}">${LOGOS[id]||''}</div>`;
  document.getElementById('dt-company').textContent=job.company;
  document.getElementById('dt-role').textContent=job.role;
  document.getElementById('dt-level').textContent=job.type;
  document.getElementById('dt-location').textContent=job.location;
  document.getElementById('dt-mode').textContent=job.workMode;
  document.getElementById('dt-schedule').textContent=job.schedule;

  document.getElementById('dt-salary').textContent=job.salary;
  document.getElementById('dt-contracts').textContent=job.contracts;
  document.getElementById('dt-paychips').innerHTML=job.payChips.map(c=>`<span class="salary-chip">${c}</span>`).join('');
  document.getElementById('dt-paynote').textContent=job.payNote;

  document.getElementById('dt-match-text').textContent=`${job.matchCount} dopasowanych cech
  ${job.mismatchCount} różnic(e) - sprawdź przed aplikacją`;
  document.getElementById('dt-match-title-plus').textContent=`To was łączy`;
  document.getElementById('dt-match-chips-plus').innerHTML=matches.map((e)=>`<span class="chip" style="border: 1px; background: #B8DFC0; color: #28A35A; borderColor: #28A35A">
    <span class="cs-icon material-symbols-outlined" style="color: #28A35A;">thumb_up</span> ${e}
  </span>`).join('');
  document.getElementById('dt-match-title-minus').textContent=`Warto mieć na uwadze`;
  document.getElementById('dt-match-chips-minus').innerHTML=mismatches.map((e)=>`<span class="chip" style="border: 1px; background: #F0BABA; color: #C83232; borderColor: #C83232">
    <span class="cs-icon material-symbols-outlined" style="color: #C83232;">thumb_down</span> ${e}
  </span>`).join('');

  document.getElementById('dt-about').textContent=job.about;

  document.getElementById('dt-tasks-intro').textContent=job.tasksIntro;
  document.getElementById('dt-tasks').innerHTML=makeList(job.tasks);

  document.getElementById('dt-day-intro').textContent=job.dayIntro;
  document.getElementById('dt-day').innerHTML=makeList(job.dayItems);

  document.getElementById('dt-required').innerHTML=makeList(job.required);
  document.getElementById('dt-nice').textContent=job.nice;

  document.getElementById('dt-chips').innerHTML=job.chips.map(c=>`<span class="chip">${c}</span>`).join('');

  document.getElementById('dt-benefits').innerHTML=job.benefits.map(([e,t])=>`<span class="chip">${t}</span>`).join('');

  document.getElementById('dt-extra').innerHTML=makeList(job.extra);

  document.getElementById('match-exp').classList.remove('open');
  document.getElementById('match-btn').setAttribute('aria-expanded','false');
  document.getElementById('match-chevron').style.transform='';

  document.getElementById('fav-icon').textContent='favorite_border';
  document.getElementById('fav-icon').style.color='#1c1b2e';
  document.getElementById('fav-btn').setAttribute('aria-pressed','false');
  document.getElementById('fav-btn').style.borderColor='';

  _currentJobId=id;
  showScreen('screen-detail');
}

function makeList(items){
  return`<ul class="cs-list">${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
}

/* ─────────────────────────────────────────
   RESULTS + SKELETON
───────────────────────────────────────── */
let skeletonTimer=null;

function goToResults(){
  showScreen('screen-results');

  const sk=document.getElementById('skeleton-list');
  const rl=document.getElementById('results-list');
  const pg=document.getElementById('results-pagination');
  const ft=document.getElementById('results-footer');

  sk.style.display='flex';
  sk.setAttribute('aria-busy','true');
  rl.style.display='none';
  rl.style.opacity='0';
  pg.style.display='none';
  ft.style.display='none';

  if(skeletonTimer) clearTimeout(skeletonTimer);
  skeletonTimer=setTimeout(()=>{
    sk.style.display='none';
    sk.removeAttribute('aria-busy');
    rl.innerHTML=JOBS.map(buildCard).join('');
    rl.style.display='flex';
    pg.style.display='flex';
    ft.style.display='flex';
    requestAnimationFrame(()=>{ rl.style.transition='opacity .4s'; rl.style.opacity='1'; });
  },1800);
}

/* ─────────────────────────────────────────
   ACTIVE FILTERS TOGGLE
───────────────────────────────────────── */
function toggleActiveFilters(){
  const exp=document.getElementById('af-expand');
  const chev=document.getElementById('af-chevron');
  const row=document.getElementById('af-row');
  const open=exp.classList.toggle('open');
  row.setAttribute('aria-expanded',String(open));
  chev.style.transform=open?'rotate(180deg)':'';
}

/* ─────────────────────────────────────────
   FILTER HELPERS
───────────────────────────────────────── */
function clearAllFilters(){
  document.querySelectorAll('#screen-filters input[type=checkbox]').forEach(cb=>cb.checked=false);
  document.getElementById('filter-loc').value='';
}

/* ─────────────────────────────────────────
   DETAIL INTERACTIONS
───────────────────────────────────────── */
function toggleFav(){
  const btn=document.getElementById('fav-btn');
  const icon=document.getElementById('fav-icon');
  const on=btn.getAttribute('aria-pressed')==='true';
  btn.setAttribute('aria-pressed',String(!on));
  if(!on){
    icon.textContent='favorite';
    icon.style.color='#1c1b2e';
    btn.style.borderColor='#1c1b2e';
  } else {
    icon.textContent='favorite_border';
    icon.style.color='#1c1b2e';
    btn.style.borderColor='';
  }
}

function getRandomFromBucket(bucket) {
   var randomIndex = Math.floor(Math.random()*bucket.length);
   return bucket.splice(randomIndex, 1)[0];
}

function fillMatches(job, ismatch){
  const d=JSON.parse(document.getElementById('app-data').textContent);
  boost_data=d.profile.boostData.space.concat(d.profile.boostData.culture, d.profile.boostData.sensory);
  deboost_data=job.chipsNegative;

  console.log("In fillMatches");

  console.log(job);
  console.log(ismatch);

  var count=ismatch==="match"? job.matchCount: ismatch==="mismatch"? job.mismatchCount: 0

  bucket=[];

  switch (ismatch) {

    case "match":
      var positive_count=count<boost_data.length? count: boost_data.length;

      for (var i=0;i<positive_count;i++) {
        bucket.push(getRandomFromBucket(boost_data))
      };
      break;
    
    case "mismatch":
      var negative_count=count<deboost_data.length? count: deboost_data.length;

      for (var i=0;i<negative_count;i++) {
        bucket.push(getRandomFromBucket(deboost_data))
      };
      break;

  }
  console.log(bucket)
  return bucket;
}

function toggleMatch(){
  const panel=document.getElementById('match-exp');
  const btn=document.getElementById('match-btn');
  const chev=document.getElementById('match-chevron');
  const open=panel.classList.toggle('open');
  btn.setAttribute('aria-expanded',String(open));
  chev.style.transform=open?'rotate(180deg)':'';
}

/* ─────────────────────────────────────────
   LOGIN
───────────────────────────────────────── */
function handleSendLink(){
  const input=document.getElementById('login-email');
  const btn=document.getElementById('send-btn');
  const old=document.getElementById('email-err');
  if(old) old.remove();
  input.style.borderColor='';

  if(!input.value.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)){
    input.style.borderColor='#c62828';
    const err=document.createElement('p');
    err.id='email-err';
    err.setAttribute('role','alert');
    err.style.cssText='color:#c62828;font-size:12px;margin:-12px 0 12px;width:100%';
    err.textContent='Podaj poprawny adres e-mail.';
    input.insertAdjacentElement('afterend',err);
    input.focus();
    return;
  }
  btn.textContent='Link wysłany ✓';
  btn.style.background='#2a7d4f';
  btn.disabled=true;
  setTimeout(()=>{
    _isLoggedIn=true;
    _userEmail=input.value.trim();
    _userName=_userEmail.split('@')[0].replace(/[._-]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
    updateAllAvatars();
    showToast('Zalogowano pomyślnie.');
    if(_history[_history.length-1]==='screen-login') _history.pop();
    _afterLoginRedirect();
    btn.textContent='Wyślij link';btn.style.background='';btn.disabled=false;input.value='';
  },1800);
}

/* ─────────────────────────────────────────
   APPLY SCREEN
───────────────────────────────────────── */
const PROFILE_DOCS=['CV_2025.pdf','CV_krotkie.pdf','List motywacyjny 2025.doc'];
const DEMO_UPLOADS=[
  {name:'MojeCv_26.pdf',valid:true},
  {name:'ListMotywacyjny26.doc',valid:true},
  {name:'ListMotywacyjny26.png',valid:false},
];
let demoUploadIdx=0;
const applyState={selectedProfile:new Set(),uploadedFiles:[]};

function loginWithGoogle(){
  _isLoggedIn=true;
  updateAllAvatars();
  showToast('Zalogowano pomyślnie.');
  if(_history[_history.length-1]==='screen-login') _history.pop();
  _afterLoginRedirect();
}

function _afterLoginRedirect(){
  if(_loginOrigin==='apply'){
    showApplyScreen();
  } else {
    _doShowScreen('screen-home');
    setTimeout(()=>showToast('Uzupełnij profil, aby zobaczyć lepiej dopasowane oferty.','success'),400);
  }
}

function showApplyScreen(){
  const job=JOBS.find(j=>j.id===_currentJobId)||JOBS[0];
  const salary=job.salary.replace(' PLN brutto',' PLN');
  document.getElementById('apply-job-mini').innerHTML=`
    <div class="ajm-top">
      <div class="ajm-logo" style="${logoStyle(job)}">${LOGOS[job.id]||''}</div>
      <div><div class="ajm-company">${job.company}</div><div class="ajm-role">${job.role}, ${job.type.split(' / ')[0]}</div></div>
    </div>
    <div class="ajm-meta">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#55536a"/></svg>
      <span>${job.location}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6h-2.18c.07-.44.18-.88.18-1a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3c0 .12.11.56.18 1H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM4 19V8h2.18C7.1 10.27 9.37 12 12 12s4.9-1.73 5.82-4H20v11H4z" fill="#55536a"/></svg>
      <span>${salary}</span>
    </div>
    <div class="ajm-tags">${job.tags}</div>`;
  applyState.selectedProfile.clear();
  applyState.uploadedFiles=[];
  demoUploadIdx=0;
  document.getElementById('apply-first').value='';
  document.getElementById('apply-last').value='';
  renderDocs();
  validateApplyForm();
  showScreen('screen-apply');
}

const FILE_SVG=(color)=>`<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" fill="${color}"/></svg>`;
const WARN_SVG=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;margin-top:1px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#c62828"/></svg>`;
const PLUS_SVG=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#1c1b2e"/></svg>`;

function renderDocs(){
  const box=document.getElementById('apply-docs-box');
  const uploads=applyState.uploadedFiles;
  const hasUploads=uploads.length>0;
  const hasError=uploads.some(f=>!f.valid);
  const hasProfile=PROFILE_DOCS.length>0;
  let html='';

  if(hasProfile){
    html+=`<div class="docs-section-label">Wybierz z profilu</div>`;
    PROFILE_DOCS.forEach((doc,i)=>{
      const chk=applyState.selectedProfile.has(i)?'checked':'';
      html+=`<label class="docs-item"><input type="checkbox" ${chk} onchange="toggleProfileDoc(${i})"/><span class="docs-item-name">${doc}</span></label>`;
    });
  }

  if(hasUploads){
    html+=`<div class="docs-upload-label">Wgraj z urządzenia</div>`;
    uploads.forEach((f,i)=>{
      const ec=f.valid?'':' has-error';
      const nc=f.valid?'':' err';
      html+=`<div class="docs-ufile${ec}">${FILE_SVG(f.valid?'#55536a':'#c62828')}<span class="docs-ufile-name${nc}">${f.name}</span><button class="docs-remove" onclick="removeUpload(${i})" aria-label="Usuń">×</button></div>`;
    });
    if(hasError){
      html+=`<div class="docs-err-bar">${WARN_SVG}<span class="docs-err-text">Wystąpił problem z załącznikiem. Upewnij się, że wybrany dokument jest plikiem tekstowym (PDF lub Word) i spróbuj ponownie.</span></div>`;
    }
  } else if(!hasProfile){
    html+=`<div class="docs-empty"><svg width="38" height="38" viewBox="0 0 24 24" fill="none"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" fill="#ddd8d2"/></svg><span class="docs-empty-text">Nie masz żadnych dokumentów dołączonych do profilu.</span></div>`;
  }

  const btnLabel=hasProfile?'Załącz nowy dokument':'Dodaj dokument';
  html+=`<div class="docs-actions"><button class="docs-btn" onclick="addUpload()">${PLUS_SVG}${btnLabel}</button><span class="docs-accept">Akceptowane formaty: PDF</span></div>`;
  box.innerHTML=html;
}

function toggleProfileDoc(idx){
  if(applyState.selectedProfile.has(idx)) applyState.selectedProfile.delete(idx);
  else applyState.selectedProfile.add(idx);
  renderDocs();
  validateApplyForm();
}

function addUpload(){
  applyState.uploadedFiles.push({...DEMO_UPLOADS[demoUploadIdx%DEMO_UPLOADS.length]});
  demoUploadIdx++;
  renderDocs();
  validateApplyForm();
}

function removeUpload(idx){
  applyState.uploadedFiles.splice(idx,1);
  renderDocs();
  validateApplyForm();
}

function validateApplyForm(){
  const first=document.getElementById('apply-first').value.trim();
  const last=document.getElementById('apply-last').value.trim();
  const hasValidDoc=applyState.selectedProfile.size>0||applyState.uploadedFiles.some(f=>f.valid);
  document.getElementById('apply-submit-btn').disabled=!(first&&last&&hasValidDoc);
}

function handleApplySubmit(){
  const btn=document.getElementById('apply-submit-btn');
  btn.textContent='Wysyłanie…';
  btn.disabled=true;
  setTimeout(()=>{
    btn.textContent='Wyślij aplikację';
    btn.style.background='';
    btn.disabled=false;
    showScreen('screen-success');
    showToast('Aplikacja wysłana pomyślnie!');
  },1200);
}

/* ─────────────────────────────────────────
   DOCUMENTS SCREEN
───────────────────────────────────────── */
let _userDocs=[
  {name:'MojeCV_26.pdf'},
  {name:'MojeCV_krotkie.pdf'},
];
let _docToDelete=null;

const DOC_SVG=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 16h8v2H8v-2zm0-4h8v2H8v-2z" fill="#55536a"/></svg>`;
const TRASH_SVG=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#1c1b2e"/></svg>`;

function renderDocsList(){
  const list=document.getElementById('docs-file-list');
  const empty=document.getElementById('docs-screen-empty');
  if(!list) return;
  if(_userDocs.length===0){
    list.innerHTML='';
    if(empty) empty.style.display='flex';
  } else {
    if(empty) empty.style.display='none';
    list.innerHTML=_userDocs.map((d,i)=>`
      <li class="docs-file-item">
        ${DOC_SVG}
        <span class="docs-file-name">${d.name}</span>
        <button class="docs-file-delete" onclick="openDeleteModal(${i})" aria-label="Usuń ${d.name}">${TRASH_SVG}</button>
      </li>`).join('');
  }
}

function addDocumentDemo(){
  const names=['NowyCertyfikat.pdf','Portfolio2025.pdf','ReferencjeXYZ.pdf'];
  _userDocs.push({name:names[_userDocs.length%names.length]});
  renderDocsList();
  showToast('Dokument został dodany.');
}

function openDeleteModal(idx){
  _docToDelete=idx;
  document.getElementById('delete-modal-overlay').classList.add('open');
}

function closeDeleteModal(){
  _docToDelete=null;
  document.getElementById('delete-modal-overlay').classList.remove('open');
}

function confirmDeleteDocument(){
  if(_docToDelete!==null){
    const name=_userDocs[_docToDelete]?.name||'Dokument';
    _userDocs.splice(_docToDelete,1);
    renderDocsList();
    showToast(`"${name}" został usunięty.`,'success');
  }
  closeDeleteModal();
}

/* ─────────────────────────────────────────
   PROFILE TABS
───────────────────────────────────────── */
function switchProfileTab(tab){
  ['bio','boosters','card'].forEach(t=>{
    document.getElementById('tab-'+t).classList.toggle('active',t===tab);
    document.getElementById('tab-'+t).setAttribute('aria-selected',String(t===tab));
    document.getElementById('panel-'+t).style.display=t===tab?'block':'none';
  });
  const labels={bio:'Zapisz Bio',boosters:'Zapisz Boostery',card:'Zapisz wizytówkę'};
  const btn=document.querySelector('.profile-sticky .btn-filled');
  if(btn) btn.textContent=labels[tab]||'Zapisz';
}

function toggleAcc(id){
  const acc=document.getElementById(id);
  const body=acc.querySelector('.profile-acc-body');
  const hdr=acc.querySelector('.profile-acc-header');
  const open=body.classList.toggle('open');
  hdr.setAttribute('aria-expanded',String(open));
}

const selectedBio=new Set(['Bezpieczeństwo']);
const selectedThinking=new Set(['Efektywność działania w zmianie']);

function renderBioChips(){
  const vEl=document.getElementById('chips-values');
  const tEl=document.getElementById('chips-thinking');
  if(!vEl||!tEl) return;
  vEl.innerHTML=VALUES_CHIPS.map(c=>{
    const on=selectedBio.has(c);
    return `<button class="bio-chip${on?' selected':''}" onclick="toggleBioChip('values','${c}')">${c}${on?` <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#fff"/></svg>`:''}
    </button>`;
  }).join('');
  tEl.innerHTML=THINKING_CHIPS.map(c=>{
    const on=selectedThinking.has(c);
    return `<button class="bio-chip${on?' selected':''}" onclick="toggleBioChip('thinking','${c}')">${c}${on?` <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#fff"/></svg>`:''}
    </button>`;
  }).join('');
}

function toggleBioChip(group,chip){
  const set=group==='values'?selectedBio:selectedThinking;
  if(set.has(chip)) set.delete(chip); else set.add(chip);
  renderBioChips();
}

const boostState={
  space:{},sensory:{},culture:{}
};
boostState.space['Fidget toys']=1;
boostState.space['Przezroczyste ściany']=2;
boostState.space['Roślinność wewnątrz']=1;
boostState.sensory['Dwa monitory na stanowisku pracy']=1;
boostState.sensory['Migające światła/neony']=2;
boostState.sensory['Odzież służbowa']=2;
boostState.sensory['Otwierane okna']=1;
boostState.culture['Jasno określone kryteria i obowiązki']=1;
boostState.culture['Online z włączoną kamerką']=2;
boostState.culture['Szkolenia wyjazdowe']=2;
boostState.culture['Sztywna hierarchia']=1;

const BOOST_SVG=`<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>`;
const BLOCK_SVG=`<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg>`;

function renderBoostChips(){
  ['space','sensory','culture'].forEach(cat=>{
    const el=document.getElementById('boost-chips-'+cat);
    if(!el) return;
    el.innerHTML=BOOST_DATA[cat].map(label=>{
      const s=boostState[cat][label]||0;
      const cls=s===1?'boost-chip green':s===2?'boost-chip red':'boost-chip';
      const icon=s===1?BOOST_SVG:s===2?BLOCK_SVG:'';
      return `<button class="${cls}" onclick="cycleBoost('${cat}','${label.replace(/'/g,"\\'")}')">
        ${s!==0?`<span class="boost-chip-icon">${icon}</span>`:''}
        ${label}
      </button>`;
    }).join('');
  });
}

function cycleBoost(cat,label){
  const cur=boostState[cat][label]||0;
  boostState[cat][label]=(cur+1)%3;
  renderBoostChips();
}

const selectedWizytowka=new Set(['Przesłuchanie planu spotkania z wyprzedzeniem','Cicha przestrzeń']);

function renderWizytowka(){
  const el=document.getElementById('wizytowka-list');
  if(!el) return;
  el.innerHTML=WIZYTOWKA_ITEMS.map((item,i)=>{
    const on=selectedWizytowka.has(item);
    return `<li class="wizytowka-item" onclick="toggleWizytowka('${item.replace(/'/g,"\\'")}')">
      <span class="wizytowka-checkbox${on?' checked':''}" aria-checked="${on}" role="checkbox">
        ${on?`<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#fff"/></svg>`:''}
      </span>
      <span class="wizytowka-item-text">${item}</span>
    </li>`;
  }).join('');
}

function toggleWizytowka(item){
  if(selectedWizytowka.has(item)) selectedWizytowka.delete(item);
  else selectedWizytowka.add(item);
  renderWizytowka();
}

/* ─────────────────────────────────────────
   EMPLOYER PAGE
───────────────────────────────────────── */
function getEmployerData(jobId){
  if(EMPLOYER_DATA[jobId]) return EMPLOYER_DATA[jobId];
  const job=JOBS.find(j=>j.id===jobId);
  if(!job) return null;
  return{
    name:job.company,meta:'',about:job.about,
    mission:'',values:[],cultureDesc:'',cultureUnique:'',
    cultureSpace:[],cultureSensory:[],cultureComm:[],erg:[],links:[]
  };
}

function showEmployerPage(){
  const jobId=_currentJobId;
  const emp=getEmployerData(jobId);
  if(!emp) return;
  const job=JOBS.find(j=>j.id===jobId)||JOBS[0];

  document.getElementById('employer-title').textContent=emp.name;
  document.getElementById('employer-about-logo').innerHTML=`<div style="width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;${logoStyle(job)}">${LOGOS[jobId]||''}</div>`;
  document.getElementById('employer-about-name').textContent=emp.name;
  document.getElementById('employer-about-meta').textContent=emp.meta;
  document.getElementById('employer-about-desc').textContent=emp.about;
  document.getElementById('employer-mission').textContent=emp.mission;

  const valEl=document.getElementById('employer-values-chips');
  valEl.innerHTML=emp.values.map(v=>`<span class="chip">${v}</span>`).join('');
  document.getElementById('employer-values-sec').style.display=emp.values.length?'':'none';

  document.getElementById('employer-culture-desc').textContent=emp.cultureDesc;
  document.getElementById('employer-culture-unique').textContent=emp.cultureUnique;
  document.getElementById('employer-culture-space').innerHTML=emp.cultureSpace.map(v=>`<span class="chip">${v}</span>`).join('');
  document.getElementById('employer-culture-sensory').innerHTML=emp.cultureSensory.map(v=>`<span class="chip">${v}</span>`).join('');
  document.getElementById('employer-culture-comm').innerHTML=emp.cultureComm.map(v=>`<span class="chip">${v}</span>`).join('');
  document.getElementById('employer-culture-sec').style.display=emp.cultureUnique?'':'none';

  const ergEl=document.getElementById('employer-erg-list');
  ergEl.innerHTML=emp.erg.map(e=>`<li>${e}</li>`).join('');
  document.getElementById('employer-erg-sec').style.display=emp.erg.length?'':'none';

  const LINK_ICONS={
    language:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="ico"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" fill="#1c1b2e"/></svg>`,
    linkedin:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="ico"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="#1c1b2e"/></svg>`,
    youtube:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="ico"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" fill="#1c1b2e"/></svg>`
  };
  const linksEl=document.getElementById('employer-links');
  linksEl.innerHTML=emp.links.map(l=>`
    <a href="${l.url}" class="employer-link-row">
      ${LINK_ICONS[l.icon]||''}
      <span>${l.label}</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="ico" style="margin-left:auto"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="#8e8ba3"/></svg>
    </a>`).join('');

  const compJobs=JOBS.filter(j=>j.company===job.company);
  document.getElementById('employer-jobs-list').innerHTML=compJobs.map(buildCard).join('');

  switchEmployerTab('about');
  showScreen('screen-employer');
}

function switchEmployerTab(tab){
  ['offers','about'].forEach(t=>{
    const btn=document.getElementById('etab-'+t);
    const panel=document.getElementById('epanel-'+t);
    if(btn) btn.setAttribute('aria-selected',String(t===tab));
    if(btn) btn.classList.toggle('active',t===tab);
    if(panel) panel.style.display=t===tab?'block':'none';
  });
}

function switchFavTab(tab){
  ['companies','offers'].forEach(t=>{
    const btn=document.getElementById('ftab-'+t);
    const panel=document.getElementById('fpanel-'+t);
    if(btn){btn.setAttribute('aria-selected',String(t===tab));btn.classList.toggle('active',t===tab);}
    if(panel) panel.style.display=t===tab?'block':'none';
  });
}

function switchAppTab(tab){
  ['active','archive'].forEach(t=>{
    const btn=document.getElementById('atab-'+t);
    const panel=document.getElementById('apanel-'+t);
    if(btn){btn.setAttribute('aria-selected',String(t===tab));btn.classList.toggle('active',t===tab);}
    if(panel) panel.style.display=t===tab?'block':'none';
  });
}

/* ─────────────────────────────────────────
   APPLICATIONS DATA & RENDERING
───────────────────────────────────────── */
const APPLICATIONS=[
  {
    jobId:'bloomroot',
    appliedDate:'18 kwietnia 2025',
    appliedShort:'18.04.2025',
    status:'interview',
    statusLabel:'Zaproszenie na spotkanie',
    statusTime:'za 3 dni',
    nextStep:{
      title:'Spotkanie online z Anną Kowal',
      meta:'Wtorek, 25 kwietnia · 14:00–15:00',
      sub:'Google Meet · link wysłany na e-mail',
      actions:[
        {label:'Otwórz link',primary:true},
        {label:'Dodaj do kalendarza',primary:false}
      ]
    },
    timeline:[
      {state:'done',title:'Aplikacja wysłana',sub:'',date:'18 kwietnia, 09:42'},
      {state:'done',title:'Kontakt od rekrutera',sub:'Rozmowa telefoniczna z Anną Kowal',date:'21 kwietnia, 13:15'},
      {state:'current',title:'Spotkanie',sub:'Online z Anną Kowal · 25 kwietnia, 14:00\nZaproszenie otrzymano 22 kwietnia',date:''},
      {state:'future',title:'Etap dodatkowy',sub:'Zadanie lub assessment — jeśli dotyczy',date:''},
      {state:'future',title:'Etap finalny',sub:'',date:''}
    ],
    docs:[
      {name:'CV_2025.pdf',type:'CV'},
      {name:'List_motywacyjny.pdf',type:'List motywacyjny'}
    ],
    archive:false
  },
  {
    jobId:'allegro',
    appliedDate:'12 marca 2025',
    appliedShort:'12.03.2025',
    status:'active',
    statusLabel:'Weryfikacja dokumentów',
    statusTime:'od 3 dni',
    nextStep:null,
    timeline:[
      {state:'done',title:'Aplikacja wysłana',sub:'',date:'12 marca, 11:20'},
      {state:'current',title:'Weryfikacja',sub:'Rekruter zapoznaje się z dokumentami',date:'15 marca'},
      {state:'future',title:'Zaproszenie na rozmowę',sub:'',date:''},
      {state:'future',title:'Rozmowa',sub:'',date:''},
      {state:'future',title:'Decyzja',sub:'',date:''}
    ],
    docs:[
      {name:'CV_2025.pdf',type:'CV'}
    ],
    archive:false
  },
  {
    jobId:'skycash',
    appliedDate:'5 marca 2025',
    appliedShort:'05.03.2025',
    status:'task',
    statusLabel:'Zadanie rekrutacyjne',
    statusTime:'termin: 28.03',
    nextStep:{
      title:'Zadanie analityczne do wykonania',
      meta:'Termin: 28 marca 2025',
      sub:'Plik wysłany na adres e-mail',
      actions:[
        {label:'Otwórz zadanie',primary:true}
      ]
    },
    timeline:[
      {state:'done',title:'Aplikacja wysłana',sub:'',date:'5 marca, 09:10'},
      {state:'done',title:'Kontakt od rekrutera',sub:'E-mail z potwierdzeniem',date:'8 marca'},
      {state:'current',title:'Zadanie rekrutacyjne',sub:'Analiza danych sprzedażowych',date:'wysłane 20 marca'},
      {state:'future',title:'Rozmowa z zespołem',sub:'',date:''},
      {state:'future',title:'Decyzja',sub:'',date:''}
    ],
    docs:[
      {name:'CV_2025.pdf',type:'CV'},
      {name:'Portfolio.pdf',type:'Portfolio'}
    ],
    archive:false
  },
  {
    jobId:'airbnb',
    appliedDate:'15 stycznia 2025',
    appliedShort:'15.01.2025',
    status:'offer',
    statusLabel:'Oferta współpracy!',
    statusTime:'ważna do 10.02',
    nextStep:{
      title:'Otrzymałeś ofertę pracy!',
      meta:'Wynagrodzenie: 13 000 – 20 000 PLN',
      sub:'Odpowiedz do 10 lutego 2025',
      actions:[
        {label:'Akceptuj ofertę',primary:true},
        {label:'Negocjuj',primary:false}
      ]
    },
    timeline:[
      {state:'done',title:'Aplikacja wysłana',sub:'',date:'15 stycznia'},
      {state:'done',title:'Rozmowa HR',sub:'Z Marią Nowak',date:'22 stycznia'},
      {state:'done',title:'Rozmowa techniczna',sub:'Z zespołem analitycznym',date:'29 stycznia'},
      {state:'current',title:'Oferta',sub:'Propozycja współpracy wysłana',date:'5 lutego'},
      {state:'future',title:'Decyzja',sub:'',date:''}
    ],
    docs:[
      {name:'CV_2025.pdf',type:'CV'},
      {name:'List_motywacyjny.pdf',type:'List motywacyjny'}
    ],
    archive:false
  },
  {
    jobId:'ikea-wawa',
    appliedDate:'10 listopada 2024',
    appliedShort:'10.11.2024',
    status:'ended',
    statusLabel:'Proces zakończony',
    statusTime:'',
    nextStep:null,
    timeline:[
      {state:'done',title:'Aplikacja wysłana',sub:'',date:'10 listopada 2024'},
      {state:'done',title:'Weryfikacja',sub:'',date:'14 listopada 2024'},
      {state:'done',title:'Rozmowa HR',sub:'Rozmowa telefoniczna',date:'20 listopada 2024'},
      {state:'done',title:'Proces zakończony',sub:'Firma wybrała innego kandydata',date:'5 grudnia 2024'}
    ],
    docs:[
      {name:'CV_2024.pdf',type:'CV'}
    ],
    archive:true
  },
  {
    jobId:'mixa-wawa',
    appliedDate:'2 października 2024',
    appliedShort:'02.10.2024',
    status:'withdrawn',
    statusLabel:'Aplikacja wycofana',
    statusTime:'',
    nextStep:null,
    timeline:[
      {state:'done',title:'Aplikacja wysłana',sub:'',date:'2 października 2024'},
      {state:'done',title:'Aplikacja wycofana',sub:'Zrezygnowałeś z procesu',date:'10 października 2024'}
    ],
    docs:[
      {name:'CV_2024.pdf',type:'CV'}
    ],
    archive:true
  },
  {
    jobId:'paypal',
    appliedDate:'20 września 2024',
    appliedShort:'20.09.2024',
    status:'active',
    statusLabel:'Wysłano',
    statusTime:'oczekiwanie',
    nextStep:null,
    timeline:[
      {state:'done',title:'Aplikacja wysłana',sub:'',date:'20 września 2024'},
      {state:'future',title:'Weryfikacja',sub:'',date:''},
      {state:'future',title:'Rozmowa',sub:'',date:''},
      {state:'future',title:'Decyzja',sub:'',date:''}
    ],
    docs:[
      {name:'CV_2024.pdf',type:'CV'},
      {name:'List_motywacyjny.pdf',type:'List motywacyjny'}
    ],
    archive:false
  },
  {
    jobId:'znany',
    appliedDate:'1 lutego 2025',
    appliedShort:'01.02.2025',
    status:'active',
    statusLabel:'Rozmowa z rekruterem',
    statusTime:'jutro, 10:00',
    nextStep:{
      title:'Rozmowa telefoniczna z rekruterem',
      meta:'Jutro, 10:00–10:30',
      sub:'Połączenie przychodzące na Twój numer',
      actions:[
        {label:'Dodaj do kalendarza',primary:false}
      ]
    },
    timeline:[
      {state:'done',title:'Aplikacja wysłana',sub:'',date:'1 lutego, 14:30'},
      {state:'done',title:'Zaproszenie na rozmowę',sub:'E-mail od rekrutera',date:'5 lutego'},
      {state:'current',title:'Rozmowa telefoniczna',sub:'Z Katarzyną Wiśniewską',date:'jutro, 10:00'},
      {state:'future',title:'Rozmowa z zespołem',sub:'',date:''},
      {state:'future',title:'Decyzja',sub:'',date:''}
    ],
    docs:[
      {name:'CV_2025.pdf',type:'CV'}
    ],
    archive:false
  }
];

function statusClass(status){
  const map={active:'s-active',interview:'s-interview',task:'s-task',offer:'s-offer',ended:'s-ended',withdrawn:'s-withdrawn'};
  return map[status]||'s-active';
}

function buildAppCard(app){
  const job=JOBS.find(j=>j.id===app.jobId)||{company:app.jobId,role:'',location:'',salary:'',contracts:'',workMode:''};
  const sc=statusClass(app.status);
  const logo=LOGOS[job.id]?`<div class="applist-logo" style="${logoStyle(job)}">${LOGOS[job.id]}</div>`:`<div class="applist-logo" style="background:var(--border)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 7V3H2v18h20V7H12zm-2 12H4v-2h6v2zm0-4H4v-2h6v2zm0-4H4V9h6v2zm0-4H4V5h6v2zm10 12h-8V9h8v10zm-2-8h-4v2h4v-2zm0 4h-4v2h4v-2z" fill="#8e8ba3"/></svg></div>`;
  const timeStr=app.statusTime?`<span class="applist-date">${app.statusTime}</span>`:'';
  return `<div class="applist-card" onclick="openAppDetail('${app.jobId}')" role="button" tabindex="0" onkeydown="if(event.key==='Enter')openAppDetail('${app.jobId}')">
  <div class="applist-card-top">
    ${logo}
    <div class="applist-company-block">
      <div class="applist-company">${job.company}</div>
      <div class="applist-role">${job.role}</div>
    </div>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="applist-chevron"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="#8e8ba3"/></svg>
  </div>
  <div class="applist-meta">
    <span class="applist-meta-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#8e8ba3"/></svg>${job.location}</span>
    <span class="applist-meta-item">${job.salary}</span>
    <span class="applist-meta-item">${job.contracts}</span>
  </div>
  <div class="applist-status-row">
    <span class="applist-status-badge ${sc}">
      <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>
      ${app.statusLabel}
    </span>
    ${timeStr}
  </div>
</div>`;
}

function renderApplicationsList(){
  const active=APPLICATIONS.filter(a=>!a.archive);
  const archive=APPLICATIONS.filter(a=>a.archive);
  const ap=document.getElementById('apanel-active');
  const ar=document.getElementById('apanel-archive');
  if(ap) ap.innerHTML=active.length?active.map(buildAppCard).join(''):`<p style="color:var(--ink-3);text-align:center;margin-top:48px;font-size:14px">Nie masz jeszcze żadnych aktywnych aplikacji.</p>`;
  if(ar) ar.innerHTML=archive.length?archive.map(buildAppCard).join(''):`<p style="color:var(--ink-3);text-align:center;margin-top:48px;font-size:14px">Archiwum jest puste.</p>`;
}

function openAppDetail(jobId){
  const app=APPLICATIONS.find(a=>a.jobId===jobId);
  if(!app) return;
  const job=JOBS.find(j=>j.id===jobId)||{company:jobId,role:'',location:'',salary:'',workMode:'',contracts:''};
  const sc=statusClass(app.status);

  document.getElementById('appd-title').textContent=job.company;
  const logoEl=document.getElementById('appd-logo');
  if(LOGOS[job.id]) logoEl.innerHTML=LOGOS[job.id];
  else logoEl.innerHTML=`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 7V3H2v18h20V7H12z" fill="#8e8ba3"/></svg>`;
  logoEl.style.cssText=logoStyle(job);
  document.getElementById('appd-company').textContent=job.company;
  document.getElementById('appd-role').textContent=job.role+(job.location?` · ${job.location}`:'');
  document.getElementById('appd-applied').textContent=`Aplikowano ${app.appliedDate}`;

  const banner=document.getElementById('appd-status-banner');
  banner.className='appd-status-banner '+sc;
  document.getElementById('appd-status-label').textContent=app.statusLabel;
  document.getElementById('appd-status-time').textContent=app.statusTime||'';

  const nextCard=document.getElementById('appd-next-card');
  if(app.nextStep){
    nextCard.style.display='block';
    document.getElementById('appd-next-title').textContent=app.nextStep.title;
    document.getElementById('appd-next-meta').textContent=app.nextStep.meta;
    document.getElementById('appd-next-sub').textContent=app.nextStep.sub;
    document.getElementById('appd-next-actions').innerHTML=app.nextStep.actions.map(a=>
      `<button class="${a.primary?'appd-btn-primary':'appd-btn-secondary'}">${a.label}</button>`
    ).join('');
  } else {
    nextCard.style.display='none';
  }

  document.getElementById('appd-timeline').innerHTML=app.timeline.map((step,i)=>`
  <li class="appd-tl-item">
    <div class="appd-tl-left">
      <div class="appd-tl-dot ${step.state}"></div>
      ${i<app.timeline.length-1?'<div class="appd-tl-line"></div>':''}
    </div>
    <div class="appd-tl-content">
      <div class="appd-tl-title ${step.state==='future'?'future':''}">${step.title}</div>
      ${step.sub?`<div class="appd-tl-sub">${step.sub.replace(/\n/g,'<br>')}</div>`:''}
      ${step.date?`<div class="appd-tl-date">${step.date}</div>`:''}
    </div>
  </li>`).join('');

  const docsList=document.getElementById('appd-docs-list');
  docsList.innerHTML=app.docs.map(d=>`
  <div class="appd-doc-row">
    <div class="appd-doc-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 16h8v2H8v-2zm0-4h8v2H8v-2z" fill="#8e8ba3"/></svg></div>
    <div><div class="appd-doc-name">${d.name}</div><div class="appd-doc-type">${d.type}</div></div>
  </div>`).join('');

  const details=[
    {key:'Wynagrodzenie',val:job.salary},
    {key:'Tryb pracy',val:job.workMode},
    {key:'Umowa',val:job.contracts},
    {key:'Lokalizacja',val:job.location}
  ].filter(r=>r.val);
  document.getElementById('appd-details-grid').innerHTML=details.map(r=>
    `<div class="appd-detail-row"><span class="appd-detail-key">${r.key}</span><span class="appd-detail-val">${r.val}</span></div>`
  ).join('');

  document.getElementById('appd-offer-link').onclick=()=>showJobDetail(jobId);

  showScreen('screen-app-detail');
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
function _init(){
  document.getElementById('home-list').innerHTML=JOBS.map(buildCard).join('');
  document.getElementById('skeleton-list').innerHTML=buildSkeletons(8);
  document.querySelectorAll('.screen:not(.active)').forEach(s=>s.setAttribute('aria-hidden','true'));
  const menuOverlay=document.getElementById('menu-overlay');
  menuOverlay.setAttribute('aria-hidden','true');
  renderDocsList();
  renderBioChips();
  renderBoostChips();
  renderWizytowka();
  renderApplicationsList();
  updateAllAvatars();
}
document.addEventListener('DOMContentLoaded',()=>{
  const d=JSON.parse(document.getElementById('app-data').textContent);
  JOBS=d.jobs;
  VALUES_CHIPS=d.profile.valuesChips;
  THINKING_CHIPS=d.profile.thinkingChips;
  BOOST_DATA=d.profile.boostData;
  WIZYTOWKA_ITEMS=d.profile.wizytowkaItems;
  EMPLOYER_DATA=d.employers;
  _init();
});
