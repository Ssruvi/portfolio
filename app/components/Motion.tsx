"use client";

import Lenis from "lenis";
import { Fragment, useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Page-wide motion: smooth scroll, scroll reveals, progress bar, tilt-on-hover, in-page anchors. */
export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // Reveals: elements slide in once, the first time they enter the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    document.querySelectorAll(".reveal, .reveal-title, .stagger").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Smooth scroll.
    let lenis: Lenis | null = null;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
      window.__lenis = lenis;
      let raf = requestAnimationFrame(function loop(t) {
        lenis!.raf(t);
        raf = requestAnimationFrame(loop);
      });
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        lenis!.destroy();
        window.__lenis = undefined;
      });
    }

    // In-page anchors go through Lenis so they glide instead of jump.
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!;
      const el = hash.length > 1 ? document.querySelector<HTMLElement>(hash) : null;
      if (!el) return;
      ev.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: hash === "#home" ? 0 : -72, duration: 1.4 });
      else el.scrollIntoView();
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    // Scroll progress. Writes only to the bar itself (never a root-level variable, which would
    // restyle the whole page), measures height on resize, and runs at most once per frame.
    const root = document.documentElement;
    const bar = document.querySelector<HTMLElement>(".progress");
    let maxScroll = 1;
    let scrolled = false;
    let queued = false;
    const measure = () => {
      maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
    };
    const apply = () => {
      queued = false;
      const y = window.scrollY;
      if (bar) bar.style.transform = `scaleX(${Math.min(1, y / maxScroll).toFixed(4)})`;
      const s = y > 40;
      if (s !== scrolled) {
        scrolled = s;
        root.classList.toggle("scrolled", s);
      }
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(apply);
      }
    };
    measure();
    apply();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    });

    // Tilt: anything marked data-tilt leans toward the pointer.
    if (!reduce && window.matchMedia("(pointer: fine)").matches) {
      const tilts = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
      for (const el of tilts) {
        const max = Number(el.dataset.tilt || 8);
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
          el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
          el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
          el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
        };
        const leave = () => {
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      }
    }

    // Magnetic buttons drift toward the pointer, then spring back.
    if (!reduce && window.matchMedia("(pointer: fine)").matches) {
      for (const el of Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"))) {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          el.style.translate = `${(dx * 0.22).toFixed(1)}px ${(dy * 0.3).toFixed(1)}px`;
        };
        const leave = () => {
          el.style.translate = "";
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      }
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return <div className="progress" aria-hidden="true" />;
}

/** Splits a heading into words that slide up one after another. */
export function SplitWords({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w">
            <span className="wi" style={{ "--i": i + offset } as React.CSSProperties}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
