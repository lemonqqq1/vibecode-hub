
document.querySelectorAll('pre').forEach(function(p){
  var b=document.createElement('button');b.textContent='Копировать';
  b.onclick=function(){var t=p.querySelector('code').innerText;
    (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){var e=document.getElementById('toast');e.classList.add('on');setTimeout(function(){e.classList.remove('on')},1200)}).catch(function(){});};
  p.appendChild(b);
});
var chips=document.querySelectorAll('.chips button');
chips.forEach(function(c){c.onclick=function(){
  chips.forEach(function(x){x.setAttribute('aria-pressed',x===c)});
  var f=c.dataset.f;
  document.querySelectorAll('#tbl tbody tr').forEach(function(r){r.hidden=!(f==='all'||r.dataset.t===f)});
}});
document.getElementById('theme').onclick=function(){
  var r=document.documentElement,d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);
  r.dataset.theme=d?'light':'dark';
};

var KB=[
{t:"git не найден",k:["git не",'"git"',"'git'","git is not","git :","git:"],a:"<p>Git не установлен или его нет в PATH.</p><p>1. Скачай Git for Windows с git-scm.com/download/win и установи с настройками по умолчанию.<br>2. Полностью закрой и снова открой PowerShell.<br>3. Проверь:</p><pre>git --version</pre><p>Для самого Claude Code Git необязателен, он нужен для клонирования репозиториев вроде OmniRoute.</p>"},
{t:"claude не находится",k:["claude не","claude is not","\"claude\"","'claude'","claude :","команда claude","path","не находится"],a:"<p>Обычно это PATH: он обновляется только в новых окнах.</p><p>1. Закрой PowerShell полностью и открой заново.<br>2. Проверь:</p><pre>claude --version</pre><p>3. Если не помогло, переустанови:</p><pre>irm https://claude.ai/install.ps1 | iex</pre><p>4. Затем выполни <code>claude doctor</code>: он покажет, что не так.</p>"},
{t:"скрипты отключены (.ps1)",k:["running scripts is disabled","выполнение сценариев","executionpolicy","npm.ps1","cannot be loaded"],a:"<p>PowerShell запрещает запуск скриптов. Разреши их для своего пользователя:</p><pre>Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</pre><p>Подтверди вопрос и повтори установку в новом окне.</p>"},
{t:"EACCES / права npm",k:["eacces","permission denied","eperm","sudo"],a:"<p>Не используй <code>sudo npm install -g</code>. Проще всего перейти на нативный установщик:</p><pre>irm https://claude.ai/install.ps1 | iex</pre><p>Если Claude Code уже стоит через npm, выполни <code>claude install</code>.</p>"},
{t:"npm warn install-scripts",k:["install-scripts","postinstall","npm warn"],a:"<p>Предупреждение связано со старой установкой через npm. Надёжнее переехать на нативную версию:</p><pre>irm https://claude.ai/install.ps1 | iex</pre><p>или <code>claude install</code>. Потом проверь <code>claude doctor</code>.</p>"},
{t:"не могу войти",k:["login","войти","вход","авториз","401","403","oauth","auth"],a:"<p>1. Внутри Claude Code выполни <code>/logout</code>, затем <code>/login</code>.<br>2. Проверь, что у аккаунта есть доступ: бесплатный план Claude.ai Claude Code не включает, нужна подписка Pro/Max, Team или API-ключ с балансом.<br>3. Если входишь ключом, убедись, что на балансе в console.anthropic.com есть средства.</p>"},
{t:"упёрся в лимит",k:["limit","лимит","usage","429","overloaded","rate"],a:"<p>Лимиты работают двумя окнами: 5 часов и неделя.</p><p>1. Посмотри остаток:</p><pre>/usage</pre><p>2. Переключись на более лёгкую модель: <code>/model</code> и выбери sonnet или haiku.<br>3. Включи usage credits на claude.ai/settings/usage или перейди на API-ключ.<br>4. Делай <code>/clear</code> между задачами. Подробнее в разделе «Лимиты».</p>"},
{t:"сеть, прокси, SSL",k:["ssl","certificate","proxy","прокси","timeout","econnreset","etimedout","enotfound","network","сеть","не скачивается"],a:"<p>Установщик не может скачать файлы.</p><p>1. Проверь, открывается ли claude.ai в браузере.<br>2. Отключи VPN или, наоборот, попробуй другую сеть.<br>3. За корпоративным прокси задай адрес:</p><pre>$env:HTTPS_PROXY=\"http://host:port\"</pre><p>и запусти установку заново.</p>"},
{t:"нет нужной модели",k:["opus","модель","model","not available","недоступн"],a:"<p>Выбери доступную модель:</p><pre>claude --model sonnet</pre><p>или внутри сессии <code>/model</code>. Псевдонимы: opus, sonnet, haiku. Если нужной модели нет в списке, она недоступна на твоём тарифе.</p>"},
{t:"обновить Claude Code",k:["update","обнов","версия","version"],a:"<p>Нативная версия обновляется сама в фоне и применяет обновление при следующем запуске. Принудительно:</p><pre>claude update</pre><p>Проверка версии: <code>claude --version</code>.</p>"},
{t:"OmniRoute не запускается",k:["omniroute","порт","port","3000","два окна"],a:"<p>Нужны два окна терминала.<br>1. В первом: <code>npm run dev</code> и оставь работать.<br>2. Во втором: <code>omniroute setup-claude</code>, затем <code>omniroute launch</code>.</p><p>Если порт занят, закрой программу, которая его использует, или смени порт. OmniRoute это замена, а не настоящий Claude.</p>"},
{t:"общая диагностика",k:["doctor","не работает","ошибка","error","помоги"],a:"<p>Начни с диагностики:</p><pre>claude doctor</pre><p>Она проверит установку и покажет проблемы. Если не поможет, опиши ошибку подробнее или вставь её текст сюда.</p>"}
];
var log=document.getElementById('hlog'),chips=document.getElementById('hchips'),help=document.getElementById('help'),fab=document.getElementById('fab');
function add(cls,html,txt){var d=document.createElement('div');d.className='msg '+cls;if(txt!==undefined)d.textContent=txt;else d.innerHTML=html;log.appendChild(d);log.scrollTop=log.scrollHeight;}
function reply(e){add('b','<b>'+e.t+'</b>'+e.a);}
function ask(q){
  add('u',null,q);q=q.toLowerCase();var best=null,sc=0;
  KB.forEach(function(e){var c=0;e.k.forEach(function(w){if(q.indexOf(w)>-1)c++});if(c>sc){sc=c;best=e}});
  if(best)reply(best);else add('b','<p>Точного совпадения не нашёл. Выбери тему ниже или выполни <code>claude doctor</code> и вставь сюда текст ошибки.</p>');
}
KB.forEach(function(e){var b=document.createElement('button');b.textContent=e.t;b.onclick=function(){add('u',null,e.t);reply(e)};chips.appendChild(b)});
add('b','<p>Привет! Выбери проблему ниже или вставь текст ошибки, я подскажу, что делать. Нажми на команду, чтобы скопировать.</p>');
function openHelp(){help.hidden=false;fab.hidden=true;document.getElementById('hin').focus();}
function closeHelp(){help.hidden=true;fab.hidden=false;}
fab.onclick=openHelp;document.getElementById('hclose').onclick=closeHelp;document.getElementById('helpbtn').onclick=openHelp;
document.querySelectorAll('[data-help]').forEach(function(b){b.onclick=openHelp});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!help.hidden)closeHelp()});
document.getElementById('hform').onsubmit=function(ev){ev.preventDefault();var i=document.getElementById('hin');if(i.value.trim()){ask(i.value.trim());i.value='';}};
log.addEventListener('click',function(ev){var pre=ev.target.closest('pre');if(pre&&navigator.clipboard){navigator.clipboard.writeText(pre.textContent).then(function(){var t=document.getElementById('toast');t.classList.add('on');setTimeout(function(){t.classList.remove('on')},1200)}).catch(function(){})}});

