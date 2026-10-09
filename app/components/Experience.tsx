"use client";

import { useEffect, useRef, useState } from "react";
import { experience, type Job } from "../content";
import { CloseIcon } from "./icons";
import { SplitWords } from "./Motion";

/** A route that draws itself as you scroll, with a stop for each role. */
export function Experience() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [d, setD] = useState("");
  const [stops, setStops] = useState<{ x: number; y: number }[]>([]);
  const [reached, setReached] = useState(-1);
  const [open, setOpen] = useState<Job | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  // Build the route through each card's stop.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const layout = () => {
      const r = el.getBoundingClientRect();
      const narrow = r.width < 820;
      const items = Array.from(el.querySelectorAll<HTMLElement>(".trail__item"));
      const pts = items.map((it) => {
        const ir = it.getBoundingClientRect();
        return { x: narrow ? 18 : r.width / 2, y: ir.top - r.top + 44 };
      });
      if (!pts.length) return;
      // Swing stays inside the gap between the two card columns.
      const swing = narrow ? 0 : Math.min(56, r.width * 0.04);
      let p = `M ${pts[0].x} ${pts[0].y}`;
      let prev = pts[0];
      pts.slice(1).forEach((pt, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        const span = pt.y - prev.y;
        p += ` C ${prev.x + swing * dir} ${prev.y + span * 0.35}, ${pt.x - swing * dir} ${pt.y - span * 0.35}, ${pt.x} ${pt.y}`;
        prev = pt;
      });
      p += ` L ${prev.x} ${r.height}`;
      setD(p);
      setStops(pts);
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Draw it with scroll. Geometry is measured on resize; scrolling only reads scrollY.
  useEffect(() => {
    const el = wrap.current;
    const pe = path.current;
    if (!el || !pe || !d) return;
    const len = pe.getTotalLength();
    pe.style.strokeDasharray = `${len}`;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let top = 0;
    let height = 1;
    let lastN = -2;
    let queued = false;
    const measure = () => {
      const r = el.getBoundingClientRect();
      top = r.top + window.scrollY;
      height = r.height || 1;
    };
    const apply = () => {
      queued = false;
      const head = window.scrollY + window.innerHeight * 0.62;
      const prog = reduce ? 1 : Math.min(1, Math.max(0, (head - top) / height));
      pe.style.strokeDashoffset = `${len * (1 - prog)}`;
      const y = prog * height;
      let n = -1;
      stops.forEach((s, i) => {
        if (y >= s.y - 4) n = i;
      });
      if (n !== lastN) {
        lastN = n;
        setReached(n);
      }
    };
    const update = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(apply);
      }
    };
    const onResize = () => {
      measure();
      update();
    };
    measure();
    apply();
    const late = window.setTimeout(onResize, 1200);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(late);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, [d, stops]);

  useEffect(() => {
    const dlg = dialog.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      window.__lenis?.stop();
    }
  }, [open]);

  const close = () => {
    const dlg = dialog.current;
    if (!dlg) return;
    dlg.classList.add("is-closing");
    window.setTimeout(() => {
      dlg.classList.remove("is-closing");
      dlg.close();
    }, 280);
  };

  return (
    <section className="section" id="experience" aria-labelledby="experience-h">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal-title" id="experience-h">
            <SplitWords text="The road so far" />
          </h2>
          <p className="section-lede reveal">Internships and leadership, newest first. Open a stop for the details.</p>
        </div>

        <div className="trail" ref={wrap}>
          <svg className="trail__svg" aria-hidden="true">
            <path className="trail__route" d={d} />
            <path className="trail__drawn" d={d} ref={path} />
            {stops.map((s, i) => (
              <circle key={i} className="trail__waypoint" data-reached={i <= reached} cx={s.x} cy={s.y} r="7" />
            ))}
          </svg>

          <ol className="trail__list">
            {experience.map((job, i) => (
              <li key={job.id} className={`trail__item trail__item--${i % 2 === 0 ? "left" : "right"}`}>
                <button
                  type="button"
                  className={`timeline__card card-button reveal ${i % 2 === 0 ? "reveal--left" : "reveal--right"}`}
                  onClick={() => setOpen(job)}
                  data-cursor="Open"
                  aria-haspopup="dialog"
                >
                  <span className="timeline__role">{job.role}</span>
                  <span className="timeline__company">
                    {job.org}
                    <span className="timeline__kind">{job.kind}</span>
                  </span>
                  <span className="timeline__dates">
                    {job.dates}
                    {job.current && <span className="timeline__now">Now</span>}
                  </span>
                  <span className="timeline__desc">{job.short}</span>
                  <span className="card-button__cue">Read more</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <dialog
        ref={dialog}
        className="sheet"
        aria-labelledby="sheet-title"
        onClose={() => {
          setOpen(null);
          window.__lenis?.start();
        }}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        {open && (
          <div className="sheet__panel">
            <button type="button" className="sheet__close" onClick={close} aria-label="Close">
              <CloseIcon />
            </button>
            <h3 className="sheet__title" id="sheet-title">
              {open.role}
            </h3>
            <p className="sheet__org">{open.org}</p>
            <p className="sheet__meta">
              {open.dates}
              <span>{open.kind}</span>
            </p>
            <ul className="sheet__points">
              {open.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </dialog>
    </section>
  );
}
