# Acceptance checks

## Implementation verification

- Production builds and static checks passed for both the custom-domain root and the GitHub Pages repository subpath: eight pages and 308 local URL references per build.
- Desktop home inspected at 1440px; Spanish home inspected at 375px; gallery checked at 768px. No horizontal overflow was detected in those checks.
- The Spanish gallery was tested from the plain static export under the repository prefix. Images loaded, the photo dialog opened, and no browser warnings/errors were reported during the interaction.
- Keyboard Enter opened a gallery photo; Escape closed it and returned focus to the triggering image.
- Local analytics was confirmed absent. Live-domain analytics, 200% text enlargement, and real SurveyMonkey submissions remain launch acceptance checks.

Automated checks: `npm run typecheck`, `npm run lint`, `npm run build`, `npm test`.
Run build and test once with the repository subpath, then once with the custom-domain origin and empty base path. Only `dist/client` is deployable.

## Site

- English home and Spanish home have matching sections and correct document languages. Switching language preserves the gallery or privacy page being viewed.
- Both existing English gallery URLs and their Spanish equivalents work on direct entry and reload.
- At 375px, 768px, and desktop widths: no horizontal overflow, cropped text, or overlapping contact bar; images retain their intended proportions.
- At 200% text enlargement, text and calls to action remain readable.
- Keyboard: skip link, navigation, contact actions, and gallery images are reachable with visible focus. A gallery photo opens in a named dialog; Escape closes it and focus returns to the triggering photo.
- Reduced-motion preference disables decorative transitions and smooth scrolling.
- All photos and the logo load from local assets, with useful translated alternative text. No fictional project locations or generated portfolio images.
- Phone links point to +18637328482. Email links point to info@lucianokitchensandclosets.com.
- Metadata includes one H1 per page, a canonical URL, reciprocal en/es and x-default annotations, and accurate business data without invented ratings or addresses.
- A missing page returns the static 404 page and usable language-specific home links.

## Quote forms

- Empty configuration: phone/email work and no inactive submit control is displayed.
- With approved test collectors: both localized forms load, required fields validate, optional fields stay optional, and submissions reach the correct SurveyMonkey account.
- Blocked embed or JavaScript: direct survey link and contact alternatives remain available.
- Verify account-supported response notifications separately. No claim of successful delivery until receipt is checked.

## Analytics and privacy

- No analytics on localhost or github.io.
- On the business domain: existing measurement ID loads once, Do Not Track is respected, and only allowed contact-interaction events are sent.
- No names, emails, phone numbers, message content, query strings, or URL fragments enter event payloads.
- No “completed lead” event on survey opening.
- No credentials or customer responses are committed to the public repository.
