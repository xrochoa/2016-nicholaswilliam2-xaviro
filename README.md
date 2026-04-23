# Nicholas William 2.0 (2016)

A single-page ecommerce site built in **2016** for a small, independent t-shirt
label called *Nicholas William*. The site presents a catalog of hand-drawn
shirt designs, lets visitors pick a size and color, manages a cart in local
storage, and processes card payments through Stripe Checkout.

This repository is part of a long-running portfolio that tracks the evolution
of the author's engineering career. It has been lightly refactored for 2025
tooling (Node 20, Gulp 4, Babel 7, Dart Sass) so that it installs, runs and
deploys cleanly, while keeping the **original 2016 architecture intact** —
React 15 class components, Flux dispatcher / store pattern, `react-router` 2
with `browserHistory`, SCSS modules, and a Browserify + Gulp build pipeline.

## Purpose and features

- Shirt catalog loaded from a JSON "API" (originally Firebase; now a local
  file that preserves the exact same data shape).
- Shirt detail view as a modal with per-item size and color pickers.
- Cart stored in `localStorage` and synchronized through a Flux dispatcher
  and an `EventEmitter`-based store.
- Checkout powered by `react-stripe-checkout`, posting to a `/savetoken`
  endpoint that historically created real Stripe charges.
- Thank-you and error modals for the post-payment flow.
- Fully responsive, entirely hand-rolled CSS, with CSS transitions used for
  the "animate in" effects across the UI.

## Technologies

- **React 15.6** + **react-router 2** (class components, `browserHistory`)
- **Flux** (dispatcher + `EventEmitter` store pattern)
- **react-stripe-checkout** (Stripe token generation on the client)
- **Gulp 4** build pipeline with **Browserify** + **Babelify** (Babel 7,
  `@babel/preset-env` + `@babel/preset-react`)
- **Dart Sass** (via `gulp-sass`) + **Autoprefixer** + **clean-css**
- **BrowserSync** for the dev server and live reload
- **Netlify Functions** for the server-side `/savetoken` endpoint (replaces
  the original Express server)

## What this demonstrates at this stage of the career

- Comfort assembling a small, modern-for-2016 JS stack from primitives:
  explicit bundler, transpiler, task runner and dev server (before
  Create React App / Next.js dominated the space).
- Understanding of client-side state management with the original Flux
  pattern, local storage as a persistence layer, and event-driven view
  updates.
- SPA routing with nested routes and route-as-modal composition.
- Third-party payment integration (Stripe) and a minimal server-side
  component to protect the secret key.
- Hand-written responsive CSS, animations, and layout without a component
  or utility framework.

## Project year

**2016** — the year of the original build. This is preserved in the footer
copyright line, in the `<meta>` tags and in this README. No visual design
changes have been made beyond small hygiene fixes.

## Run locally

Prerequisites: **Node 20** (an `.nvmrc` is provided).

```bash
nvm use          # optional, picks up .nvmrc
npm install
npm run dev      # builds and starts BrowserSync on http://localhost:3001
```

`npm run dev` (alias `npm start`) runs the full Gulp pipeline, copies assets,
compiles SCSS, bundles the JS with Browserify + Babel, starts BrowserSync
with a history-API fallback (so `react-router` deep links work), and mocks
the `/savetoken` endpoint locally with a success response — no Stripe calls
are made in development.

To produce a production build only:

```bash
NODE_ENV=production npm run build
```

The output is emitted to `./dist`.

## Deploy on Netlify

This project is preconfigured for Netlify via `netlify.toml`:

- `command = "npm run build"`
- `publish = "dist"`
- `functions = "netlify/functions"`
- SPA fallback: `/* -> /index.html  200`
- API rewrite: `/savetoken -> /.netlify/functions/savetoken  200`

### One-time setup

1. Push this repo to GitHub / GitLab / Bitbucket.
2. In Netlify, **Add new site → Import an existing project** and select the
   repo. Netlify will detect `netlify.toml` and use its settings as-is.
3. (Optional) Set `STRIPE_SECRET_KEY` as an environment variable in
   **Site settings → Environment variables** if you want real Stripe test
   charges to be created. Without it, the checkout flow runs in demo mode
   and simply redirects to the thank-you screen.
4. Deploy.

### Or via the Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --build            # preview deploy
netlify deploy --build --prod     # production deploy
```

## Project structure

```
src/
  index.html                 # app shell
  app/
    main.jsx                 # app entry, router config
    react-globals.js         # exposes React/ReactDOM as window globals (era-accurate)
    dispatcher.jsx           # flux dispatcher singleton
    actions/cart.actions.jsx # flux action creators
    stores/cart.store.jsx    # flux store (localStorage-backed cart)
    core/                    # nav, footer, modal shell
    shirts/                  # catalog, detail modal, color / size pickers
    cart.component.jsx
    checkout.component.jsx   # react-stripe-checkout integration
    about.component.jsx
    contact.component.jsx
    thankyou.component.jsx
    error.component.jsx
  assets/
    img/                     # logo, icons, shirt template
    res/shirts.json          # catalog data (previously a Firebase endpoint)
    res/sketches/            # per-shirt SVG design overlays
    scss/                    # partials: normalize, utils, main, modals, responsive
netlify/
  functions/savetoken.js     # server-side Stripe handler
gulpfile.js                  # build pipeline (Gulp 4)
netlify.toml                 # Netlify build + redirects
```

## License

MIT — see `package.json`.
