---
name: Ssruvi Rupani
description: A kinetic, scroll-choreographed portfolio in plum on true black.
colors:
  black: "#000"
  panel: "#120c11"
  panel-2: "#1a1218"
  ink: "#f3eef2"
  ink-2: "#b3a9b1"
  ink-3: "#8a8089"
  rule: "rgb(243 238 242 / 0.12)"
  rule-strong: "rgb(243 238 242 / 0.26)"
  plum: "#8a3d63"
  plum-lift: "#9c4772"
  plum-deep: "#5e2343"
  plum-hi: "#e2a6c4"
  error: "#ffb3c1"
typography:
  display:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(6rem, 21.5vw, 22rem)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.055em"
    fontVariation: "'wdth' 108"
  display-outline:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 9vw, 8.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.4vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 112"
  statement:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 3.1vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  lede:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
    fontFeature: "'tnum'"
  micro:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  focus: "4px"
  key: "10px"
  readout: "16px"
  repo: "18px"
  card: "20px"
  panel: "22px"
  contact: "32px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  section: "clamp(5.5rem, 11vw, 9.5rem)"
  max: "90rem"
  chip-gap: "0.5rem"
  grid-gap: "1.5rem"
  column-gap: "2.5rem"
  block: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "#fff"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.plum-lift}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3rem"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.black}"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "0 1.125rem"
    height: "2.5rem"
    typography: "{typography.label}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1.1rem"
    typography: "{typography.label}"
  chip-selected:
    backgroundColor: "{colors.plum}"
    textColor: "#fff"
  tag:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.75rem"
    typography: "{typography.micro}"
  card-timeline:
    backgroundColor: "rgb(18 12 17 / 0.7)"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1.75rem 1.75rem 1.5rem"
  card-repo:
    backgroundColor: "transparent"
    rounded: "{rounded.repo}"
    padding: "1.375rem 1.5rem"
  card-repo-hover:
    backgroundColor: "{colors.panel}"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "0"
    padding: "0.625rem 0"
    typography: "{typography.lede}"
  nav:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    padding: "1rem clamp(1rem, 4vw, 3.5rem)"
  nav-scrolled:
    backgroundColor: "rgb(0 0 0 / 0.94)"
  keycap:
    backgroundColor: "#2c2329"
    textColor: "{colors.ink}"
    rounded: "{rounded.key}"
    padding: "0.5rem 0.65rem 0.55rem"
    height: "4.25rem"
  keycap-active:
    backgroundColor: "#a44f7a"
    textColor: "#fff"
---

# Design System: Ssruvi Rupani

## Overview

**Creative North Star: "The Plum Stage"**

The site is a stage lit in one colour. True black is the house, her plum is the light, and everything moves when the visitor does: the name lands, the portrait rises through it, shards drift behind, sections slide in, the trail draws itself, the project reel turns sideways. It is built on the structure of a reference portfolio (loader, huge-name hero, about, keyboard, trail, education, horizontal reel, GitHub, contact) and carries Ssruvi's facts and her colour, taken from the shirt in her portrait.

Density is generous and cinematic: full-bleed sections with a 90rem container, heavy expanded headings, wide gutters, and one interaction per section that proves something (press-and-hold burst, a playable keyboard, a scroll-drawn trail, tilting laptops). Depth is real where the object is real (keycaps, laptop frames, the shard field) and otherwise conveyed with plum light pools and hairlines on black.

Archivo's width axis carries the hierarchy alone. Everything heavy is expanded; everything read is normal width. Motion is choreographed but always optional: every movement is removed under reduced motion and the page still reads complete.

