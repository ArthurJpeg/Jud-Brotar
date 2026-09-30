// ---------- Mobile nav ----------
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navActions = document.getElementById('navActions');
  const siteHeader = document.querySelector('header');

  function positionMobileMenu(){
    const headerHeight = siteHeader.offsetHeight;
    navLinks.style.top = headerHeight + 'px';
    const linksHeight = navLinks.classList.contains('open') ? navLinks.scrollHeight : 0;
    navActions.style.top = (headerHeight + linksHeight) + 'px';
  }

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navActions.classList.toggle('open');
    positionMobileMenu();
  });
  window.addEventListener('resize', positionMobileMenu);
  positionMobileMenu();

  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click', ()=>{ navLinks.classList.remove('open'); navActions.classList.remove('open'); });
  });

  // ---------- Modal helpers ----------
  function openModal(name){
    document.getElementById(name+'Backdrop').classList.add('open');
  }
  function closeModal(name){
    document.getElementById(name+'Backdrop').classList.remove('open');
  }
  function openExperimentalFor(modalidade){
    const sel = document.getElementById('expModalidade');
    sel.value = modalidade;
    updateTurmaOptions();
    openModal('experimental');
  }
  document.querySelectorAll('.modal-backdrop').forEach(bd=>{
    bd.addEventListener('click', (e)=>{ if(e.target===bd) bd.classList.remove('open'); });
  });

  // ---------- Turma options per modalidade (baseado na grade real de horários) ----------
  const TURMAS = {
    'Judô': [
      'Segunda e Quarta · 18h00–19h00 (3 a 6 anos)',
      'Segunda e Quarta · 19h00–20h00 (7 a 12 anos)',
      'Segunda e Quarta · 20h00–21h15 (Adultos)',
      'Terça e Quinta · 10h00–11h00 (3 a 10 anos)',
      'Terça e Quinta · 16h00–17h00 (7 a 10 anos)',
      'Terça e Quinta · 17h00–18h00 (3 a 6 anos)',
      'Terça e Quinta · 18h00–19h00 (6 a 12 anos) · Sensei Polyara',
      'Terça e Quinta · 19h00–20h00 (6 a 12 anos)',
      'Terça e Quinta · 20h00–21h15 (Adultos)'
    ],
    'Jiu-Jitsu': [
      'Segunda e Quarta · 17h00–18h00 (a partir de 6 anos)'
    ]
  };

  function updateTurmaOptions(){
    const modalidade = document.getElementById('expModalidade').value;
    const turmaSelect = document.getElementById('expTurma');
    turmaSelect.innerHTML = '';
    if(!modalidade){
      turmaSelect.innerHTML = '<option value="">Selecione a modalidade primeiro</option>';
      return;
    }
    const opts = TURMAS[modalidade] || [];
    turmaSelect.innerHTML = '<option value="">Selecione a turma</option>' +
      opts.map(t => `<option value="${t}">${t}</option>`).join('');
  }

  // ---------- Envio via WhatsApp ----------
  function doExperimental(e){
    e.preventDefault();
    const nome = document.getElementById('expNome').value.trim();
    const idade = document.getElementById('expIdade').value.trim();
    const modalidade = document.getElementById('expModalidade').value;
    const turma = document.getElementById('expTurma').value;

    const texto =
      `Olá! Gostaria de agendar uma aula experimental no CT Judô Brotar.%0A%0A` +
      `*Nome:* ${nome}%0A` +
      `*Idade:* ${idade}%0A` +
      `*Modalidade:* ${modalidade}%0A` +
      `*Turma de interesse:* ${turma}`;

    const url = `https://wa.me/5586994956710?text=${texto}`;
    window.open(url, '_blank', 'noopener');
    closeModal('experimental');
    e.target.reset();
    updateTurmaOptions();
  }
