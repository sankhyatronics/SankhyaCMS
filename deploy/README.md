# Redirects for the old SankhyaUI subdomains

The docs and Storybook moved to the Sankhyatronics docs hub:

- Docs: https://docs.sankhyatronics.com/sankhya-cms/ (was `sankhyaui.sankhyatronics.com`)
- Storybook: https://docs.sankhyatronics.com/sankhya-cms/storybook/ (was `sankhyaui-stories.sankhyatronics.com`)

The `.htaccess` files here send every path on the old hosts to the matching path on the new one with a 301.
They are not part of the CI deploy (`.github/workflows/sites.yml` only uploads the new sites), so upload them by hand:

- `sankhyaui.htaccess` → rename to `.htaccess` in the `public_html` of the `sankhyaui.sankhyatronics.com` account.
- `sankhyaui-stories.htaccess` → rename to `.htaccess` in the `public_html` of the `sankhyaui-stories.sankhyatronics.com` account.

Do not upload them into the new `public_html/sankhya-cms/` tree, since the Docs deploy's clean slate would replace them.
