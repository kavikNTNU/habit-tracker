# Project: Habit & Goal Tracker

## About me
- Studying data technology, specializing in software development
- Has written code for school projects, but mostly AI-generated — wants to actually understand what the code does
- Comfortable using a terminal / command line
- Motivated by an eventual project-based developer career; initial excitement around coding (5 years ago) has faded somewhat and this project is partly about rebuilding that interest
- Juggles a lot of personal consistency goals: health routines, reading, training, coding practice, language/skill learning — and is curious about market/trend data (crypto, real estate, AI trends)

## The idea
A web app to track daily habits (like drinking water, doing pushups) and log progress toward personal goals in one place, instead of keeping it all in your head across five different mental checklists.

## MVP
### In
- Create a habit or goal (name + how it's measured: yes/no, or a quantity like glasses of water or hours)
- Mark it done / log a value, once a day
- See a simple list or calendar view of recent history per habit
- One user (you) — login can be dead simple

### Parking lot (v2)
- ~~Streaks~~ — done (section 12)
- Stats, charts — scoped into section 15
- Weekly goals (hours/week) vs. daily habits — different logic, comes later — scoped into section 18
- Reminders/notifications — scoped into section 19
- Multiple habit types with custom units — scoped into section 17
- Sharing/multi-user — scoped into section 20
- Link to external sources (articles, research, recommendations) for good routines/habit-building — scoped into section 16
- Restructure the page into distinct layout sections (e.g. a dedicated panel/sidebar listing all habits' resource links, separate from the per-habit cards) — raised 2026-08-11 during section 16, not yet thought through; section 16 itself stays simple (per-habit, inline) for now

## The trunk — core components

### Source control (git)
The save-and-undo system professionals use. Every change gets a checkpoint you can go back to. In from day one, even before there's real code.

### Frontend
The part you actually see and click: the buttons, the list of habits, the "mark done" checkbox. Turns the idea into something usable instead of just data sitting somewhere.

### Backend
The logic running behind the scenes: deciding whether a habit entry is valid, saving it, fetching history. It has no visual form of its own — it would still work if tested with raw requests and no interface at all.

### Database
Where habit data actually lives permanently. Without it, everything logged would vanish the moment the browser tab closes.

### API (how frontend and backend talk)
An agreed-on set of requests, like "save this habit entry" or "give me my last 7 days," that the frontend sends and the backend answers. The shared language between the two halves.

### Authentication
How the app knows it's you logging in, so your data isn't public or mixed up with someone else's. Simple for the MVP, but needed even for a single user.

### Local development environment
Where the code is written and run on your own machine before anyone else can see it. The workshop, separate from the live version.

### Deployment
How the app moves from "only works on my laptop" to actually live on the internet, so a habit can be checked off from a phone. What makes it a real product, not a demo.
