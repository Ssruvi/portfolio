---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Home (portfolio)

Scope: the single-page portfolio at `/`. Visitor mode: Persuade (recruiters decide to interview; clients decide to make contact).

Audience and job: recruiters skimming many candidates want experience, proof and the résumé in seconds; freelance clients want shipped, openable work and a way to start a conversation.
Action: See projects / Contact me in the hero; Résumé in the nav; email-app contact form at the close.
Constraints (user-pinned, 2026-10-06): rebuild modeled on https://architjain-portfolio.vercel.app/ ("take this website as a reference and make it"), with sliding animations, hovers and cursor animations; professional and creative, no AI slop. User chose: keep Ssruvi's plum accent instead of the reference wine; contact form opens the visitor's email app (no backend); the reference's 3D ideas rebuilt lighter (2D canvas shard field, CSS 3D keyboard, CSS device mockups that tilt), no Three.js.
Replaces the earlier "Annotated Résumé" direction (seed a3f4af24); the reference pin beats the roll.
Build path: code-led.

## Direction contract

THESIS: A kinetic, scroll-choreographed portfolio in the reference's structure (loader, huge-name hero with the person standing in the name, about, skills keyboard, experience trail, education, horizontal project reel, GitHub, contact) carrying Ssruvi's facts and her plum. Refuses static card grids and skill-chip walls: every section has one interaction that proves something.

OWN-WORLD: True black ground with film grain; plum from her shirt (#8a3d63 field, #e2a6c4 text marks, plum light pools); bone ink #f3eef2, mauve-grey #b3a9b1. Archivo variable: heavy display for the name and section titles, normal width for body. Hairline rules, pill buttons, keycaps with real depth, CSS laptop frames around real screenshots. Custom cursor: dot plus lagging ring that grows and labels itself over interactive things.

STORY: Loader counts in; the name and portrait land; the visitor learns who she is, sees what she knows by playing the keyboard, follows her path on a drawn trail, scrolls sideways through five real projects, sees live GitHub repos, and writes to her.

FIRST VIEWPORT: "Ssruvi" across the full width in a white-to-plum fade, the cut-out portrait rising through the lower half of the name over a plum light, a shard field drifting behind that reacts to the cursor and to press-and-hold. "Rupani" bottom right; tagline plus See projects / Contact me bottom left; hint corner.

FORM: reference-pinned rebuild (not from the roll). Signature interactions: press-and-hold shard burst in the hero; skills keyboard (press keys or type a letter); scroll-drawn experience trail; pinned horizontal project reel with cursor-tilted laptops. Motion grammar: slides from below and from the sides, staggered; lerped cursor; Lenis smooth scroll; all of it off under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Ssruvi's role and stack on CreatorZ and Velora Journeys.
- Domain.
