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

## 2026-11-23 (evening): Proposal and scope

**Worked on**
- Collected the real data for the proposal: my 5 courses, the timetable and the grading weights from my.uacs, topic lists from the Moodle course pages, and the finals week (Jan 18–25, 2027), reading week and holidays from the academic calendar.
- Wrote `PROPOSAL.md`.

**Decisions**
- I came up with a lot of extra feature ideas: phone reminders, a GPA / "what grade do I need" calculator, projects with deadlines, a readiness traffic light, generated practice questions, a relax zone with games unlocked by a study timer, a music player. I sorted them into must / nice / later, because the guidelines warn about projects that are too big for the timeline, and the grade depends on one hard part I can explain.
- The GPA calculator and the readiness colours went into **must have**. They're pure logic built on real grading weights, so they're testable and actually useful.
- **Phone reminders:** start with a Google Calendar `.ics` export, because Google Calendar already notifies the phone. A Telegram/Discord bot needs a server (a scheduled job plus a secret bot token), so it moved to later.
- **AI-generated questions:** later. They'd need a server-side proxy, because an API key in frontend code is public (Lecture 05). Self-written flashcards come first.
- **Wordle / Krillion / -dle games:** these sites block being embedded in an iframe, so they'll be styled launch cards that open in a new tab. Minesweeper and the cipher puzzles I build myself.
- **Music:** YouTube/Spotify embeds first. Full Spotify login needs OAuth, a registered app and Premium, so that's a stretch goal.
- I won't put real grades in the repo (it's public). The preset only has course names, the timetable and the grading weights, which are the same for everyone in my year.

**Open question**
- I need to check the exact UACS grading scale (points → letter → GPA) before building the GPA calculator.

## 2026-11-23 (late): The UACS grading scale

**Found:** the official table at https://uacs.edu.mk/grading-system

| Letter | Percent | MK grade | GPA |
|---|---|---|---|
| A | 96–100 | 10 | 4.00 |
| A– | 90–95 | 10 | 3.67 |
| B+ | 87–89 | 9 | 3.33 |
| B | 83–86 | 9 | 3.00 |
| B– | 80–82 | 8 | 2.67 |
| C+ | 77–79 | 8 | 2.33 |
| C | 73–76 | 7 | 2.00 |
| C– | 70–72 | 7 | 1.67 |
| D+ | 67–69 | 6 | 1.33 |
| D | 63–66 | 6 | 1.00 |
| D– | 60–62 | 6 | 0.67 |
| F | 0–59 | 5 | 0.00 |

Quality points = course credits × GPA value. All five of my 5th-semester courses are 6 ECTS.

**Checked against my own transcript on my.uacs** (grades not copied anywhere, only the formulas):
- QP is the exact product (6 × 3.33 = 19.98). The table on the website rounds it (it shows "20"), so the calculator should not copy the table's QP column.
- **Surprise:** the GPA that my.uacs shows is the plain average of the course GPA values, not total QP ÷ total credits. It only makes a difference when a course isn't 6 ECTS (Macedonian Language is 2 ECTS), but there the results differ. The policy page suggests credit-weighting.
- A failed course that was retaken in the make-up session counts only with its new grade. The F attempt drops out of the averages.
- Percentages are shown as whole numbers, so the final percentage is probably rounded before the letter is assigned. I'm not sure whether it rounds or truncates.
- The "Grade 5–10" average on the transcript doesn't match a simple average of the mapped MK grades. I couldn't work out how it's calculated, so it's out of scope for now.

**Decisions**
- The calculator uses this table as a typed constant (`GRADE_SCALE`), with the percent→letter mapping as a pure function and unit tests at every boundary (59/60, 62/63, 95/96, …).
- **Default GPA mode is the one my.uacs shows (plain average)**, because that's the number students see and will compare against. The credit-weighted mode is a setting. Both get tests that reproduce real transcript totals.
- Before relying on it, I'll ask at the student office (or the professor) which GPA formula is official, and whether final percentages are rounded or truncated.

## 2026-11-23 (night): Deployed early

**Worked on**
- Added `netlify.toml` (build command, publish folder `dist/cramless/browser`, Node 24, and a `/* → /index.html` rewrite so deep links don't 404). Connected the repo on Netlify; every push to `main` now deploys.
- Live at https://cramless-uacs.netlify.app. Checked with curl: `/`, `/courses/3` and a made-up path all return the app (200), and `favicon.ico` still comes back as an image, so real files aren't swallowed by the rewrite.

**Got stuck / surprises**
- `cramless.netlify.app` was already taken, so the site is `cramless-uacs`.
- The first deploy was **private** by default (401, Netlify login page). New Netlify projects start team-only now. I switched the visibility to Public in the project settings, because the guidelines say the app must be publicly reachable. Lesson: check the live URL from outside the account (curl or a private window), not only in the dashboard preview.
- Netlify auto-detected Angular and added `@netlify/angular-runtime`. The app has no SSR, so it's not needed. I'll check whether it can be removed without breaking the build.

**Decisions**
- Netlify instead of GitHub Pages: the SPA fallback is one rule in a committed file (on Pages it needs a `404.html` copy trick), and there are preview deploys for pull requests.
- The build config lives in `netlify.toml` in the repo, not only in the dashboard, so it's versioned and reviewable.

## 2026-11-23 (late night): Host credits, empty shell

**Hosting**
- Found out Netlify's free plan is credit-based: 300 credits a month, **15 per production deploy**, so about 20 deploys a month. When they run out, every site on the account is paused. With small, frequent commits that would last about a week. Staying online costs almost nothing; deploys are what cost.
- Decision: move to **Vercel** (free Hobby plan: deploys don't cost credits, up to 100 a day). Added `vercel.json` with the same build and an `index.html` rewrite for deep links. I haven't imported the project on Vercel yet; its first deploy will be the first real feature.
- In the meantime I **stopped builds on Netlify**. The current version stays live, so the professor can review that link, but pushes no longer cost credits (270/300 left). I'll switch the README link after the review.

**Shell**
- Removed the `ng new` welcome page (and `app.html`/`app.css`). The root component is now an inline-template shell: header, one `<main>` with `<router-outlet>`, a footer, and a skip link for keyboard users.
- Kept it deliberately empty. No nav links or routes until the proposal is approved, because those depend on which features he accepts.
- Global styles: colour tokens for light and dark mode, and a visible `:focus-visible` outline (accessibility is graded).
- The generated test checked for "Hello, cramless" and would have broken. I replaced it with 3 tests on the shell: the brand in the header, exactly one `<main>` containing the router outlet, and the skip link pointing at `#main`.
- Checked in the browser: dark and light mode, phone width, the skip link appears on the first Tab, no console errors.
