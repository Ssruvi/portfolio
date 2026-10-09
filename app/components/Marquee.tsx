"use client";

import { useEffect, useRef } from "react";

const WORDS = ["Websites", "Web apps", "Interfaces", "APIs", "Databases", "Testing", "Deployment"];

// A glass sliver, cut the same way as the hero's shards.
function Sliver() {
  return (
    <svg className="marquee__sliver" viewBox="0 0 48 20" aria-hidden="true">
      <path d="M0 7 46 0 43 18 3 14Z" />
      <path className="marquee__sliver-edge" d="M0 7 46 0" />
    </svg>
  );
}

/** A band of outlined words. It always drifts; scrolling speeds it up and leans it into the motion. */
export function Marquee() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const tr = track.current;
    if (!el || !tr) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let half = tr.scrollWidth / 2;
    let lastY = window.scrollY;
    let vel = 0;
    let skew = 0;
    let raf = 0;
    let running = false;

    const frame = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      vel += (dy - vel) * 0.12;
      skew += (Math.max(-12, Math.min(12, vel * 0.35)) - skew) * 0.12;
      x -= 0.6 + Math.abs(vel) * 0.35;
      if (x <= -half) x += half;
      tr.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0) skewX(${(-skew).toFixed(2)}deg)`;
      if (running) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        lastY = window.scrollY;
        raf = requestAnimationFrame(frame);
      } else if (!e.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    const onResize = () => (half = tr.scrollWidth / 2);
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const run = (key: string) =>
    WORDS.map((w, i) => (
      <span className="marquee__item" key={`${key}-${i}`}>
        <span className={i % 2 ? "marquee__word marquee__word--solid" : "marquee__word"}>{w}</span>
        <Sliver />
      </span>
    ));

  return (
    <div className="marquee" ref={wrap} aria-hidden="true">
      <div className="marquee__track" ref={track}>
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}
