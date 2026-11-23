# Cramless: development log

Short entries, written as I go. What I did, what I decided (and what I rejected), where AI helped or got it wrong, and where I got stuck.

## 2026-11-23: Picking the idea, scaffolding

**Worked on**
- Read through the course repo (Lectures 01–09) and the project guidelines, so I know what's graded: the process (git history, this log, the checkpoint, the change request) is 30%, and the "hard part" is 20%.
- Picked the project: **Cramless**, a study planner for the January exam session. You enter your courses, exam dates, topics and free time, and it builds a day-by-day study plan, then re-plans when you miss a session.
- Scaffolded the app with `ng new` (Angular 22, zoneless, CSS, no SSR, Vitest) and committed it untouched, so the history starts from zero.
- Added my own project rules to `CLAUDE.md` / `AGENTS.md`, on top of the Angular best practices that `ng new` generated.

**Decisions**
- Ideas I rejected:
  - *A 5-a-side team balancer with Elo ratings*: fun, but I'll actually use the planner during the exam session, so I can test it on my own real schedule.
  - *A Skopje air-quality dashboard*: depends on an external sensor API whose access I hadn't checked, and it could end up as "just charts".
  - *A real-time multiplayer quiz*: real-time sync bugs could eat the whole schedule.
  - *A bank-CSV budget tracker*: it's one of the guideline's own examples, so it's less original.
- Name: I first called it "Sesija" (Macedonian for exam session), then changed it to **Cramless** so students who don't speak Macedonian understand it.
- Angular instead of React/Vue, because it's what we covered and what I'll be asked about in the defense.
- localStorage first, behind one storage service. It's personal data, and the service means I can switch to Supabase if the change request needs sharing or a second user.
- The planning algorithm will be pure TypeScript with no Angular imports, so I can unit-test it on its own. That's the hard part of the project.

**AI**
- I'm using Claude Code (an agent). It read the course repo with me, suggested the project ideas and a timeline, and ran the scaffold.
- The GitHub connector Claude used couldn't create the repo (403, "Resource not accessible by integration"), so the repo was created through the GitHub website instead, and pushing over git worked normally.
- I put a rule in CLAUDE.md that the agent doesn't commit on its own. I review the diffs and make small commits, so the history shows my steps.

**Next**
- Write the proposal and send it by Nov 27.
- Write down my real courses and exam dates, to use as the first test data for the planner.
