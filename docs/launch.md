# GitHub Pages and WordPress migration

## Publish the prepared repository

Authenticate as Pujolsluis using `gh auth login --hostname github.com`. From this project, after reviewing the source:

```sh
gh repo create Pujolsluis/luciano-kitchens-and-closets --public --source=. --remote=origin --push
```

If the repository already exists, inspect it before setting the remote and pushing. Do not force-push over existing work. No DNS changes are needed to publish source.

The Actions workflow validates main-branch pushes and pull requests. Deployment is deliberately disabled until repository variable `PAGES_ENABLED` is `true`.

## Activate a GitHub Pages preview

1. In repository Settings → Pages, choose GitHub Actions as the source.
2. Set repository Actions variable `PAGES_ENABLED=true`.
3. Run the Pages workflow. The expected URL is `https://pujolsluis.github.io/luciano-kitchens-and-closets/`.
4. Leave `CUSTOM_DOMAIN` unset. Default site origin is `https://pujolsluis.github.io`; the workflow adds the repository subpath.
5. Verify both languages, gallery URLs, 404 behavior, and contact actions. The preview is public but marked noindex, with crawling disallowed, to avoid competing with WordPress. Analytics is disabled on github.io and localhost.

## Later: move the existing domain

Do this only when the new site and quote collectors have been accepted. Keep the current WordPress site operating until the checks below pass.

- Export WordPress content and database; back up themes, plugins, uploads, current DNS records, analytics settings, and any old redirects. The image manifest records the original URLs; this project already stores the migrated image files locally.
- Inventory additional indexed WordPress URLs with the current sitemap and Search Console. The known gallery paths `/2022/01/kitchens/` and `/2022/01/closets/` are preserved. Old theme anchor IDs have compatibility targets; any other important URLs need explicit static pages before cutover. GitHub Pages cannot implement arbitrary server-side 301 rules; do not add a fictional redirects file.
- Set repository Actions variables `SITE_ORIGIN=https://www.lucianokitchensandclosets.com` and `CUSTOM_DOMAIN=true`. The workflow clears the repository prefix for custom-domain builds. Keep these changes coordinated with Pages domain activation so links remain valid.
- Configure and verify the custom domain in GitHub Pages. Use GitHub's current documented domain verification and DNS records. Change only website-related records. Preserve MX, SPF, DKIM, DMARC, and all unrelated email/service records.
- Rebuild and deploy, verify HTTPS availability, and enable Enforce HTTPS. Check apex-to-www behavior using GitHub's domain configuration.
- Confirm canonical URLs, both language alternates, sitemap, robots, all local assets, real form submission, email notification delivery (if supported), and phone/email actions on the final domain.
- Submit the sitemap in Search Console and update the existing Business Profile website link only if needed. Neither account is modified by this implementation.
- Check analytics visits and phone/quote interactions. Opening a form is not a completed lead. The website does not observe cross-origin SurveyMonkey submissions; use SurveyMonkey response counts for completed inquiries. Avoid enabling Enhanced Measurement form/outbound collection that could forward arbitrary URLs or form data.
- Review 404 reports, survey availability, and lead delivery after launch. Keep WordPress backups and hosting until the migration has been verified.

## Rollback

Restore the saved website DNS records to WordPress if the new site cannot serve pages or receive inquiries. Preserve email records. Disable Pages deployment while correcting the issue; do not delete either source or the WordPress backup.

[GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
