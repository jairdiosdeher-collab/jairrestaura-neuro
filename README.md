# JAIRRESTAURA-NEURO
**Comprender es acompañar.** Biblioteca educativa gratuita, local y autónoma.

## Enfoque de esta versión
- Biblioteca incorporada en el código: consulta y búsqueda sin conexión después de la primera carga.
- Sin API de IA, sin Gemini, sin claves, sin llamadas a servicios externos y sin registro.
- Sin fuentes, imágenes, analítica ni bibliotecas cargadas desde CDN.
- Recursos: neurodiversidad, comunicación accesible, emociones sin adivinar, conducta y contexto, bienestar sensorial, rutinas, familia, aula inclusiva, juego, fortalezas, adolescencia, crisis, salud, derechos, bitácora local, comunicador visual y plan de apoyos.
- Bitácora y rutinas guardadas en el almacenamiento local del dispositivo.
- PWA con caché local para volver a abrir la aplicación sin conexión después de instalarla o visitarla con conexión.
- Tema claro y oscuro; diseño adaptable a móvil y computador.

## Independencia y límites
La aplicación no necesita servicios externos durante el uso. Para compilar/publicar se instalan React, React DOM y Vite como dependencias de desarrollo; Vite empaqueta los recursos para que el navegador no descargue esas bibliotecas desde internet al utilizar la app. El primer acceso o instalación requiere conexión para descargar los archivos. La disponibilidad offline debe probarse en el navegador/dispositivo final.

## Desarrollo y publicación
Node.js 20 o superior. Ejecutar `npm install`, `npm run build`; salida en `dist`. Vercel: Framework Vite, Build `npm run build`, Output `dist`. No se requieren variables de entorno.

## Privacidad y uso responsable
Los registros permanecen en el almacenamiento del navegador del dispositivo. No registrar nombres, documentos, direcciones ni datos identificables de menores. Exporta solo en un dispositivo seguro. Eliminar los datos del navegador puede borrar la bitácora. Contenido educativo: no diagnostica, no ofrece atención de urgencias ni sustituye evaluación profesional.