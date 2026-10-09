"use client";

import { useEffect, useRef } from "react";

/**
 * A dot that follows the pointer exactly and a ring that trails it.
 * The ring grows over links and buttons, and shows a word over anything with data-cursor.
 * Fine pointers only; off under reduced motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current || !ring.current) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");
    const d = dot.current;
    const r = ring.current;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let visible = false;
    let lastState = "";
    let lastWord = "";

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!visible) {
        visible = true;
        rx = x;
        ry = y;
        root.classList.add("cursor-on");
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    // The ring trails the pointer, and the loop sleeps once it has caught up.
    let running = false;
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      r.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0)`;
      if (Math.abs(x - rx) < 0.1 && Math.abs(y - ry) < 0.1) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const word = t?.closest<HTMLElement>("[data-cursor]");
      const field = t?.closest("input, textarea");
      const hot = t?.closest("a, button, [role='button'], label, summary");
      let state = "";
      if (word) state = "label";
      else if (field) state = "text";
      else if (hot) state = "link";
      const text = word?.dataset.cursor ?? "";
      if (state !== lastState) {
        lastState = state;
        r.dataset.state = state;
        d.dataset.state = state;
      }
      if (text !== lastWord && label.current) {
        lastWord = text;
        label.current.textContent = text;
      }
    };

    const down = () => r.classList.add("is-down");
    const up = () => r.classList.remove("is-down");
    const out = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        visible = false;
        root.classList.remove("cursor-on");
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerout", out);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor", "cursor-on");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
