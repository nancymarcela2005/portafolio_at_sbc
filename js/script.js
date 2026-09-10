/* ==========================================================================
   PORTAFOLIO BÍBLICO DIGITAL INTERACTIVO: DEL DESIERTO A LA TIERRA PROMETIDA
   Deuteronomio 1-4 | Seminario Bíblico - Cúcuta
   Lógica JavaScript Vanilla - Corrección de Transición Modo Oscuro / Lectura
   ========================================================================== */

// Global App State
let currentPage = 1;
const totalPages = 14;
let soundEnabled = true;
let currentVerseIndex = 0;
let isFlipping = false;

// 1. Timeline Events Dictionary (12 Events)
const timelineData = {
  1: {
    title: "Evento 1: Horeb (El Monte de Dios)",
    biblicalRef: "Deuteronomio 1:6-8",
    content: "Israel permaneció casi un año en el monte Horeb (Sinaí), donde recibió la Ley y construyó el Tabernáculo. Dios les habla diciendo: 'Harto habéis estado en este monte; volveos y salid al monte del amorreo...'",
    exegesis: "Representa el punto de partida espiritual donde el mandato divino exige dejar el estancamiento y avanzar activamente hacia las promesas."
  },
  2: {
    title: "Evento 2: Recorrido Horeb → Cades-barnea",
    biblicalRef: "Deuteronomio 1:19",
    content: "El pueblo atravesó 'aquel grande y espantoso desierto' en un viaje de solo 11 días de jornada desde Horeb por el camino del monte de Seir hasta llegar a las puertas de Canaán en Cades-barnea.",
    exegesis: "Demuestra la fidelidad y protección de Dios durante el tránsito por terrenos hostiles y peligrosos."
  },
  3: {
    title: "Evento 3: Los Espías y la Incredulidad",
    biblicalRef: "Deuteronomio 1:20-33",
    content: "A petición del pueblo, Moisés envía 12 espías. Aunque reconocieron que la tierra era buena, 10 espías desanimaron al pueblo con informes de gigantes y ciudades amuralladas hasta los cielos. El pueblo murmuró y rehusó subir.",
    exegesis: "La incredulidad borra el recuerdo de los milagros pasados y magnifica los obstáculos por encima del soberano poder de Dios."
  },
  4: {
    title: "Evento 4: Consecuencia del Juicio Divino",
    biblicalRef: "Deuteronomio 1:34-40",
    content: "La ira del Señor se encendió ante la rebelión. Juró que ninguno de aquellos hombres de la mala generación vería la buena tierra, salvo Caleb y Josué. A Israel se le ordenó volver al desierto camino del Mar Rojo.",
    exegesis: "La incredulidad persistente anula la bendición para una generación entera y retrasa el cumplimiento del propósito divino."
  },
  5: {
    title: "Evento 5: Años de Peregrinación en el Desierto",
    biblicalRef: "Deuteronomio 2:1-15",
    content: "Durante 38 años adicionales, Israel dio vueltas por el desierto rodeando el monte Seir hasta que se consumió toda la generación de los hombres de guerra que habían sido incrédulos.",
    exegesis: "El desierto actúa como un horno purificador donde Dios juzga la rebelión pero mantiene intacta su provisión de pan y vestido."
  },
  6: {
    title: "Evento 6: Instrucciones respecto a Edom, Moab y Amón",
    biblicalRef: "Deuteronomio 2:4-19",
    content: "Dios prohíbe explícitamente a Israel entablar guerra o tomar tierras pertenecientes a Edom (descendientes de Esaú), Moab y Amón (descendientes de Lot), pues Él les había dado sus posesiones.",
    exegesis: "Dios es el Señor de todas las naciones y fronteras; exige justicia, diplomacia y respeto a las herencias ajenas."
  },
  7: {
    title: "Evento 7: Victoria sobre Sehón, Rey de Hesbón",
    biblicalRef: "Deuteronomio 2:24-37",
    content: "Al llegar al arroyo de Arnón, Moisés envió embajadores de paz a Sehón, pero éste se endureció y salió a la batalla en Jahaz. Dios entregó a Sehón y a sus ciudades en manos de Israel.",
    exegesis: "Representa el reinicio de las victorias divinas que infundieron pavor y temor de Israel sobre los pueblos debajo del cielo."
  },
  8: {
    title: "Evento 8: Victoria sobre Og, Rey de Basán",
    biblicalRef: "Deuteronomio 3:1-11",
    content: "Og, rey de Basán y último gigante de los Refaítas (cuya cama de hierro medía 9 codos), atacó a Israel en Edrei. Dios le dijo a Moisés: 'No le temas'. Israel destruyó sus 60 ciudades amuralladas.",
    exegesis: "Muestra que ni los gigantes ni las fortalezas humanas más imponentes pueden resistir al Dios todopoderoso."
  },
  9: {
    title: "Evento 9: Distribución Territorial de la Transjordania",
    biblicalRef: "Deuteronomio 3:12-20",
    content: "Las fértiles regiones conquistadas al oriente del Jordán fueron asignadas a Rubén, Gad y la media tribu de Manasés, bajo la condición de cruzar armados ante sus hermanos para ayudarlos a conquistar Canaán.",
    exegesis: "Pone de relieve la solidaridad, unidad y responsabilidad comunitaria de la congregación."
  },
  10: {
    title: "Evento 10: Moisés y la Contemplación desde el Pisga",
    biblicalRef: "Deuteronomio 3:23-29",
    content: "Moisés oró fervientemente pidiendo cruzar el Jordán. Dios le respondió: 'Basta, no me hables más de este asunto'. Le ordenó subir a la cumbre del Pisga a contemplar la tierra y comisionar a Josué.",
    exegesis: "La justicia divina es imparcial aun con sus más grandes siervos, pero su gracia prepara con amor la transición de liderazgo."
  },
  11: {
    title: "Evento 11: Exhortación a la Obediencia en Beth-peor",
    biblicalRef: "Deuteronomio 4:1-14",
    content: "Moisés llama solemnemente al pueblo a oír y poner por obra los estatutos. Les recuerda la experiencia de Baal-peor y el fuego de Horeb para que enseñen las leyes a sus hijos y nietos.",
    exegesis: "La verdadera sabiduría ante las naciones radica en la obediencia estricta a la revelación dada por Dios."
  },
  12: {
    title: "Evento 12: Advertencia Radical contra la Idolatría",
    biblicalRef: "Deuteronomio 4:15-40",
    content: "Se advierte que en Horeb no vieron ninguna figura humana ni animal, solo oyeron la voz. Por tanto, prohibió absolutamente fabricar imágenes y afirmó que Jehová es el único Dios en los cielos y en la tierra.",
    exegesis: "Establece el monoteísmo puro: Dios es espíritu invisible, soberano, celoso y consumidor de toda falsedad."
  }
};

