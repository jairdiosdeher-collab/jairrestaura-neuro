import React, { useMemo, useState } from "react";
import "./Habla.css";

const soundSets = [
  { id:"r", name:"Sonido R", color:"peach", icon:"🦊", intro:"Explora palabras que contienen el sonido R. Escucha, observa y juega sin prisa.", words:[["rana","🐸"],["pera","🍐"],["mariposa","🦋"],["caracol","🐌"]] },
  { id:"rr", name:"Sonido RR", color:"lilac", icon:"🚗", intro:"Descubre palabras con RR. La pronunciación se desarrolla de manera diferente en cada niño.", words:[["perro","🐶"],["carro","🚙"],["tierra","🌎"],["torre","🏰"]] },
  { id:"s", name:"Sonido S", color:"mint", icon:"🐍", intro:"Escucha palabras con S y juega a encontrarlas en tu entorno.", words:[["sol","☀️"],["sapo","🐸"],["mesa","🪑"],["silla","🪑"]] },
  { id:"l", name:"Sonido L", color:"sky", icon:"🌙", intro:"Palabras para escuchar y descubrir el sonido L.", words:[["luna","🌙"],["lápiz","✏️"],["pala","🪏"],["ola","🌊"]] },
  { id:"m", name:"Sonido M", color:"lemon", icon:"🐵", intro:"Explora el sonido M con palabras conocidas y divertidas.", words:[["mano","✋"],["mamá","💗"],["mapa","🗺️"],["mono","🐒"]] }
];

const learningPath = [
  {id:"escucho",title:"Descubro sonidos",emoji:"👂",level:"1",goal:"Prestar atención a sonidos del entorno y disfrutar de escuchar.",steps:["Escuchar sonidos de animales y objetos.","Distinguir sonidos largos y cortos.","Elegir el sonido que más me gusta."]},
  {id:"silabas",title:"Juego con sílabas",emoji:"👏",level:"2",goal:"Explorar el ritmo de las palabras con palmas, movimientos o imágenes.",steps:["Escuchar una palabra conocida.","Acompañar sus partes con palmas si resulta cómodo.","Jugar a encontrar palabras que comienzan parecido."]},
  {id:"palabras",title:"Descubro palabras",emoji:"🧩",level:"3",goal:"Relacionar imágenes, objetos, acciones y palabras.",steps:["Observar una imagen.","Escuchar una palabra.","Elegir otra imagen relacionada."]},
  {id:"frases",title:"Uno ideas",emoji:"💬",level:"4",goal:"Explorar distintas maneras de expresar necesidades, ideas y preferencias.",steps:["Elegir una imagen.","Combinar dos o más pictogramas.","Compartir una idea con voz, gesto o señalamiento."]},
  {id:"historias",title:"Cuento lo que imagino",emoji:"📖",level:"5",goal:"Disfrutar historias, secuencias y conversaciones compartidas.",steps:["Observar una secuencia.","Ordenar lo que sucede.","Inventar un final propio."]}
];

const syllableWords = [
  {word:"mariposa",parts:["ma","ri","po","sa"],emoji:"🦋"},
  {word:"pelota",parts:["pe","lo","ta"],emoji:"⚽"},
  {word:"tomate",parts:["to","ma","te"],emoji:"🍅"},
  {word:"camino",parts:["ca","mi","no"],emoji:"🛤️"},
  {word:"familia",parts:["fa","mi","lia"],emoji:"👨‍👩‍👧"},
  {word:"conejo",parts:["co","ne","jo"],emoji:"🐰"}
];

const communicationBoards = [
  {name:"Necesito",items:[["💧","Agua"],["🍽️","Comer"],["🚻","Baño"],["🛏️","Descansar"],["🆘","Ayuda"],["✋","Parar"]]},
  {name:"Quiero",items:[["🎲","Jugar"],["📖","Leer"],["🎵","Música"],["🌳","Salir"],["🧸","Juguete"],["📺","Ver"]]},
  {name:"Siento",items:[["😊","Feliz"],["😟","Preocupado"],["😴","Tengo sueño"],["🤕","Me duele"],["❤️","Te quiero"],["🙅","No quiero"]]},
  {name:"Converso",items:[["👋","Hola"],["🙏","Por favor"],["💛","Gracias"],["❓","¿Qué?"],["✅","Sí"],["❌","No"]]}
];

