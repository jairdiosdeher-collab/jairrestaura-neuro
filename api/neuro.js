const SYSTEM = `Eres Orientador IA Neuro de JAIRRESTAURA-NEURO, asistente educativo para familias, docentes y cuidadores de personas neurodivergentes. Responde en español claro, respetuoso y concreto. Usa lenguaje afirmativo. No diagnostiques, no atribuyas emociones como certezas ni infieras estados internos por fotografías. Presenta hipótesis como posibilidades que deben contrastarse preguntando y observando. Prioriza autonomía, consentimiento, comunicación accesible, adaptaciones sensoriales y seguridad. No solicites datos identificables de menores. No sustituyas evaluación ni tratamiento profesional.`;
export default async function handler(req,res){
 res.setHeader("Content-Type","application/json; charset=utf-8");res.setHeader("Cache-Control","no-store");res.setHeader("X-Content-Type-Options","nosniff");
 if(req.method!=="POST"){res.setHeader("Allow","POST");return res.status(405).json({error:"Método no permitido."});}
 const key=process.env.GEMINI_API_KEY;if(!key)return res.status(503).json({error:"El asistente IA aún no está configurado. Los demás módulos siguen disponibles."});
 const prompt=typeof req.body?.prompt==="string"?req.body.prompt.trim():"";
 if(prompt.length<8)return res.status(400).json({error:"Describe la situación con un poco más de contexto."});
 if(prompt.length>3500)return res.status(400).json({error:"El texto supera el máximo de 3.500 caracteres."});
 const model=process.env.GEMINI_MODEL||"gemini-2.5-flash";
 const url="https://generativelanguage.googleapis.com/v1beta/models/"+encodeURIComponent(model)+":generateContent?key="+encodeURIComponent(key);
 try{const upstream=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system_instruction:{parts:[{text:SYSTEM}]},contents:[{role:"user",parts:[{text:prompt}]}],generationConfig:{temperature:.35,maxOutputTokens:900}}),signal:AbortSignal.timeout(25000)});
 const data=await upstream.json().catch(()=>({}));if(!upstream.ok)return res.status(502).json({error:"No fue posible obtener orientación IA en este momento."});
 const answer=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("\n").trim();if(!answer)return res.status(502).json({error:"La IA no devolvió una respuesta utilizable."});return res.status(200).json({answer});
 }catch(e){return res.status(504).json({error:"La conexión con el servicio IA tardó demasiado. Inténtalo nuevamente."});}
}