(function(){
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var sp=document.getElementById('sp');
function onScroll(){var h=document.documentElement;sp.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+'%'}
addEventListener('scroll',onScroll,{passive:true});onScroll();
var links={};document.querySelectorAll('nav a[href^="#"]').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){Object.keys(links).forEach(function(k){links[k].classList.toggle('on',k===e.target.id)})}})},{rootMargin:'-40% 0px -55% 0px'});
Object.keys(links).forEach(function(k){var el=document.getElementById(k);if(el)io.observe(el)});
document.querySelectorAll('.tabs').forEach(function(tb){tb.addEventListener('click',function(ev){var b=ev.target.closest('button');if(!b)return;
tb.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-selected',x===b)});
tb.parentNode.querySelectorAll('.tp').forEach(function(p){p.hidden=p.dataset.p!==b.dataset.t})})});
var hr=document.getElementById('hr'),tp=document.getElementById('tp'),rec=document.getElementById('rec'),lad=document.querySelectorAll('.ladder div');
function calc(){var h=+hr.value,sc=h*+tp.value,i,t;document.getElementById('hv').textContent=h;
if(sc<=2){i=0;t='Начни с Pro. Для коротких задач его обычно хватает.'}else if(sc<=7){i=1;t='Подойдёт Max 5x: ежедневная работа над проектом.'}else{i=2;t='Смотри на Max 20x и включи usage credits как страховку.'}
rec.innerHTML='<b>'+lad[i].querySelector('b').textContent+'.</b> '+t+' Это ориентир: Anthropic не публикует точные лимиты, проверь расход через <code>/usage</code>.';
lad.forEach(function(d,j){d.classList.toggle('rec',j===i)})}
hr.oninput=tp.onchange=calc;calc();
var icons={'CLAUDE.md':'📝','Skills':'🧠','Hooks':'🪝','MCP-серверы':'🔌','Plugins':'🧩','Общие настройки команды':'👥'};
document.querySelectorAll('#customize .box h3').forEach(function(h){if(icons[h.textContent])h.textContent=icons[h.textContent]+' '+h.textContent});
var tw=document.querySelector('.tw'),term=document.querySelector('.term'),code=term.querySelector('code');
if(!rm&&matchMedia('(hover:hover)').matches){tw.addEventListener('mousemove',function(e){var r=tw.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;term.style.transform='perspective(800px) rotateY('+x*7+'deg) rotateX('+(-y*7)+'deg)'});tw.addEventListener('mouseleave',function(){term.style.transform=''})}
if(!rm){var full=code.textContent,i=0;code.textContent='';setTimeout(function(){var t=setInterval(function(){code.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(t)},35)},500)}
})();

/* === Visual enhancements: scroll reveal === */
(function(){
  var rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(rm) return;
  var targets = document.querySelectorAll('section, .paths .path, .ladder div, .grid > .box, .step, .hero > div');
  targets.forEach(function(el,i){
    el.classList.add('reveal');
    if(i % 4 === 1) el.classList.add('reveal-d1');
    else if(i % 4 === 2) el.classList.add('reveal-d2');
    else if(i % 4 === 3) el.classList.add('reveal-d3');
  });
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  },{threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  targets.forEach(function(el){ obs.observe(el); });

  // Nav shadow on scroll
  var nav = document.querySelector('nav');
  function checkNav(){ nav.classList.toggle('scrolled', window.scrollY > 20); }
  addEventListener('scroll', checkNav, {passive:true});
  checkNav();
})();
