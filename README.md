# Cramless

A study planner for the exam session. It turns your courses, deadlines and free time into a day-by-day study plan.
Internet Programming project, UACS 2026. See [PROPOSAL.md](PROPOSAL.md) for the plan and [DEVLOG.md](DEVLOG.md) for how it's being built.

**Live app:** https://cramless-uacs.netlify.app

> Work in progress: right now this is the bare Angular scaffold.

## Running locally

Requires Node.js 24 and npm.

```bash
npm install
npm start                   # dev server at http://localhost:4200
npm test -- --watch=false   # unit tests (Vitest), single run
npm run build               # production build in dist/cramless/browser
```

## Deployment

Netlify builds and deploys every push to `main`, using the settings in [netlify.toml](netlify.toml) (Node 24, `npm run build`, publishing `dist/cramless/browser`).
The `/* → /index.html` rewrite in that file makes deep links and page refreshes work with the Angular router instead of returning a 404.

## AI usage

To be completed as the project goes. So far:
- **Claude Code** (agent): read the course materials with me, helped brainstorm and scope the project idea, ran `ng new`, wrote the first drafts of the proposal and DEVLOG entries (which I reviewed and edited), and set up the Netlify config. Project rules for the agent are in [CLAUDE.md](CLAUDE.md) / [AGENTS.md](AGENTS.md).
