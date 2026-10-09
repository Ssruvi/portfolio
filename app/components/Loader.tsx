"use client";

import { useEffect, useRef } from "react";

/** Counts 0 to 100, then lifts away and hands off to the hero's entrance. */
export function Loader() {
  const count = useRef<HTMLSpanElement>(null);
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      el.current?.classList.add("is-done");
      root.classList.add("loaded");
    };
    if (reduce) {
      finish();
      return;
    }
    const start = performance.now();
    const dur = 1150;
    let raf = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      if (count.current) count.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 120);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={el} className="loader" aria-hidden="true">
      <div className="loader__inner">
        <span className="loader__name">Ssruvi Rupani</span>
        <span className="loader__count" ref={count}>
          000
        </span>
      </div>
      <div className="loader__bar" />
    </div>
  );
}
