document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Scroll progress + navbar state ---------- */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('scrollProgress');

  function onScroll(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
    navbar.classList.toggle('scrolled', scrollTop > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = ['home','about','skills','projects','experience','certificates','journey','contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  const navAnchors = Array.from(document.querySelectorAll('.nav-link'));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.id;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Back to top ---------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Hero phone mockup cycling ---------- */
  const screens = Array.from(document.querySelectorAll('#phoneScreen .app-screen'));
  const captionEl = document.getElementById('phoneCaption');
  let screenIndex = 0;

  function showScreen(i){
    screens.forEach((s, idx) => s.classList.toggle('active', idx === i));
    captionEl.textContent = screens[i].dataset.app;
  }
  if(screens.length){
    showScreen(0);
    setInterval(() => {
      screenIndex = (screenIndex + 1) % screens.length;
      showScreen(screenIndex);
    }, 3200);
  }

  /* ---------- Data-driven sections ---------- */
  const skills = [
    'Flutter','Dart','OOP','Mobile App Development','UI Development',
    'Responsive UI','Git & GitHub','Problem Solving','Teamwork'
  ];
  const skillsGrid = document.getElementById('skillsGrid');
  skillsGrid.innerHTML = skills.map(name => `
    <div class="skill-card">
      <div class="skill-badge">${initials(name)}</div>
      <span class="skill-name">${name}</span>
    </div>
  `).join('');

  const improvingSkills = ['REST API Integration','State Management','Debugging','Testing','Material Design'];
  const improvingHTML = improvingSkills.map(name => `<span class="improving-chip">${name}</span>`).join('');
  document.getElementById('improvingGrid').innerHTML = improvingHTML;

  function initials(str){
    const words = str.split(' ');
    if(words.length === 1) return words[0].slice(0,2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  /* ---------- Career journey timeline ---------- */
  const journeySteps = [
    { title: 'Career Planning', desc: 'Setting direction toward a Junior Flutter Developer role.' },
    { title: 'Skill Gap Analysis', desc: 'Identifying exactly what stands between me and that role.' },
    { title: 'SMART Development Plan', desc: 'Turning the gaps into a structured, weekly study plan.' },
    { title: 'Emotional Intelligence', desc: 'Building self-awareness and resilience for the job search.' },
    { title: 'Personal Branding', desc: 'Shaping a clear, honest professional identity.' },
    { title: 'Presentation Skills', desc: 'Communicating my work and thinking with confidence.' },
    { title: 'CV & Job Readiness', desc: 'Preparing an application that reflects real, current skills.' },
  ];
  document.getElementById('careerTimeline').innerHTML = journeySteps.map((step, i) => `
    <div class="timeline-item reveal in-view">
      <div class="timeline-node">${i + 1}</div>
      <div class="timeline-content">
        <h4>${step.title}</h4>
        <p>${step.desc}</p>
      </div>
    </div>
  `).join('');

  /* ---------- SMART plan weeks ---------- */
  const weeks = [
    { label: 'Week 1', title: 'Foundations', items: ['Classes','Objects','Encapsulation','3 exercises'] },
    { label: 'Week 2', title: 'Core OOP', items: ['Inheritance','Polymorphism','Dart mini project'] },
    { label: 'Week 3', title: 'Applied OOP', items: ['Abstraction','Interfaces','Apply OOP in Flutter'] },
    { label: 'Week 4', title: 'Consolidate', items: ['Review','Flutter mini app','GitHub upload'] },
  ];
  document.getElementById('weeksGrid').innerHTML = weeks.map(w => `
    <div class="week-card">
      <span class="week-num">${w.label}</span>
      <h4>${w.title}</h4>
      <ul>${w.items.map(item => `<li>${item}</li>`).join('')}</ul>
    </div>
  `).join('');

  /* ---------- Certificates ----------
     To add a certificate: put the image in the /images folder
     and add one object to this list. */
  const certificates = [
    { title: 'Flutter Diploma', issuer: 'Eraasoft Academy', year: '2026', image: 'images/cert-erasoft.png', link: 'images/cert-erasoft.png' },
    { title: 'AI Advanced', issuer: 'Empower Yourself by MCIT · Delivered by Fast Lane', year: '2026', image: 'images/cert-mcit-ai.png', link: 'images/cert-mcit-ai.png' },
  ];
  document.getElementById('certsGrid').innerHTML = certificates.map(c => `
    <article class="cert-card reveal">
      <div class="cert-thumb">
        <img src="${c.image}" alt="${c.title}" loading="lazy" onerror="this.style.display='none';this.parentNode.classList.add('cert-missing')">
        <span class="cert-missing-label">Certificate image</span>
      </div>
      <div class="cert-body">
        <h3>${c.title}</h3>
        <p class="cert-issuer">${c.issuer} · ${c.year}</p>
        <a href="${c.link}" target="_blank" rel="noopener" class="cert-link">View Certificate →</a>
      </div>
    </article>
  `).join('');

  /* ---------- Values ---------- */
  const values = ['Continuous Learning','Problem Solving','Teamwork','Resilience','Professional Communication'];
  document.getElementById('valuesRow').innerHTML = values.map(v => `<span class="value-chip">${v}</span>`).join('');

});


(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;

  const btn = document.getElementById('themeToggle');
  const sync = () => { btn.textContent = root.dataset.theme === 'dark' ? '☀️' : '🌙'; };
  sync();

  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
    sync();
  });
})();
