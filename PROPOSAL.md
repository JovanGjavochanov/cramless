# Project proposal: Cramless

**Course:** Internet Programming, UACS, Fall 2026
**Student:** Jovan Gjavochanov
**Repository:** https://github.com/JovanGjavochanov/cramless

## What I'm building, and who it's for

Cramless is a study planner for the exam session. It's for me and my colleagues in the 5th semester of Computer Science at UACS: we take the same courses, have the same timetable, and face the same finals week (**January 18–25, 2027**).

You tell it your courses and topics, your projects and their deadlines, how well you know each subject and how hard it is for you, and when you're actually free. It then builds a day-by-day study plan up to the exams and re-plans when you skip a session. As the exams get closer, every course is marked **green, yellow or red** depending on how ready the app thinks you are.

I'll use it myself this session, with my real data:

| Course | Topics already on Moodle (examples) |
|---|---|
| CSCI-3401 Data Security | lessons 1–8, practical exercises |
| CSCI-3511 Databases 2 | advanced ER modelling, multidatabase integration, distributed and parallel DBs, P2P, web data, big data, NoSQL/NewSQL |
| CSCI-3701 Internet Programming | JS, TypeScript, async/fetch, Angular, signals, services, routing |
| CSCI-3711 Virtualization and Container Systems | VM fundamentals and management, Docker, Kubernetes |
| CSCI-3801 Architecture and Design of Software Systems | UML, architectural styles, quality attributes (availability, usability, deployability, testability, safety, security) |

Free time is set per person, because it's different for everyone. Mine, for example: weekday time around the timetable (Mon 15:30–21:00, Tue 16–18, Wed 16–20, Thu 9–13:30, Fri 17–21), and on weekends only until about 20:00–21:00.

## Features

### Must have
1. **Courses, topics and projects**, with exam dates and project deadlines. It comes with a ready-made *UACS CS 5th semester* preset (courses, timetable and academic calendar), so a colleague can start in a minute instead of typing everything in.
2. **Self-assessment.** For every course and topic: "how well do I know this?" and "how hard is it for me?"
3. **Personal availability editor.** Weekly free-time blocks plus one-off busy days. University holidays and the winter break come from the academic calendar.
4. **The plan.** Study sessions generated across courses and projects, shown as a week calendar and as a per-course list. Sessions can be marked done or missed, and the plan re-balances.
5. **Readiness traffic light.** Each course is green, yellow or red, based on the remaining work, the time left before its exam, and the self-assessment.
6. **Grade and GPA calculator.** Each course's real grading components and weights (e.g. Project 40%, Midterm 25%, Final 25%, Attendance 10%). Enter the scores you already have and see what you need on the remaining parts to reach a target grade, and which courses matter most for a target GPA.
7. **Focus timer with a relax zone.** A study/break timer (Pomodoro-style: 25 min study / 5 min break, a longer break after 4 rounds, adjustable to 50/10). The relax zone only unlocks during breaks and locks again when the break is over, so it can't eat the whole evening. It has one built-in game at the start: **Minesweeper**.

### Nice to have (if time allows, roughly in this order)
- **Music dock.** A floating YouTube/Spotify player you can drag, resize or hide. Hidden, it docks to the edge of the screen as a small tab that slides out on hover. Saved playlists. (Plays through the official embeds; full account login is a stretch goal.)
- **Drag-and-drop rescheduling** in the calendar, with a keyboard alternative
- **Self-test flashcards** per topic. Your quiz results feed into the readiness score.
- **Study resources per topic**: your own links, plus quick search buttons (YouTube, Wikipedia, docs) built from the topic name
- **More relax-zone games**: cipher puzzles (Caesar/Vigenère, decode a message), and styled launch cards for daily web games such as Wordle, Krillion and "-dle" games picked from the games you say you play (Pokedle, Dotadle, …). Those sites can't be embedded, so they open in a new tab.
- **Reminders on your phone** by exporting the plan to Google Calendar (`.ics`), which already sends phone notifications
- Charts: planned vs. done hours, a countdown to each exam

### Stretch goals / later
- Telegram or Discord reminder bot (needs a small serverless function for scheduling and for keeping the bot token secret)
- AI-generated practice questions from the topic list (needs a server-side proxy so no API key ships to the browser)
- Shared plans for study groups (Supabase)

## Technologies, and why

- **Angular 22 + TypeScript.** It's what we covered in class: signals for state, standalone components, the router with parameter routes and lazy-loaded sections.
- **State in services** (a private signal, a read-only view, immutable updates), the pattern from Lecture 09. The app has a few clearly separate domains (courses, plan, grades, timer), so services per domain are enough. A store library would be overkill.
- **Signal Forms** for the course, topic and grade forms
- **Angular CDK** for the drag-and-drop calendar and the draggable music dock
- **Vitest** for unit tests. The planner, the readiness score and the grade calculator are pure functions, so they're easy to test properly.
- **localStorage** behind one storage service, plus JSON import/export. Plans and grades are personal, so they stay on the user's device. Because storage goes through one service, it can be replaced by Supabase if sharing becomes a requirement.
- **Netlify** for hosting (free, auto-deploy from `main`, SPA fallback for deep links)

## The hard part

**The planning algorithm and its readiness model.** It has to:
- spread the estimated hours of all topics and project tasks over the limited free-time blocks, before different deadlines;
- weight them by how hard each subject is and how well I already know it;
- put review sessions close to each exam instead of finishing a course weeks early;
- re-plan *stably*: missing or moving one session must not reshuffle the whole week;
- compute the green/yellow/red readiness from what's planned vs. what's done vs. the time left.

My approach: start with a simple greedy earliest-deadline-first version, write tests from my real schedule (five exams in one week, a 40% Internet Programming project due Dec 27), find where it gives bad plans, and then improve it step by step (weights, review sessions, pinned sessions). Each version and its failures go into the DEVLOG. The algorithm lives in plain TypeScript with no Angular code, so it can be tested and explained on its own.

## Where the data comes from

- **Real course data:** my 5th-semester courses, the timetable and the grading components from my.uacs, the topics from the Moodle course pages, and the exam period, reading week and holidays from the UACS academic calendar. These are prepared once as a JSON preset that ships with the app.
- **User data:** each user's own availability, self-assessment, scores and progress, saved in their browser (localStorage), with JSON export/import for backups
- **External services** (nice-to-have only): YouTube/Spotify embeds for music, and links out to the web games