const pictureWords = [
  {word:"mariposa",emoji:"🦋",clue:"Tiene alas de muchos colores."},
  {word:"pelota",emoji:"⚽",clue:"Podemos jugar con ella."},
  {word:"manzana",emoji:"🍎",clue:"Es una fruta crujiente."},
  {word:"elefante",emoji:"🐘",clue:"Tiene una trompa larga."},
  {word:"estrella",emoji:"⭐",clue:"Brilla en el cielo."},
  {word:"jirafa",emoji:"🦒",clue:"Tiene el cuello muy largo."}
];

const stories = [
  {title:"Lola y la luna",emoji:"🌙",text:"Cuando llegó la noche, Lola miró por la ventana. La luna parecía una sonrisa en el cielo. Lola llamó a su abuelo y juntos inventaron una historia de estrellas viajeras.",questions:["¿Qué miró Lola por la ventana?","¿Con quién inventó una historia?","¿Qué historia inventarías tú?"]},
  {title:"El paseo de Tomás",emoji:"🦋",text:"Tomás salió al jardín con su familia. Encontró una mariposa sobre una flor. Se quedó observando en silencio y después contó lo que había visto.",questions:["¿Dónde salió Tomás?","¿Qué encontró?","¿Qué te gusta observar cuando paseas?"]},
  {title:"La caja de sonidos",emoji:"🎁",text:"En una caja había una campana, unas llaves y una pelota. Cada objeto tenía un sonido diferente. Ana los exploró y eligió su favorito.",questions:["¿Qué objetos había en la caja?","¿Todos sonaban igual?","¿Qué sonido te gusta escuchar?"]}
];

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-CO";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function readProgress() {
  try { return JSON.parse(localStorage.getItem("neuro-habla-progress") || "{}"); }
  catch { return {}; }
}

