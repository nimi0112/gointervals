# Contributing

Go Intervals is a small static site with a strong opinion about how timers should behave. Contributions are welcome if they keep it that way.

## Before you start

Read `AGENTS.md`. It is short and it is the rulebook: design tokens, voice, timer engine invariants, SEO checklist, and the list of things this project will not do (dark mode, accounts, server code, cookies, third-party scripts).

## Setting up

```bash
git clone https://github.com/nimi0112/gointervals
cd gointervals
cp .env.example .env
npm install
npx playwright install chromium
npm run dev
```

## Making a change

1. Open an issue first for anything bigger than a typo, so the shape can be agreed before the work.
2. Branch from `main`.
3. Timer behaviour lives in `src/engine` and is pure. Write the unit test first, then the change.
4. Run the full chain before opening a PR:
   ```bash
   npm run lint && npm run typecheck && npm test && npm run build && npm run check:build && npm run test:e2e
   ```
5. Fill in the PR template. CI runs the same chain.

## What gets merged

- Bug fixes with a test that fails before and passes after.
- New preset pages with genuinely specific copy (see "Adding a programmatic page" in AGENTS.md).
- Blog posts that follow the voice guide and link to a timer.
- Accessibility and performance improvements that keep Lighthouse at 100.

## What does not

- Dark mode, themes, or `prefers-color-scheme` handling.
- Accounts, sync, or anything that needs a server.
- New dependencies without a one-line reason in `PLAN.md`.
- Audio files, icon fonts, animation libraries.
- Copy that reads like a content farm.

## Licence

MIT. By contributing you agree your work is released under it.