// 2. Character Modal Dictionary (7 Characters)
const characterData = {
  jehova: {
    title: "Jehová Dios",
    subtitle: "El Dios Soberano del Pacto (Yahvé)",
    function: "Guía, sostiene, juzga la rebelión, defiende y concede victorias milagrosas.",
    features: "Fiel a sus promesas, santo, justo, misericordioso, todopoderoso e invisible.",
    teaching: "Dios permanece absolutamente fiel a su palabra y llama a su pueblo a responder con devoción exclusiva y santidad."
  },
  moises: {
    title: "Moisés",
    subtitle: "Líder, Profeta e Intercesor de Israel",
    function: "Mediador del Pacto de Horeb y expositor de la Ley antes del cruce del Jordán.",
    features: "Profunda mansedumbre, capacitador, visionario, intercesor abnegado y maestro paciente.",
    teaching: "El liderazgo espiritual auténtico no busca la gloria personal, sino capacitar y preparar a la siguiente generación."
  },
  josue: {
    title: "Josué (hijo de Nun)",
    subtitle: "Sucesor Comisionado y General de Israel",
    function: "Compañero de Moisés, espía fiel y sucesor destinado a guiar la conquista de Canaán.",
    features: "Lleno del Espíritu de sabiduría, valiente, firme en la fe y obediente a la palabra.",
    teaching: "Dios renueva continuamente el liderazgo eclesial para garantizar la continuidad de su propósito supremo."
  },
  caleb: {
    title: "Caleb (hijo de Jefone)",
    subtitle: "Ejemplo de Fe e Integridad",
    function: "Espía de la tribu de Judá que junto a Josué confrontó la incredulidad del pueblo.",
    features: "Espíritu diferente, perseverante, confiado en Dios y radical ante el temor.",
    teaching: "La fe inquebrantable capacita al creyente para ver las promesas divinas por encima de los obstáculos visibles."
  },
  sehon: {
    title: "Sehón",
    subtitle: "Rey de los Amorreos en Hesbón",
    function: "Primer monarca poderoso que rehusó dar paso pacífico a Israel en la Transjordania.",
    features: "Corazón obstinado, orgulloso, agresivo e impío.",
    teaching: "La altivez humana y la oposición al plan de Dios resultan invariablemente en ruina y juicio divino."
  },
  og: {
    title: "Og",
    subtitle: "Rey de Basán (Último de los Refaítas)",
    function: "Monarca gigante que gobernaba 60 ciudades fortificadas y atacó a Israel en Edrei.",
    features: "Estatura gigante (cama de hierro de 4 metros), imponente fuerza militar.",
    teaching: "Ningún enemigo, por gigantesco o amurallado que parezca, prevalecerá frente al Señor de los Ejércitos."
  },
  pueblo: {
    title: "El Pueblo de Israel",
    subtitle: "La Congregación del Pacto en el Desierto",
    function: "Comunidad destinataria de los discursos exhortativos y pedagógicos de Moisés.",
    features: "En transición generacional, proclive a la memoria corta pero llamada a la santidad.",
    teaching: "El pueblo de Dios debe aprender de las fallas históricas de sus antepasados para vivir en obediencia presente."
  }
};

