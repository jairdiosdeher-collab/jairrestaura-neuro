# JAIRRESTAURA-NEURO

**Comprender es acompañar.** Aplicación educativa gratuita para familias, docentes y cuidadores.

## Estado de esta entrega
- Interfaz React + Vite en español.
- 12 módulos visibles; 8 con experiencias iniciales implementadas y 4 marcados honestamente como ampliación.
- Comunicador visual básico, exploración educativa con IA, orientador IA, mapa sensorial, rutinas locales, diario local, guía familiar y lista de observación.
- Backend serverless en `api/neuro.js`; la clave Gemini nunca se expone al navegador.
- Tema claro/oscuro, diseño adaptable y PWA básica.

## Requisitos
Node.js 20 o superior. Para habilitar IA, configurar `GEMINI_API_KEY` como variable secreta en el entorno de Vercel y `GEMINI_MODEL=gemini-2.5-flash`.

## Seguridad
No subir archivos `.env` ni claves. Los datos del diario y rutinas se guardan localmente en el navegador. La aplicación no diagnostica ni pretende adivinar emociones. Antes de usarla con menores, revisar privacidad, consentimiento, accesibilidad y protección de datos.

## Publicación
Conectar este repositorio a Vercel como proyecto Vite. Build: `npm run build`. Output: `dist`.