export default function Habla({ onBack }) {
  const [section,setSection] = useState("inicio");
  const [sound,setSound] = useState("r");
  const [wordIndex,setWordIndex] = useState(0);
  const [pictureIndex,setPictureIndex] = useState(0);
  const [storyIndex,setStoryIndex] = useState(0);
  const [storyQuestion,setStoryQuestion] = useState(0);
  const [syllableIndex,setSyllableIndex] = useState(0);
  const [boardCategory,setBoardCategory] = useState(0);
  const [phrase,setPhrase] = useState([]);
  const [expandedPath,setExpandedPath] = useState("escucho");
  const [progress,setProgress] = useState(readProgress);
  const [parentOpen,setParentOpen] = useState(false);
  const [note,setNote] = useState("");
  const [savedNote,setSavedNote] = useState("");

  const activeSound = soundSets.find(item=>item.id===sound) || soundSets[0];
  const activeWord = activeSound.words[wordIndex % activeSound.words.length];
  const activePicture = pictureWords[pictureIndex % pictureWords.length];
  const activeStory = stories[storyIndex % stories.length];
  const doneCount = useMemo(()=>Object.values(progress).filter(Boolean).length,[progress]);

  function markDone(key) {
    setProgress(previous=>{
      const next={...previous,[key]:true};
      try { localStorage.setItem("neuro-habla-progress",JSON.stringify(next)); } catch {}
      return next;
    });
  }

  function nextWord() { setWordIndex(value=>(value+1)%activeSound.words.length); }
  function nextPicture() { setPictureIndex(value=>(value+1)%pictureWords.length); }
  function saveFamilyNote() {
    const clean=note.trim();
    if(!clean) return;
    const entry={text:clean,date:new Date().toLocaleDateString("es-CO")};
    try {
      const entries=JSON.parse(localStorage.getItem("neuro-habla-family-notes")||"[]");
      localStorage.setItem("neuro-habla-family-notes",JSON.stringify([entry,...entries].slice(0,20)));
      setSavedNote("La idea quedó guardada en este dispositivo.");
      setNote("");
    } catch { setSavedNote("No fue posible guardar. Puedes copiar tu nota antes de salir."); }
  }

  return <div className="content habla-module">
    <section className="habla-hero">
      <div className="habla-hero-copy">
        <span className="habla-kicker">JAIRRESTAURA · NEURO</span>
        <h1>¡Cada palabra tiene su camino! <span>💬</span></h1>
        <p>Un espacio amable para escuchar, jugar con sonidos, descubrir palabras y compartir historias. Cada niño aprende a su propio ritmo.</p>
        <div className="habla-tags"><span>🌈 Sin comparaciones</span><span>🎧 Escuchar y explorar</span><span>🏡 En familia</span></div>
        <button className="habla-primary" onClick={()=>setSection("sonidos")}>Comenzar a explorar <span>→</span></button>
      </div>
      <div className="habla-hero-art" aria-hidden="true"><div className="habla-sun">☀️</div><div className="habla-cloud">💭</div><div className="habla-friends">🧒🏽　👧🏻</div><div className="habla-bubbles">🔤　🦋　🎈</div></div>
    </section>

    <div className="habla-welcome"><b>Una idea para recordar:</b> comunicarse es mucho más que pronunciar sonidos. También es señalar, mirar imágenes, usar gestos, escribir, jugar y compartir. Todas las formas de comunicación merecen respeto.</div>

    <nav className="habla-tabs" aria-label="Secciones de Habla">
      {[["inicio","🏡 Inicio"],["ruta","🧭 Mi camino"],["sonidos","🔤 Sonidos"],["silabas","👏 Sílabas"],["palabras","🧩 Palabras"],["pictos","💬 Me comunico"],["cuentos","📖 Cuentos"],["familia","💛 Familias"],["progreso","🌟 Mi recorrido"]].map(([id,label])=><button key={id} className={section===id?"active":""} onClick={()=>setSection(id)}>{label}</button>)}
    </nav>

    {section==="inicio" && <div className="habla-section">
      <div className="habla-section-heading"><span>UN RECORRIDO AMABLE</span><h2>¿Qué quieres descubrir hoy?</h2><p>Elige una actividad. No hay calificaciones ni respuestas que definan cuánto vale un niño.</p></div>
      <div className="habla-card-grid">
        <button className="habla-feature-card peach" onClick={()=>setSection("ruta")}><span>🦊</span><small>01 · EXPLORAR</small><b>Sonidos y palabras</b><p>Escucha palabras, descubre sonidos y juega con sus ritmos.</p><strong>Ir a explorar →</strong></button>
        <button className="habla-feature-card mint" onClick={()=>setSection("palabras")}><span>🧩</span><small>02 · DESCUBRIR</small><b>¿Qué veo?</b><p>Observa imágenes, escucha pistas y encuentra palabras.</p><strong>Jugar ahora →</strong></button>
        <button className="habla-feature-card lilac" onClick={()=>setSection("cuentos")}><span>📚</span><small>03 · IMAGINAR</small><b>Cuentos para conversar</b><p>Historias cortas para escuchar, recordar y crear.</p><strong>Leer un cuento →</strong></button>
        <button className="habla-feature-card sky" onClick={()=>setSection("familia")}><span>👨‍👩‍👧</span><small>04 · ACOMPAÑAR</small><b>En casa, juntos</b><p>Ideas sencillas para conversar durante la vida diaria.</p><strong>Ver ideas →</strong></button>
      </div>
      <div className="habla-note"><b>Para adultos:</b> estas actividades son educativas y recreativas. No evalúan, diagnostican ni tratan trastornos del habla o del lenguaje. Si existe preocupación por el desarrollo comunicativo, consulta con un fonoaudiólogo o profesional de salud infantil.</div>
    </div>}

    {section==="ruta" && <div className="habla-section">
      <div className="habla-section-heading"><span>MI CAMINO DE APRENDIZAJE</span><h2>Pequeños pasos, grandes descubrimientos</h2><p>Explora las propuestas en el orden que tenga sentido para cada niño. No hay niveles obligatorios, pruebas ni plazos.</p></div>
      <div className="habla-path-list">{learningPath.map((item,index)=><article className="habla-path-card" key={item.id}>
        <div className="habla-path-icon">{item.emoji}</div><div className="habla-path-copy"><small>ETAPA {item.level}</small><h3>{item.title}</h3><p>{item.goal}</p><button onClick={()=>setExpandedPath(expandedPath===item.id?"":item.id)}>{expandedPath===item.id?"Ocultar actividades":"Ver actividades →"}</button>
        {expandedPath===item.id&&<div className="habla-path-steps">{item.steps.map((step,i)=><div key={step}><span>{i+1}</span>{step}</div>)}<button onClick={()=>{setSection(item.id==="silabas"?"silabas":item.id==="palabras"?"palabras":item.id==="frases"?"pictos":item.id==="historias"?"cuentos":"sonidos");markDone("ruta-"+item.id)}}>Comenzar esta propuesta</button></div>}</div>
        <span className="habla-path-status">{progress["ruta-"+item.id]?"✓ Explorada":"A tu ritmo"}</span>
      </article>)}</div>
      <div className="habla-note">Las etapas son ideas para organizar experiencias educativas, no una escala del desarrollo ni una evaluación de capacidades. Puedes comenzar por cualquier actividad.</div>
    </div>}

    {section==="silabas" && <div className="habla-section">
      <div className="habla-section-heading"><span>JUEGO DE RITMOS Y PALABRAS</span><h2>Las palabras tienen partes</h2><p>Escucha, observa las partes de una palabra y acompáñalas con palmas, movimientos o fichas si el niño lo disfruta. También puede solo mirar y escuchar.</p></div>
      <article className="habla-syllable-card"><div className="habla-syllable-emoji">{syllableWords[syllableIndex].emoji}</div><div><small>PALABRA PARA EXPLORAR</small><h3>{syllableWords[syllableIndex].word}</h3><div className="habla-syllable-parts">{syllableWords[syllableIndex].parts.map((part,i)=><button key={i} onClick={()=>speak(part)}>{part}</button>)}</div><p>{syllableWords[syllableIndex].parts.length} partes para explorar, sin prisa.</p><button onClick={()=>speak(syllableWords[syllableIndex].word)}>🔊 Escuchar palabra completa</button><button onClick={()=>setSyllableIndex(v=>(v+1)%syllableWords.length)}>Otra palabra ↗</button></div></article>
      <button className="habla-complete" onClick={()=>markDone("silabas")}>✓ Marcar este juego como realizado</button>
      <div className="habla-note">La separación mostrada es una ayuda lúdica. No es una prueba de conciencia fonológica ni debe usarse para calificar al niño.</div>
    </div>}

    {section==="pictos" && <div className="habla-section">
      <div className="habla-section-heading"><span>COMUNICACIÓN PARA TODOS</span><h2>Mi tablero para decir lo que necesito</h2><p>Elige imágenes para construir un mensaje. El niño puede señalar, tocar, mirar, usar gestos o combinar pictogramas. No necesita hablar para comunicarse.</p></div>
      <div className="habla-board-tabs">{communicationBoards.map((board,index)=><button key={board.name} className={boardCategory===index?"selected":""} onClick={()=>setBoardCategory(index)}>{board.name}</button>)}</div>
      <div className="habla-picto-grid">{communicationBoards[boardCategory].items.map(([emoji,label])=><button key={label} onClick={()=>setPhrase(old=>[...old,label].slice(-8))}><span>{emoji}</span><b>{label}</b></button>)}</div>
      <div className="habla-phrase-box"><small>MI MENSAJE</small><p>{phrase.length?phrase.join(" · "):"Toca las imágenes para construir un mensaje."}</p><div><button onClick={()=>phrase.length&&speak(phrase.join(" "))} disabled={!phrase.length}>🔊 Escuchar mensaje</button><button onClick={()=>setPhrase([])} disabled={!phrase.length}>Limpiar</button></div></div>
      <div className="habla-note">Este tablero es un apoyo básico de comunicación y no sustituye un sistema de comunicación aumentativa y alternativa individualizado. Las palabras, imágenes y organización deben adaptarse a las preferencias y necesidades de cada persona. Nunca retires otros medios de comunicación.</div>
    </div>}

    {section==="sonidos" && <div className="habla-section">
      <div className="habla-section-heading"><span>01 · ESCUCHAR Y EXPLORAR</span><h2>El mundo de los sonidos</h2><p>Selecciona una familia de sonidos. Escucha las palabras y, si el niño quiere, repítanlas jugando. También está bien solo escuchar.</p></div>
      <div className="habla-sound-tabs">{soundSets.map(item=><button key={item.id} className={sound===item.id?"selected":""} onClick={()=>{setSound(item.id);setWordIndex(0)}}>{item.icon} {item.name}</button>)}</div>
      <article className={"habla-word-card "+activeSound.color}><div className="habla-word-illustration">{activeWord[1]}</div><div className="habla-word-copy"><small>{activeSound.name.toUpperCase()}</small><h3>{activeWord[0]}</h3><p>{activeSound.intro}</p><div className="habla-actions"><button onClick={()=>speak(activeWord[0])}>🔊 Escuchar palabra</button><button onClick={nextWord}>Otra palabra ↗</button></div></div></article>
      <div className="habla-note">No es necesario pronunciar una palabra de una manera determinada. Evita corregir con presión, pedir repeticiones constantes o comparar. Si un fonoaudiólogo ha indicado ejercicios específicos, sigue su orientación individual.</div>
      <button className="habla-complete" onClick={()=>markDone("sonidos-"+sound)}>✓ Marcar esta exploración como realizada</button>
    </div>}

    {section==="palabras" && <div className="habla-section">
      <div className="habla-section-heading"><span>02 · MIRAR, PENSAR Y NOMBRAR</span><h2>¿Qué veo en la imagen?</h2><p>Observa la ilustración. Puedes escuchar la palabra, leer la pista o inventar otra historia.</p></div>
      <article className="habla-picture-card"><div className="habla-picture-emoji">{activePicture.emoji}</div><div className="habla-picture-copy"><span>PISTA AMABLE</span><h3>{activePicture.clue}</h3><button onClick={()=>speak(activePicture.word)}>🔊 Escuchar palabra</button><button onClick={nextPicture}>Cambiar imagen ↗</button></div></article>
      <div className="habla-note">No hay una única respuesta obligatoria. El niño puede señalar, gesticular, escribir, usar una imagen o decir la palabra.</div>
      <button className="habla-complete" onClick={()=>markDone("palabras")}>✓ Marcar este juego como realizado</button>
    </div>}

    {section==="cuentos" && <div className="habla-section">
      <div className="habla-section-heading"><span>03 · ESCUCHAR E IMAGINAR</span><h2>Cuentos para conversar</h2><p>Lean juntos. Hagan pausas y permitan que el niño responda a su manera o simplemente disfrute la historia.</p></div>
      <article className="habla-story-card"><div className="habla-story-art">{activeStory.emoji}</div><div className="habla-story-copy"><small>CUENTO {storyIndex+1} DE {stories.length}</small><h3>{activeStory.title}</h3><p>{activeStory.text}</p><button onClick={()=>speak(activeStory.text)}>🔊 Escuchar cuento</button><button onClick={()=>{setStoryIndex(v=>(v+1)%stories.length);setStoryQuestion(0)}}>Otro cuento →</button></div></article>
      <div className="habla-questions"><b>Después del cuento, si quieren conversar:</b>{activeStory.questions.map((question,index)=><button key={question} className={storyQuestion===index?"chosen":""} onClick={()=>setStoryQuestion(index)}>{index+1}. {question}</button>)}<p>Pregunta sin convertirlo en examen. Acepta respuestas con palabras, gestos, dibujos o imágenes.</p></div>
      <button className="habla-complete" onClick={()=>markDone("cuentos-"+storyIndex)}>✓ Marcar este cuento como compartido</button>
    </div>}

    {section==="familia" && <div className="habla-section">
      <div className="habla-section-heading"><span>04 · IDEAS PARA LA VIDA DIARIA</span><h2>La conversación también vive en casa</h2><p>No hace falta una sesión formal. Los momentos cotidianos pueden abrir oportunidades para comunicarse.</p></div>
      <div className="habla-family-grid">
        {[["🍽️","En la mesa","Nombra alimentos, describe sabores y permite que el niño elija o señale."],["🛁","En la rutina","Anticipa pasos con palabras, objetos o imágenes. Dale tiempo para responder."],["🧸","Durante el juego","Sigue sus intereses. Imita sonidos del juego si le agrada y espera su iniciativa."],["🚶","En un paseo","Observen juntos el entorno: colores, vehículos, animales, sonidos y lugares."],["📚","Al leer","Señala dibujos, comenta lo que ocurre y deja que el niño cambie la historia."],["💬","Al conversar","Habla con naturalidad, escucha y evita convertir cada charla en una corrección."]] .map(([icon,title,body])=><article key={title}><span>{icon}</span><b>{title}</b><p>{body}</p></article>)}
      </div>
      <div className="habla-family-form"><label htmlFor="habla-note">Una idea que quiero probar en casa (no escribas nombres ni datos personales)</label><textarea id="habla-note" value={note} onChange={event=>setNote(event.target.value)} placeholder="Ejemplo: leer un cuento corto después de la merienda..."/><button onClick={saveFamilyNote}>Guardar idea en este dispositivo</button>{savedNote&&<p role="status">{savedNote}</p>}</div>
      <div className="habla-note">El almacenamiento es local en este navegador. No incluyas diagnósticos, nombres completos, teléfonos ni información privada de menores.</div>
    </div>}

    {section==="progreso" && <div className="habla-section">
      <div className="habla-section-heading"><span>05 · MI CAMINO</span><h2>Cada pequeño descubrimiento cuenta</h2><p>Este registro solo recuerda las actividades que la familia marca como realizadas. No mide habilidades ni desarrollo.</p></div>
      <div className="habla-progress-panel"><div className="habla-progress-number">{doneCount}</div><div><b>Exploraciones compartidas</b><p>Actividades marcadas en este dispositivo. Puedes volver a jugar cuando quieras.</p></div></div>
      <div className="habla-progress-list">{["sonidos-r","sonidos-rr","sonidos-s","sonidos-l","sonidos-m","palabras","cuentos-0","cuentos-1","cuentos-2"].map(key=><div key={key}><span>{progress[key]?"🌟":"○"}</span>{key.replace("sonidos-","Sonido ").replace("palabras","Juego de palabras").replace("cuentos-","Cuento ") }<b>{progress[key]?"Explorado":"Por descubrir"}</b></div>)}</div>
      <button className="habla-complete" onClick={()=>{if(window.confirm("¿Deseas borrar el registro local de actividades de HABLA?")){localStorage.removeItem("neuro-habla-progress");setProgress({});}}}>Borrar mi recorrido de este dispositivo</button>
    </div>}

    <div className="habla-adult-bar"><span>🧑‍🏫</span><div><b>Un espacio para familias y profesionales</b><p>Las actividades no sustituyen una valoración ni un plan individual de fonoaudiología.</p></div><button onClick={()=>setParentOpen(value=>!value)}>{parentOpen?"Cerrar":"Orientación responsable"}</button></div>
    {parentOpen && <div className="habla-parent-panel"><h3>¿Cuándo buscar orientación profesional?</h3><p>Si la familia tiene inquietudes sobre la comprensión, la expresión, la interacción, la audición o la pronunciación, puede conversar con pediatría y solicitar valoración por fonoaudiología. La evaluación considera la historia, el contexto, la lengua o lenguas del niño y sus formas de comunicación.</p><p>No compares al niño con hermanos o compañeros. No uses estas actividades para asignar etiquetas, puntuaciones o diagnósticos. Los ejercicios terapéuticos deben ser seleccionados por el profesional que conoce al niño.</p><p><b>Privacidad:</b> esta sección no solicita grabaciones ni videos. El avance y las notas opcionales se guardan únicamente en el almacenamiento local del navegador.</p></div>}

    <div className="habla-closing">«Cada forma de comunicar merece tiempo, escucha y respeto». 💛</div>
    <button className="back" onClick={onBack}>← Volver a JAIRRESTAURA NEURO</button>
  </div>;
}
