"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { person, projects } from "../content";
import { ArrowOut, GitHubIcon } from "./icons";
import { SplitWords } from "./Motion";

/** Pinned reel: vertical scroll moves the projects sideways on wide screens. */
export function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    const mq = window.matchMedia("(min-width: 960px) and (prefers-reduced-motion: no-preference)");
    let max = 0;
    let secTop = 0;
    let lastX = -1;
    let lastIndex = -1;
    let queued = false;
    const bar = sec.querySelector<HTMLElement>(".hscroll__bar");

    // Measure once per resize; scrolling only reads scrollY.
    const size = () => {
      if (!mq.matches) {
        sec.style.height = "";
        tr.style.transform = "";
        return;
      }
      max = tr.scrollWidth - window.innerWidth;
      sec.style.height = `${max + window.innerHeight}px`;
      secTop = sec.getBoundingClientRect().top + window.scrollY;
      lastX = -1;
      apply();
    };
    const apply = () => {
      queued = false;
      if (!mq.matches) return;
      const x = Math.min(max, Math.max(0, window.scrollY - secTop));
      if (x === lastX) return;
      lastX = x;
      tr.style.transform = `translate3d(${-x}px, 0, 0)`;
      const p = max > 0 ? x / max : 0;
      bar?.style.setProperty("--reel", p.toFixed(4));
      const idx = Math.min(projects.length, Math.max(0, Math.round(p * (projects.length + 1))));
      if (idx !== lastIndex) {
        lastIndex = idx;
        setIndex(idx);
      }
    };
    const update = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(apply);
      }
    };

    size();
    // fonts and images can shift the page above the reel after load
    const late = window.setTimeout(size, 1200);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", size);
    mq.addEventListener("change", size);
    return () => {
      window.clearTimeout(late);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", size);
      mq.removeEventListener("change", size);
    };
  }, []);

  return (
    <section className="hscroll" id="projects" ref={section} aria-labelledby="projects-h">
      <div className="hscroll__pin">
        <div className="hscroll__track" ref={track}>
          <div className="hpanel hpanel--intro">
            <h2 className="section-title reveal-title" id="projects-h">
              <SplitWords text="Things I’ve built" />
            </h2>
            <p className="section-lede reveal">
              Live sites and code, from client work to coursework. Scroll to move through them; the screens lean
              toward your cursor.
            </p>
            <p className="hpanel__count reveal" aria-hidden="true">
              {projects.length} projects
            </p>
          </div>

          {projects.map((p) => (
            <article className="hpanel" key={p.id} aria-labelledby={`p-${p.id}`}>
              <a
                className="hpanel__media"
                href={p.url}
                target="_blank"
                rel="noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                data-cursor={p.when === "Live" ? "Visit" : "Code"}
                data-tilt="9"
              >
                <span className="device">
                  <span className="device__screen">
                    <span className="device__bar">
                      <span />
                      <span />
                      <span />
                      <span className="device__url">{p.url.replace(/^https:\/\//, "").replace(/\/$/, "")}</span>
                    </span>
                    <Image
                      src={p.shot}
                      alt=""
                      width={1440}
                      height={900}
                      sizes="(min-width: 960px) 46vw, 92vw"
                      className="device__img"
                    />
                    <span className="device__glare" />
                  </span>
                  <span className="device__base" />
                </span>
              </a>
              <div className="hpanel__info">
                <h3 className="hpanel__title" id={`p-${p.id}`}>
                  {p.name}
                </h3>
                <p className="hpanel__sub">
                  <span className="hpanel__kind">{p.kind}</span>
                  <span className={p.when === "Live" ? "hpanel__when hpanel__live" : "hpanel__when"}>{p.when}</span>
                </p>
                <p className="hpanel__desc">{p.desc}</p>
                <ul className="tags" aria-label="Built with">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className="hpanel__links">
                  <a className="link-out" href={p.url} target="_blank" rel="noreferrer">
                    {p.urlLabel}
                    <ArrowOut />
                  </a>
                </p>
                {/* Screen reader / keyboard users get the shot's description here */}
                <p className="visually-hidden">Screenshot: {p.shotAlt}</p>
              </div>
            </article>
          ))}

          <div className="hpanel hpanel--end">
            <p className="hpanel__end-title">Everything else lives on GitHub.</p>
            <p className="muted">Coursework, experiments and assignments, with the code open.</p>
            <a className="btn btn--ghost" href={person.github} target="_blank" rel="noreferrer" data-magnetic>
              <GitHubIcon size={16} />
              See the profile
            </a>
          </div>
        </div>

        <div className="hscroll__progress" aria-hidden="true">
          <span className="hscroll__bar" />
          <span className="hscroll__index">
            {String(Math.min(index, projects.length)).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
