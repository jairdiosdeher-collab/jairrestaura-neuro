import React,{useState} from "react";

const missions=[
 {id:"ritmo",emoji:"🌈",title:"Cada quien tiene su ritmo",intro:"En el salón, algunos niños hablan mucho, otros prefieren escuchar; unos necesitan moverse y otros estar tranquilos. Todos merecen un lugar.",question:"Tu amigo necesita más tiempo para responder. ¿Qué puedes hacer?",options:["Esperar con paciencia","Responder por él sin preguntarle","Burlarme porque tarda"],correct:0,why:"Dar tiempo también es una forma de escuchar. No todos respondemos de la misma manera."},
 {id:"juego",emoji:"🧩",title:"Jugar de muchas maneras",intro:"A Sam le encanta ordenar bloques por colores. A veces juega cerca de otros niños sin hablar. ¡También puede ser una forma de compartir!",question:"¿Cómo puedes invitarle a jugar?",options:["Preguntar si quiere jugar y aceptar su respuesta","Quitarle los bloques para que juegue como yo","Obligarlo a jugar en equipo"],correct:0,why:"Invitar es bonito; obligar no. Podemos jugar juntos, cerca o de otra manera."},
 {id:"ruido",emoji:"🎧",title:"Cuando algo se siente demasiado",intro:"En la fiesta hay música muy fuerte. A tu compañero le molesta el ruido y busca un lugar tranquilo.",question:"¿Qué sería una buena ayuda?",options:["Bajar el volumen o buscar un lugar tranquilo","Decirle que no exagere","Hacer más ruido para que se acostumbre"],correct:0,why:"Preguntar qué ayuda y respetar sus sentidos hace el espacio más amable."},
 {id:"comunicar",emoji:"💬",title:"Hay muchas formas de decir",intro:"Tu amiga señala una imagen para pedir agua. Otra persona usa palabras, gestos, dibujos o un dispositivo. Todas son formas de comunicarse.",question:"¿Qué haces cuando alguien usa imágenes para hablar?",options:["Escucho y espero su mensaje","Le quito las imágenes","Finjo que no entiendo"],correct:0,why:"Las imágenes y los gestos también son comunicación. ¡Merecen respeto!"},
 {id:"amistad",emoji:"🤝",title:"Ser un buen compañero",intro:"A veces alguien quiere conversar; otras veces necesita espacio. La amistad también respeta los límites.",question:"Tu amigo dice «ahora quiero estar solo». ¿Qué haces?",options:["Respeto su espacio y le digo que estaré cerca","Lo sigo insistiendo","Me enojo y lo excluyo"],correct:0,why:"Un «no» se respeta. Puedes ofrecer compañía sin presionar."}
];

const helpfulWords=["¿Quieres que te acompañe?","Podemos hacerlo a tu manera.","Tómate tu tiempo.","¿Qué te ayudaría?","Está bien decir que no.","Podemos buscar un lugar tranquilo."];