// 3. Map Location Dictionary (12 Locations)
const mapData = {
  horeb: { title: "Horeb (Monte Sinaí)", desc: "Lugar sagrado donde Israel recibió la Ley y el Tabernáculo, y donde Dios ordenó levantar el campamento para marchar a la promesa." },
  cades: { title: "Cades-barnea", desc: "Oasis en el desierto de Parán donde tuvo lugar la trágica rebelión de los 12 espías y el decreto de 40 años de vagar." },
  seir: { title: "Monte Seir (Edom)", desc: "Región montañosa habitada por los descendientes de Esaú. Israel rodeó este monte durante largos años por orden divina." },
  edom: { title: "Territorio de Edom", desc: "Nación hermana a la cual Dios protegió prohibiendo a Israel tomar un solo pie de su tierra." },
  moab: { title: "Llanuras de Moab", desc: "Ubicación estratégica frente a Jericó donde Moisés pronunció sus discursos finales registrados en Deuteronomio." },
  amon: { title: "Territorio de Amón", desc: "Región de los descendientes de Ben-ammi (hijo de Lot), respetada por el ejército israelita." },
  arnon: { title: "Río Arnón", desc: "Límite natural que marcaba la frontera entre Moab y el reino amorreo de Sehón." },
  hesbon: { title: "Hesbón", desc: "Capital del rey Sehón, primera gran victoria militar otorgada por Dios a Israel al oriente del Jordán." },
  basan: { title: "Basán (Edrei)", desc: "Región fértil y ganadera gobernada por el gigante Og, cuyas 60 ciudades fueron conquistadas por Israel." },
  galaad: { title: "Galaad", desc: "Región de colinas y bosques entregada a la tribu de Gad y la media tribu de Manasés." },
  jordan: { title: "Río Jordán", desc: "Barrera geográfica y espiritual que separaba el peregrinaje del desierto del ingreso a la Tierra Prometida." },
  pisga: { title: "Monte Pisga (Monte Nebo)", desc: "Cumbre desde la cual Dios le mostró a Moisés toda la extensión de la Tierra Prometida antes de morir." }
};

