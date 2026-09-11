# Security

Go Intervals is a static site with no server, no accounts and no user data leaving the browser. The attack surface is small, but not zero: the service worker, the content security policy in `public/_headers`, and anything that reads `localStorage`.

If you find a problem, email the maintainer at the address on the GitHub profile rather than opening a public issue. You will get a reply within a few days. Once fixed, the report is credited in `CHANGELOG.md` unless you prefer otherwise.