**Key Characteristics:**
- True-black ground (#000) under a 7% film grain, with plum as the only chroma.
- One variable family, Archivo, with the width axis as the display/body switch.
- Pill buttons with a fill that slides up, magnetic pull, and a lagging cursor ring.
- Physical depth only on physical objects: keycaps, laptop frames, the shard field.
- Plum light pools (radial gradients) as atmosphere behind the hero, cards on hover, the sheet and the contact panel.
- Every motion choreographed on one ease and fully off under reduced motion.

## Colors

One plum hue in four strengths on true black, with bone-white and mauve-grey ink.

### Primary
- **Shirt Plum** (plum): the field colour. Primary buttons, selected chips, the active keycap family, the "Now" badge, the cursor's label disc, the nav monogram, text selection, and the core of every light pool.
- **Lifted Plum** (plum-lift): the fill that slides up through a primary button on hover; the deep stop of the hero name gradient.
- **Deep Plum** (plum-deep): the scrollbar thumb and the outer falloff of the hero light.
- **Plum Highlight** (plum-hi): plum as text and line. Focus rings, link underlines, the scroll progress bar, the drawn trail, reached waypoints, link cues, the nav roll-up copy, the caret cursor, live dots and GitHub repo icons.

### Neutral
- **True Black** (black): the ground of every section, the loader and the mobile menu.
- **Plum Night** (panel) and **Plum Night Raised** (panel-2): hover surfaces (repo cards, social buttons); translucent panel on timeline and GitHub cards.
- **Bone Ink** (ink): headings, body, the cursor dot, the ghost button's hover fill.
- **Mauve Grey** (ink-2): secondary copy, ledes, nav links, chip text, labels.
- **Dim Mauve** (ink-3): tertiary metadata, hint corners, counts, key letters.
- **Hairline** (rule) and **Strong Hairline** (rule-strong): section borders, card borders, the outline of ghost buttons, chips, tags and fields.
- **Error Rose** (error): field error text and invalid underline only.

### Named Rules
**The One Hue Rule.** Plum is the only chroma. Data colours (the GitHub language bar) are drawn from the plum ramp (#e2a6c4, #c47a9f, #9c4772, #6f3352), never from a second hue.

**The Borrowed Plum Rule.** The plum comes from the portrait's shirt. If the portrait changes, the accent is re-derived from it.

**The Plum-Hi Is Line Rule.** Shirt Plum fills areas behind white text; Plum Highlight draws lines, marks and small text on black. Do not swap them.

## Typography

**Display Font:** Archivo variable, width axis loaded (with Segoe UI, system-ui)
**Body Font:** Archivo at normal width
**Label/Mono Font:** none; Archivo with tabular numerals

**Character:** One grotesque doing two voices. Expanded (wdth 108 to 125) and weight 750 to 800 with tight negative tracking shouts the name and headings; normal width at 400 to 600 carries everything a visitor reads.

### Hierarchy
- **Display** (800, clamp(6rem, 21.5vw, 22rem), 0.82, wdth 108): the hero first name only, filled with a white-to-plum gradient that runs letter to letter. On phones clamp(5rem, 27vw, 9rem).
- **Display Outline** (800, clamp(3.25rem, 9vw, 8.5rem), 1, wdth 112): marquee words and the hero surname, transparent with a 1.5px bone stroke at 45 to 70%; one marquee word per loop is solid.
- **Headline** (800, clamp(2.5rem, 5.4vw, 5rem), 0.95, wdth 112, -0.04em): section titles and the reel's closing line; balanced wrap.
- **Statement** (600, clamp(1.625rem, 3.1vw, 2.75rem), 1.18): the About statement, lit word by word.
- **Title** (750, clamp(1.5rem, 2.4vw, 2rem), 1.1, wdth 112): role names, course names; project titles scale up to clamp(2.25rem, 4vw, 3.75rem) at 800.
- **Lede** (400, 1.25rem, 1.5): section ledes (max 44ch), about lead (max 62ch), field input text.
- **Body** (400, 1.0625rem, 1.6): running copy, hero tagline (max 25rem), card descriptions (max 44ch).
- **Label** (400 to 600, 0.875rem, tabular numerals): dates, chips, metadata, readouts, footer nav.
- **Micro** (0.8125rem): tags, hint corners, cursor label (650), repo meta, credit.
- **Numerals** (800, wdth 112, -0.04em, tabular): stats, GitHub counts, education scores, the loader counter.

### Named Rules
**The Width Axis Rule.** Hierarchy comes from Archivo's width and weight, never a second family. Heavy is always expanded; read text is always normal width.

**The Tabular Rule.** Every date, count, score, phone number and progress readout uses tabular numerals.

**The One Gradient Name Rule.** The white-to-plum gradient fill belongs to the hero first name alone (pinned by the reference). No other text is gradient-filled.

## Layout

A centred 90rem container with a fluid gutter (clamp(1rem, 4vw, 3.5rem)); sections pad clamp(5.5rem, 11vw, 9.5rem) vertically and are divided by hairlines. Text-led sections (About, Education) use a 12-column grid: heading in columns 1 to 4 (sticky at 6.5rem on desktop), body in 5 to 12. Interactive sections split 5:7 (Skills, Contact) or 4:8 (GitHub). The hero fills 100svh with absolutely placed parts: name at the top, portrait rising from 40% down the name, surname bottom right, tagline and actions bottom left, hint and location corners. The project reel pins at 100svh and translates horizontally through panels of min(84vw, 1240px).

Breakpoints: at 1100px the nav socials go and repo feed becomes one column; at 959px the nav becomes a full-screen clip-path menu, split layouts stack and the reel unpins into a vertical list (also under reduced motion); at 819px the trail goes single-column with a 3rem rail; at 760px the hero reflows into a column with a masked portrait, stats and education stack, and keycaps wrap three to a row.

## Elevation & Depth

A hybrid. Resting UI surfaces (buttons, chips, cards, panels) are flat: hairline borders on black, translucent plum-night fills. Depth appears in two forms only: plum light (radial gradients) as atmosphere and hover state, and physical shadows on objects that are physically deep in the world (keycaps, the keyboard deck, laptop frames). The hero adds parallax depth: a three-layer canvas shard field (far specks, mid shards and lines, blurred near shards at the edges) and a pointer-driven offset between name and portrait.

### Shadow Vocabulary
- **Keycap side wall** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.09), inset 0 -2px 0 rgb(0 0 0 / 0.35), 0 5px 0 #09070a, 0 12px 18px -8px rgb(0 0 0 / 0.85)`): resting keycaps; pressed keys collapse the wall to 1px and translate down 4px.
- **Active keycap** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.22), 0 5px 0 #3a1428, 0 14px 28px -8px rgb(155 81 110 / 0.75)`): keys of the selected skill group.
- **Keyboard deck** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.07), 0 50px 90px -40px rgb(0 0 0 / 0.95), 0 30px 120px -50px rgb(138 61 99 / 0.55)`).
- **Laptop screen** (`box-shadow: 0 60px 100px -50px rgb(0 0 0 / 1), 0 40px 140px -60px rgb(138 61 99 / 0.6)`), with a base at `0 30px 40px -24px rgb(0 0 0 / 0.95)`.

### Named Rules
**The Real Object Rule.** Cast shadows belong to objects that are physically deep (keycaps, keyboard, laptop). The keycap's solid 5px under-edge is a keyboard's own material and stays scoped to keycaps; flat UI never gets offset shadows.

**The Light Pool Rule.** Plum radial light marks atmosphere and attention: behind the hero portrait (growing with press-and-hold charge), top-left of a timeline card on hover, under the cursor on education cards, in the sheet and contact panel corners. Never a uniform glow around a box.

## Shapes

Soft and generous. Every action and token is a full pill (999px): buttons, chips, tags, the Now badge, the language bar. Containers step up in radius with size: keycaps 10px, readout 16px, repo cards 18px, timeline cards 20px, education, GitHub and keyboard panels 22px, the contact panel 32px. Circles for the monogram, social buttons, nav toggle, sheet close, waypoints and cursor. The laptop screen is 18px top, 6px bottom. Form fields are the exception: square, underline only. Hairlines are 1px throughout; the drawn trail is 2px round-capped over a 3/9 dashed route.

## Components

### Buttons
Tactile and alive.
- **Shape:** full pill (999px), 3rem tall, 1.5rem padding, weight 600; small variant 2.5rem.
- **Primary:** Shirt Plum with white text; on hover Lifted Plum slides up from below (480ms, shared ease).
- **Ghost:** Strong Hairline outline, bone text; on hover a bone fill slides up and text turns black.
- **Magnetic:** section-level buttons (hero actions, form submit, GitHub and reel links) drift toward the pointer (22% x, 30% y of the offset) and spring back.
- **Focus:** 2px Plum Highlight outline, 3px offset.
- **Text links:** weight 600 with a Plum Highlight underline resting at 35% width that sweeps to full on hover; outbound arrows nudge 2px up-right.

### Chips
- **Style:** transparent pill with Strong Hairline border, Mauve Grey label text.
- **State:** hover turns the border Plum Highlight and text Bone; selected (skill groups, contact topics) fills Shirt Plum with white text. Tags are smaller, non-interactive pills.

### Cards / Containers
- **Corner Style:** 18 to 22px by size (see Shapes).
- **Background:** translucent Plum Night (rgb(18 12 17 / 0.6 to 0.7)) or a plum-to-night linear wash on education cards.
- **Shadow Strategy:** none; hover adds a plum light pool and lifts the border to rgb(226 166 196 / 0.4 to 0.45). Timeline and repo cards rise 3 to 4px; education cards tilt toward the pointer.
- **Border:** 1px Hairline.
- **Internal Padding:** 1.375rem to 2rem.

### Inputs / Fields
- **Style:** transparent, square, 1px Strong Hairline underline, Lede-size text, Mauve Grey label above.
- **Focus:** underline turns Plum Highlight and doubles via a 1px box-shadow; the cursor dot becomes a plum caret.
- **Error:** underline and message in Error Rose.

### Navigation
Fixed bar, transparent over the hero, black at 94% with a hairline once scrolled past 40px. Brand is a plum monogram disc (spins 360deg on hover) plus the expanded name. Links in Mauve Grey roll up on hover to reveal a Plum Highlight copy; the current section is Bone. Socials sit in 2.25rem circles behind a hairline divider; the résumé is a small ghost button. Below 960px a circular toggle opens a full-screen black menu with a plum floor light, revealed by clip-path, with links at Headline scale staggered in.

### Cursor (signature)
A 6px bone dot plus an 84px ring sized only by scale (0.45 at rest), trailing at a 0.16 lerp. Over links the ring grows to 0.72 with a plum-hi border and faint fill; over projects it becomes a solid plum disc at full size carrying a white label; over text fields the dot stretches into a plum caret. Pointer-down shrinks it. Fine pointers only.

### Hero shard field (signature)
A canvas of pre-rendered shard sprites in three depths behind the name, drifting and reacting to the cursor; press-and-hold charges plum-lit sprites and the light pool, release bursts them. The name and portrait shift against each other with the pointer and exit upward on scroll (the name scales up and fades).

### Skills keyboard (signature)
A CSS 3D keyboard tilted back 16deg (8deg on tablet) on a dark deck; keycaps carry a letter and a skill name and press physically. Pressing a key or typing its letter fills a gradient readout; group chips light their keys plum and dim the rest to 25%.

### Experience trail and sheet (signature)
Cards alternate left and right of a dashed route that is drawn in Plum Highlight as the visitor scrolls, filling each waypoint on arrival. A card opens a right-hand detail sheet (min(36rem, 100vw)) that slides in over a blurred black backdrop.

### Project reel (signature)
A pinned horizontal track of panels; each pairs a CSS laptop (browser bar, URL pill, real screenshot, glare, base) that tilts toward the pointer with title, plum kind label, description, tags and links. A hairline progress bar with a plum fill tracks the reel.

### Marquee
Giant outline words with a plum shard sliver between them, scrolling continuously; speed and skew (capped at 12deg) follow scroll velocity.

## Do's and Don'ts

### Do:
- **Do** keep the ground true black (#000) with the grain overlay, and let plum enter as light pools, fills behind white text, or Plum Highlight lines.
- **Do** use Archivo's width axis for hierarchy: expanded and 800 for name, headings and numerals; normal width for everything read.
- **Do** run every movement on the shared ease (cubic-bezier(0.16, 1, 0.3, 1)), with cubic-bezier(0.65, 0, 0.35, 1) for clip-path wipes (loader, menu, sheet close).
- **Do** follow the motion grammar: title words rise from a clipped line with a stagger capped at 330ms; the About statement lights word by word from 16% opacity; sections slide in from below (48px) or from the sides (80px, 32px on phones); grouped items stagger at 90ms.
- **Do** give buttons the slide-up fill and section-level buttons the magnetic pull.
- **Do** remove all motion under prefers-reduced-motion: no loader, no reveals, no reel pinning, no cursor loops, and leave content fully visible.
- **Do** batch scroll work into one requestAnimationFrame per frame and read only scrollY against geometry cached on resize.
- **Do** write scroll-driven values to the element that uses them (the progress bar, the reel bar, the hero layers), never to :root.
- **Do** pre-render canvas sprites once per resize and draw them with drawImage; cap the canvas device pixel ratio at 1.5.
- **Do** pause every continuous loop (shard field, marquee) when it is off-screen or the tab is hidden, and let event-driven loops (hero depth) stop once they settle.
- **Do** show projects only inside the CSS laptop frame with a real screenshot of the shipped site.
- **Do** use tabular numerals for every date, count and score.

### Don't:
- **Don't** add a second hue; data and state colours come from the plum ramp.
- **Don't** add a second typeface.
- **Don't** gradient-fill any text other than the hero first name.
- **Don't** write custom properties to :root (or any page-wide ancestor) on scroll; it restyles the whole page and caused real lag.
- **Don't** call getBoundingClientRect inside scroll handlers or draw shard shapes and blur filters per frame.
- **Don't** put cast shadows on flat UI; physical shadows are for keycaps, the keyboard deck and laptops only.
- **Don't** lay projects out as a static card grid or skills as a chip wall; each section keeps one proving interaction.
- **Don't** resize the cursor ring by width or height; size it by scale so nothing re-lays out.