export default function Infantil({onBack}){
 const [mission,setMission]=useState(0);
 const [answers,setAnswers]=useState({});
 const [showStory,setShowStory]=useState(false);
 const [pledge,setPledge]=useState([]);
 const [showWords,setShowWords]=useState(false);
 const done=Object.keys(answers).length;
 const score=missions.filter((m,i)=>answers[m.id]===m.correct).length;
 const choose=(id,index)=>setAnswers(prev=>({...prev,[id]:index}));
 return <div className="content child-module">
  <section className="child-hero">
   <div className="child-hero-copy"><span className="child-kicker">UN ESPACIO PARA NIÑAS Y NIÑOS</span><h1>¡Amigos a su propio ritmo! <span>🌟</span></h1><p>Aprendamos a ser buenos compañeros: escuchar, esperar, invitar a jugar y respetar las diferencias.</p><div className="child-tags"><span>💛 Amabilidad</span><span>🌈 Diversidad</span><span>🧩 Juego</span></div></div>
   <div className="child-hero-art" aria-hidden="true"><div className="child-rainbow">🌈</div><div className="child-friends">🧒🏽　👧🏻　🧑🏾‍🦱</div><div className="child-heart">💗</div></div>
  </section>
  <div className="child-welcome"><b>Una idea importante:</b> no todos sentimos, aprendemos, jugamos o nos comunicamos igual. ¡Y eso está bien! No tenemos que cambiar a nuestros amigos; podemos aprender a comprenderlos y compartir con respeto.</div>
  <div className="child-section-title"><span>01 · CUENTO PARA COMPARTIR</span><h2>El equipo de los ritmos diferentes 📖</h2></div>
  <section className="child-story">
   <div className="child-story-art" aria-hidden="true">🌳 🧒🏻 🧩 🧒🏽 🎨</div>
   <div><p>En el recreo, Mila quería dibujar, Leo prefería mirar primero y Nico necesitaba un ratito sin tanto ruido. La profesora les preguntó: «¿Cómo podemos hacer para que todos disfruten?». Eligieron una mesa tranquila, dejaron materiales a la vista y cada quien participó a su manera.</p><p className="child-moral">Ese día descubrieron que un buen equipo no hace todo igual: ¡hace espacio para todos!</p><button className="child-button" onClick={()=>setShowStory(v=>!v)}>{showStory?"Cerrar reflexión":"Conversar sobre el cuento →"}</button>{showStory&&<div className="child-reflection"><b>Hablemos juntos:</b><ul><li>¿Qué necesitaba cada personaje?</li><li>¿Qué hicieron para que todos pudieran participar?</li><li>¿Qué podrías proponer en tu salón o en casa?</li></ul></div>}</div>
  </section>
  <div className="child-section-title"><span>02 · JUEGA Y APRENDE</span><h2>Pequeñas misiones de amistad 🎮</h2><p>Lee la situación y elige la respuesta más amable. ¡Puedes intentarlo de nuevo!</p></div>
  <div className="child-progress"><span style={{width:(done/missions.length*100)+"%"}}/></div><div className="child-progress-label">{done} de {missions.length} misiones exploradas</div>
  <div className="child-mission-grid">{missions.map((m,i)=><article className={"child-mission "+(answers[m.id]!==undefined?"is-answered":"")} key={m.id}><div className="child-mission-top"><span>{m.emoji}</span><small>MISIÓN {i+1}</small></div><h3>{m.title}</h3><p>{m.intro}</p><b className="child-question">{m.question}</b><div className="child-options">{m.options.map((o,j)=><button key={j} className={answers[m.id]===j?"chosen":""} onClick={()=>choose(m.id,j)}>{String.fromCharCode(65+j)}. {o}</button>)}</div>{answers[m.id]!==undefined&&<div className={"child-feedback "+(answers[m.id]===m.correct?"good":"try-again")}>{answers[m.id]===m.correct?"¡Muy bien! 🌟 ":"Vamos a pensarlo juntos. 💛 "}{m.why}</div>}</article>)}</div>
  {done===missions.length&&<div className="child-celebration"><span>🏆</span><div><b>¡Terminaste las misiones!</b><p>Respuestas amables: {score} de {missions.length}. Lo importante no es ganar, sino aprender a tratar a cada persona con respeto.</p><button className="child-button" onClick={()=>{setAnswers({});setMission(0)}}>Volver a jugar</button></div></div>}
  <div className="child-section-title"><span>03 · PALABRAS QUE ABRAZAN</span><h2>Frases que hacen sentir bien 💬</h2><p>Podemos usar estas frases para invitar, escuchar y acompañar sin presionar.</p></div>
  <section className="child-words"><div className="child-words-art" aria-hidden="true">💌</div><div className="child-words-list">{helpfulWords.map((w,i)=><div key={w}><span>{["💛","🌱","⏳","👂","🫶","🌿"][i]}</span><b>{w}</b></div>)}</div><button className="child-button" onClick={()=>setShowWords(v=>!v)}>{showWords?"Ocultar consejo":"¿Qué debemos evitar? →"}</button>{showWords&&<p className="child-avoid">Evitemos burlas, apodos, imitar a alguien, tocar sin permiso, quitar apoyos de comunicación o insistir cuando una persona dice «no». Si vemos una burla o exclusión, podemos acompañar y pedir ayuda a un adulto de confianza.</p>}</section>
  <div className="child-section-title"><span>04 · MI COMPROMISO</span><h2>Yo puedo hacer espacio para todos 💚</h2><p>Marca las acciones que quieres practicar. No es una prueba: es una promesa amable contigo y con tus compañeros.</p></div>
  <section className="child-pledge">{["Escuchar sin burlarme.","Esperar el tiempo que mi amigo necesite.","Preguntar antes de ayudar o tocar.","Respetar cuando alguien dice «no».","Invitar a jugar sin obligar.","Avisar a un adulto si alguien es excluido o lastimado."].map((p,i)=><label key={p} className={pledge.includes(i)?"pledged":""}><input type="checkbox" checked={pledge.includes(i)} onChange={e=>setPledge(old=>e.target.checked?[...old,i]:old.filter(x=>x!==i))}/><span>{p}</span></label>)}<div className="child-pledge-end">🌟 {pledge.length} compromisos elegidos. ¡Cada gesto amable cuenta!</div></section>
  <aside className="child-adult-note"><b>Para familias y docentes</b><p>Lean y jueguen junto al niño, sin convertirlo en examen. No pidan a un niño neurodivergente que explique o represente a todas las personas. Pregunten qué apoyos desea, protejan su privacidad y detengan cualquier burla o exclusión. El módulo enseña convivencia; no diagnostica ni reemplaza apoyos individualizados.</p></aside>
  <div className="child-footer-line">«Tu ritmo es perfecto. Mi ritmo también. Podemos caminar juntos». 💛</div>
  <button className="back" onClick={onBack}>← Volver al panel principal</button>
 </div>;
}