// 4. Verses Carousel Data (8 Verses)
const verseCarouselData = [
  {
    ref: "Deuteronomio 1:8",
    text: "“Mirad, yo os he entregado la tierra; entrad y poseed la tierra que Jehová juró a vuestros padres Abraham, Isaac y Jacob, que les daría a ellos y a su descendencia después de ellos.”",
    exegesis: "Enseñanza Exegética: La conquista se fundamenta no en el mérito o esfuerzo humano, sino en el juramento incondicional de Dios a los patriarcas."
  },
  {
    ref: "Deuteronomio 2:7",
    text: "“Pues Jehová tu Dios te ha bendecido en toda obra de tus manos; él sabe que andas por este gran desierto; estos cuarenta años Jehová tu Dios ha estado contigo, y nada te ha faltado.”",
    exegesis: "Enseñanza Exegética: Reconocimiento de la provisión y omniscencia de Dios durante los momentos de desierto e incertidumbre."
  },
  {
    ref: "Deuteronomio 3:22",
    text: "“No los temáis; porque Jehová vuestro Dios, él es el que pelea por vosotros.”",
    exegesis: "Enseñanza Exegética: Principio de Guerra Espiritual: La victoria está garantizada porque la batalla pertenece soberanamente al Señor."
  },
  {
    ref: "Deuteronomio 4:1",
    text: "“Ahora, pues, oh Israel, oye los estatutos y decretos que yo os enseño, para que los ejecutéis, y viváis, y entréis y poseáis la tierra que Jehová el Dios de vuestros padres os da.”",
    exegesis: "Enseñanza Exegética: La vida abundante y el disfrute de las promesas están ligados indiscutiblemente a escuchar y obedecer la Revelación."
  },
  {
    ref: "Deuteronomio 4:9",
    text: "“Por tanto, guárdate, y guarda tu alma con diligencia, para que no te olvides de las cosas que tus ojos han visto, ni se aparten de tu corazón todos los días de tu vida; antes bien, las enseñarás a tus hijos, y a los hijos de tus hijos.”",
    exegesis: "Enseñanza Exegética: La responsabilidad de la educación teológica intergeneracional y la vigilancia constante del alma."
  },
  {
    ref: "Deuteronomio 4:29",
    text: "“Mas si desde allí buscares a Jehová tu Dios, lo hallarás, si lo buscares de todo tu corazón y de toda tu alma.”",
    exegesis: "Enseñanza Exegética: Promesa de Gracia y Restauración: Dios responde con misericordia inmediata al arrepentimiento sincero."
  },
  {
    ref: "Deuteronomio 4:39",
    text: "“Aprende pues, hoy, y reflexiona en tu corazón que Jehová es Dios arriba en el cielo y abajo en la tierra, y no hay otro.”",
    exegesis: "Enseñanza Exegética: La afirmación cumbre del Monoteísmo Teológico: Dios es trascendente en el cielo e inmanente en la tierra."
  },
  {
    ref: "Deuteronomio 4:40",
    text: "“Y guarda sus estatutos y sus mandamientos, los cuales yo te mando hoy, para que te vaya bien a ti y a tus hijos después de ti, y prolongues tus días sobre la tierra.”",
    exegesis: "Enseñanza Exegética: El propósito pedagógico de los mandamientos es el bien integral, la paz y la longevidad del creyente."
  }
];

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Restore Dark Mode Preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    const btnDark = document.getElementById('btnDarkMode');
    if (btnDark) btnDark.classList.add('active');
  }

  // Render Carousel Dots
  initVerseCarousel();

  // Attach Keyboard Listeners
  document.addEventListener('keydown', handleKeyPress);

  // Attach Top Button Actions
  document.getElementById('btnIndex').addEventListener('click', () => goToPage(2));
  document.getElementById('btnReadingMode').addEventListener('click', toggleReadingMode);
  document.getElementById('btnDarkMode').addEventListener('click', toggleDarkMode);
  document.getElementById('btnSoundToggle').addEventListener('click', toggleSound);

  // Initial Page Display
  updateFooterUI();
});

// 3D Animated Page Navigation Logic
function goToPage(pageNumber, direction = 'next') {
  if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage || isFlipping) return;

  isFlipping = true;
  const oldPageEl = document.getElementById(`page-${currentPage}`);
  const newPageEl = document.getElementById(`page-${pageNumber}`);
  const exitClass = direction === 'next' ? 'page-flip-exit-next' : 'page-flip-exit-prev';

  if (oldPageEl) {
    oldPageEl.classList.add(exitClass);
  }

  playPageSound();

  setTimeout(() => {
    currentPage = pageNumber;
    if (oldPageEl) {
      oldPageEl.classList.remove('active', exitClass);
    }
    if (newPageEl) {
      newPageEl.classList.add('active');
      newPageEl.scrollTop = 0;
    }
    updateFooterUI();
    isFlipping = false;
  }, 400);
}

function nextPage() {
  if (currentPage < totalPages) {
    goToPage(currentPage + 1, 'next');
  }
}

function prevPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1, 'prev');
  }
}

function updateFooterUI() {
  const btnPrev = document.getElementById('btnPrevPage');
  const btnNext = document.getElementById('btnNextPage');
  const pageIndicator = document.getElementById('pageIndicatorText');
  const progressFill = document.getElementById('progressBarFill');
  const progressPercentText = document.getElementById('progressPercentText');

  if (btnPrev) btnPrev.disabled = (currentPage === 1);
  if (btnNext) btnNext.disabled = (currentPage === totalPages);

  if (pageIndicator) pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
  
  const percentage = Math.round((currentPage / totalPages) * 100);
  if (progressFill) progressFill.style.width = `${percentage}%`;
  if (progressPercentText) progressPercentText.textContent = `${percentage}% completado`;
}

// Keyboard Navigation
function handleKeyPress(e) {
  if (e.key === 'ArrowRight') {
    nextPage();
  } else if (e.key === 'ArrowLeft') {
    prevPage();
  } else if (e.key === 'Escape') {
    closeModal();
  }
}

