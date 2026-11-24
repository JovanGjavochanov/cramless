# Cramless

A study planner for the exam session. It turns your courses, deadlines and free time into a day-by-day study plan.
Internet Programming project, UACS 2026. See [PROPOSAL.md](PROPOSAL.md) for the plan and [DEVLOG.md](DEVLOG.md) for how it's being built.

**Live app:** https://cramless-uacs.vercel.app

> Work in progress: right now this is an empty app shell; features start after the proposal is approved.

## Running locally

Requires Node.js 24 and npm.

```bash
npm install
npm start                   # dev server at http://localhost:4200
npm test -- --watch=false   # unit tests (Vitest), single run
npm run build               # production build in dist/cramless/browser
```

## Deployment

Vercel builds and deploys every push to `main`, using the settings in [vercel.json](vercel.json) (`npm run build`, publishing `dist/cramless/browser`).
The rewrite to `/index.html` in that file makes deep links and page refreshes work with the Angular router instead of returning a 404. Real files (JS, CSS, the favicon) are served before the rewrite applies.

The project was first hosted on Netlify (https://cramless-uacs.netlify.app). That copy is frozen at an early version and is no longer updated; see the DEVLOG entries from 2026-11-23 and 2026-11-24 for why it moved.

## AI usage

To be completed as the project goes. So far:
- **Claude Code** (agent): read the course materials with me, helped brainstorm and scope the project idea, ran `ng new`, wrote the first drafts of the proposal and DEVLOG entries (which I reviewed and edited), set up hosting (Netlify, then Vercel), and replaced the scaffold welcome page with an empty app shell. Project rules for the agent are in [CLAUDE.md](CLAUDE.md) / [AGENTS.md](AGENTS.md).
