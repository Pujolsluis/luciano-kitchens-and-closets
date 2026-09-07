import surveys from '@/config/surveys.json';
import { content } from '@/lib/content';
import { path, type Language } from '@/lib/site';
export function Survey({lang}: {lang: Language}) {
 const settings = surveys[lang];
 const c = content[lang];
 if (!settings.url && !settings.embedFile) return null;
 return <div className="survey">
  {settings.embedFile && <iframe className="survey-frame" src={path(settings.embedFile)} title={c.survey} loading="lazy" />}
  <p>{c.surveyHint}</p>
  {settings.url && <a className="text-link" href={settings.url} target="_blank" rel="noopener noreferrer" data-track="quote_open">{c.surveyLink} ↗</a>}
 </div>;
}
