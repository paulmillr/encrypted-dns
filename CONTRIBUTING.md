# Contributing

Run `npm --prefix src/scripts ci` from the repository root to install the tooling.

To add or edit a provider:

1. Edit its file in `src/`, or create one with `npm --prefix src/scripts run new`. Take addresses and hostnames from the provider's own docs.
2. Run `npm --prefix src/scripts run build` to regenerate profiles and READMEs.
3. Run `npm --prefix src/scripts run check -- <provider>` to confirm every server answers with a valid certificate.
4. Run `npm --prefix src/scripts run format` and open a pull request. The maintainer signs new profiles.

Custom ports in `ServerURLOrName` are ignored: DNS over HTTPS always uses port 443 ([#58](https://github.com/paulmillr/encrypted-dns/discussions/58)). Field reference: [Apple DNSSettings](https://developer.apple.com/documentation/devicemanagement/dnssettings).

**Skip trusted Wi-Fi networks:** add your SSIDs to `OnDemandRules` in an unsigned profile, as in [this template](https://github.com/paulmillr/encrypted-dns/blob/master/profiles/template-on-demand-default-https.mobileconfig). Editing a signed profile breaks its signature.

## Translating

Translations live in three places. Run `npm --prefix src/scripts run build` after editing; it regenerates `translations/<code>.md`.

- `src/languages/<code>.json`: interface words such as column names, filter tags, and `operated_by` (for example `"by {operator}"`). Every file must have the same keys as `en.json`; the build names any missing or extra key.
- `src/languages/<code>.md`: the README text. Keep the same headings, lists, links, and code spans as `en.md`; `npm --prefix src/scripts test` checks this.
- `src/*.json`: per provider, `tableNote` holds extra information shown in the table. `operator`, `names`, and `tableName` are names: add a translation only where the name itself differs, such as `"Wikimedia Foundation"` in Chinese. The build warns about table notes that still fall back to English.

To add a language, copy `en.json` and `en.md` to `<code>.json` and `<code>.md`, set `code` and `name`, and translate.

## Other scripts

- `npm --prefix src/scripts test` runs unit tests and a parity check of `sign-single.ts` against OpenSSL (`sign-single-openssl.sh`). `NEW_TEST_PTY=0` skips the interactive test.
- `npm --prefix src/scripts run check:censorship` looks up commonly censored domains through every profile and compares with unfiltered resolvers. Options include `--list global,cn,ru`, `--limit 200`, and `--json out.json`. Results depend on where it runs.
- `node src/scripts/sign-single.ts --ca cert.pem --priv_key key.pem [--chain chain.pem] file.mobileconfig`: signs one profile with your own certificate.

## Signing (maintainer)

On the signing Mac, install the tooling as above, then run `npm --prefix src/scripts run sign -- "/path/to/developerID_application.cer"` (a unique Keychain certificate name also works). Commit `src/profile-signer.pem`, `signed/`, and the READMEs together. Later builds verify signatures against that certificate. Before publishing with a new identity, check that the signer shows as verified in the iOS and macOS profile previews.
