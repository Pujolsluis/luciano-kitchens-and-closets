# Quote forms: English and Spanish

Create two new surveys in the business SurveyMonkey account. Keep each survey on a single page, without a mandatory sign-in. Use an Embedded Survey website collector and a separate Web Link collector for the fallback link.

| Field | English | Español | Required |
| --- | --- | --- | --- |
| Name | Your name | Tu nombre | Yes |
| Phone | Phone number | Número de teléfono | Yes |
| Email | Email address | Correo electrónico | No |
| Location | Project city or ZIP code | Ciudad o código postal del proyecto | Yes |
| Service | What are you planning? | ¿Qué proyecto tienes en mente? | Yes |
| Details | Tell us a little about your project | Cuéntanos un poco sobre tu proyecto | No |

Service choices: Kitchen remodeling / Remodelación de cocina; Custom closet / Clóset a medida; Cabinet refacing / Renovación de gabinetes; 3D design / Diseño 3D; Help me decide / Necesito orientación.

Title: “Tell us about your project” / “Cuéntanos sobre tu proyecto”.
Intro: “Share a few details so we can discuss your space and the next step.” / “Comparte algunos detalles para que podamos hablar de tu espacio y el siguiente paso.”
Submit: “Request a quote” / “Solicitar presupuesto”.
Thank you: “Thank you. Your project request has been received. For questions, call (863) 732-8482.” / “Gracias. Recibimos tu solicitud. Si tienes preguntas, llama al (863) 732-8482.”

Do not promise a response time, a free estimate, or a confirmed appointment. Do not request an exact street address, financial information, or photos in this initial form.

## Connect collectors

1. Create the surveys and collectors in the account; verify available features and current response limits. Configure responses so a returning customer can make another inquiry.
2. Copy each official Website Collector embed snippet unchanged into a complete HTML document at `public/surveys/en.html` or `public/surveys/es.html`. The document must have a matching `<html lang="en">` or `lang="es"`, UTF-8, viewport metadata, a descriptive title, and `body { margin: 0; }`. Use the responsive collector sizing option. The site's iframe isolates the vendor snippet from React.
3. In `config/surveys.json`, set each language’s `embedFile` to `/surveys/en.html` or `/surveys/es.html`, and `url` to its HTTPS Web Link collector URL.
4. Run `npm run build && npm test`. Test mobile scrolling, validation, keyboard navigation, submit, confirmation, and a second response. Confirm the record appears in the right survey. Submit test data only to a designated test collector; do not put customer responses in Git.
5. If the embed is blocked, the direct survey link, phone number, and email remain visible. With empty configuration, the page displays only working phone/email contact options.

## Response notifications

Configure the account’s supported email notifications for the responsible business owner. SurveyMonkey documents Instant Notifications as an Enterprise feature; do not assume the account includes it. If unavailable, establish a regular review of responses or separately evaluate an account-supported notification integration. Confirm delivery before treating email notifications as operational.

Responses remain in SurveyMonkey. No SurveyMonkey API key is needed or permitted in the browser bundle. The public collector code and survey URL are intended for website visitors.

## References

- [Website collectors](https://help.surveymonkey.com/en/surveymonkey/send/website-collector/)
- [Instant notifications](https://help.surveymonkey.com/en/surveymonkey/send/instant-notifications/)