// Mode Toggles - CORREGIDO: El Modo Lectura Aclara Inmediatamente y Desactiva el Modo Oscuro
function toggleReadingMode() {
  const isReading = document.body.classList.toggle('reading-mode');
  const btnReading = document.getElementById('btnReadingMode');
  const btnDark = document.getElementById('btnDarkMode');

  if (isReading) {
    if (btnReading) btnReading.classList.add('active');
    // Al activar Modo Lectura, desactiva automáticamente el Modo Oscuro y aclara el pergamino
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    if (btnDark) btnDark.classList.remove('active');
  } else {
    if (btnReading) btnReading.classList.remove('active');
  }
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const btnDark = document.getElementById('btnDarkMode');
  const btnReading = document.getElementById('btnReadingMode');

  if (currentTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    if (btnDark) btnDark.classList.remove('active');
  } else {
    // Al activar el Modo Oscuro, si el Modo Lectura estaba activo, desactiva la clase de lectura
    document.body.classList.remove('reading-mode');
    if (btnReading) btnReading.classList.remove('active');

    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    if (btnDark) btnDark.classList.add('active');
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const label = document.getElementById('soundLabel');
  const btn = document.getElementById('btnSoundToggle');
  if (label) label.textContent = soundEnabled ? 'Sonido: ON' : 'Sonido: OFF';
  if (btn) btn.classList.toggle('active', !soundEnabled);
}

// Web Audio API Page Flip Synthesizer
function playPageSound() {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;
    filter.Q.value = 1.2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.18);
  } catch (err) {
    // Fallback
  }
}

// Modals Logic
function openTimelineModal(eventId) {
  const data = timelineData[eventId];
  if (!data) return;

  const header = document.getElementById('modalHeader');
  const body = document.getElementById('modalBody');

  if (header) header.textContent = data.title;
  if (body) {
    body.innerHTML = `
      <div style="font-family:var(--font-heading); color:var(--crimson-accent); font-weight:700; margin-bottom:0.5rem;">Cita Bíblica: ${data.biblicalRef}</div>
      <p style="margin-bottom:1rem; line-height:1.6;">${data.content}</p>
      <div class="verse-highlight-box">
        <div class="verse-ref">Comentario Exegético Académico:</div>
        <div class="verse-text">${data.exegesis}</div>
      </div>
    `;
  }

  const modal = document.getElementById('universalModal');
  if (modal) modal.classList.add('active');
}

function openCharacterModal(charKey) {
  const data = characterData[charKey];
  if (!data) return;

  const header = document.getElementById('modalHeader');
  const body = document.getElementById('modalBody');

  if (header) header.textContent = `${data.title} - ${data.subtitle}`;
  if (body) {
    body.innerHTML = `
      <div style="margin-bottom:0.8rem;">
        <strong style="color:var(--crimson-accent);">Función en el Relato:</strong> ${data.function}
      </div>
      <div style="margin-bottom:0.8rem;">
        <strong style="color:var(--text-gold);">Características Principales:</strong> ${data.features}
      </div>
      <div class="verse-highlight-box" style="margin-top:1rem;">
        <div class="verse-ref">Enseñanza Teológica:</div>
        <div class="verse-text">${data.teaching}</div>
      </div>
    `;
  }

  const modal = document.getElementById('universalModal');
  if (modal) modal.classList.add('active');
}

function showMapLocation(locKey) {
  const data = mapData[locKey];
  if (!data) return;

  const popup = document.getElementById('mapPopup');
  const title = document.getElementById('mapPopupTitle');
  const desc = document.getElementById('mapPopupDesc');

  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;

  if (popup) popup.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('universalModal');
  if (modal) modal.classList.remove('active');
}

// Verses Carousel Logic
function initVerseCarousel() {
  const dotsContainer = document.getElementById('carouselDots');
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';

  verseCarouselData.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
    dot.onclick = () => renderVerse(idx);
    dotsContainer.appendChild(dot);
  });

  renderVerse(0);
}

function renderVerse(idx) {
  if (idx < 0 || idx >= verseCarouselData.length) return;
  currentVerseIndex = idx;

  const item = verseCarouselData[idx];
  const ref = document.getElementById('verseRef');
  const quote = document.getElementById('verseQuote');
  const exegesis = document.getElementById('verseExegesis');

  if (ref) ref.textContent = item.ref;
  if (quote) quote.textContent = item.text;
  if (exegesis) exegesis.innerHTML = `<strong>Enseñanza Exegética:</strong> ${item.exegesis}`;

  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

function nextVerse() {
  const nextIdx = (currentVerseIndex + 1) % verseCarouselData.length;
  renderVerse(nextIdx);
}

function prevVerse() {
  const prevIdx = (currentVerseIndex - 1 + verseCarouselData.length) % verseCarouselData.length;
  renderVerse(prevIdx);
}
