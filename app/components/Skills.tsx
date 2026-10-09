"use client";

import { useEffect, useRef, useState } from "react";
import { skillGroups, skills, type Skill } from "../content";
import { SplitWords } from "./Motion";

// Keyboard rows: staggered like a real board.
const ROWS = [skills.slice(0, 6), skills.slice(6, 11), skills.slice(11, 16), skills.slice(16)];

export function Skills() {
  const [current, setCurrent] = useState<Skill | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const section = useRef<HTMLElement>(null);
  const inView = useRef(false);
  const cycle = useRef<{ letter: string; idx: number }>({ letter: "", idx: 0 });

  const press = (s: Skill) => {
    setCurrent(s);
    setPressed(s.name);
    window.setTimeout(() => setPressed((p) => (p === s.name ? null : p)), 180);
  };

  // Type the first letter of a skill while the section is on screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.35 });
    if (section.current) io.observe(section.current);
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      const letter = e.key.toLowerCase();
      if (!/^[a-z]$/.test(letter)) return;
      const matches = skills.filter((s) => s.name.toLowerCase().startsWith(letter));
      if (!matches.length) return;
      const c = cycle.current;
      c.idx = c.letter === letter ? (c.idx + 1) % matches.length : 0;
      c.letter = letter;
      press(matches[c.idx]);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <section className="section skills-section" id="skills" ref={section} aria-labelledby="skills-h">
      <div className="container skills-layout">
        <div className="skills-side">
          <h2 className="section-title reveal-title" id="skills-h">
            <SplitWords text="What I build with" />
          </h2>
          <p className="section-lede reveal">
            Press the keys, or type the first letter of a skill. Each one says where I&apos;ve used it.
          </p>

          <div className="readout reveal" aria-live="polite">
            {current ? (
              <>
                <span className="readout__name">{current.name}</span>
                <span className="readout__where">{current.where ?? current.group}</span>
              </>
            ) : (
              <>
                <span className="readout__name readout__name--idle">Press any key</span>
                <span className="readout__where">20 skills across five groups</span>
              </>
            )}
          </div>

          <ul className="skills-groups reveal" aria-label="Filter by group">
            {skillGroups.map((g) => (
              <li key={g}>
                <button
                  type="button"
                  className="group-chip"
                  aria-pressed={group === g}
                  onClick={() => setGroup((cur) => (cur === g ? null : g))}
                >
                  {g}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="keyboard-stage reveal reveal--scale" data-tilt="10">
          <div className="keyboard" role="group" aria-label="Skills keyboard">
            {ROWS.map((row, r) => (
              <div className="keyboard__row" key={r} style={{ "--row": r } as React.CSSProperties}>
                {row.map((s) => {
                  const dim = group && s.group !== group;
                  return (
                    <button
                      type="button"
                      key={s.name}
                      className="key"
                      data-active={current?.name === s.name}
                      data-pressed={pressed === s.name}
                      data-dim={dim || undefined}
                      data-wide={s.name.length > 7 || undefined}
                      aria-label={`${s.name}${s.where ? `, used in ${s.where}` : ""}`}
                      onClick={() => press(s)}
                      onPointerEnter={() => setCurrent(s)}
                    >
                      <span className="key__cap">
                        <span className="key__letter" aria-hidden="true">
                          {s.name[0]}
                        </span>
                        <span className="key__name">{s.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
