"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { person } from "../content";
import { ShardField } from "./ShardField";

export function Hero() {
  const hero = useRef<HTMLElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const figure = useRef<HTMLDivElement>(null);
  const last = useRef<HTMLParagraphElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const corners = useRef<HTMLDivElement>(null);

  const onCharge = useCallback((c: number) => {
    hero.current?.style.setProperty("--charge", c.toFixed(3));
  }, []);

  // Depth: the name and the portrait drift against each other with the pointer,
  // and the hero comes apart as you scroll away from it.
  useEffect(() => {
    const el = hero.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wide = window.matchMedia("(min-width: 761px)");
    const fine = window.matchMedia("(pointer: fine)").matches;

    let h = el.offsetHeight;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let raf = 0;
    let running = false;
    let dirty = true;

    const frame = () => {
      px += (tx - px) * 0.07;
      py += (ty - py) * 0.07;
      const s = Math.min(1, Math.max(0, window.scrollY / h)); // 0..1 through the hero
      const lift = wide.matches ? 0.32 : 0.18;
      if (name.current) {
        name.current.style.transform = `translate3d(${(-px * 18).toFixed(2)}px, ${(-py * 10 - s * h * lift).toFixed(2)}px, 0) scale(${(1 + s * 0.14).toFixed(4)})`;
        name.current.style.opacity = String(1 - s * 0.85);
      }
      if (figure.current) {
        figure.current.style.transform = `translate3d(${(px * 14).toFixed(2)}px, ${(py * 6 + s * h * 0.12).toFixed(2)}px, 0)`;
      }
      // the edge pieces travel a short way and are gone before they reach the frame
      const fade = String(Math.max(0, 1 - s * 2.4));
      if (last.current) {
        last.current.style.transform = `translate3d(${(px * 26 + s * 70).toFixed(2)}px, 0, 0)`;
        last.current.style.opacity = fade;
      }
      if (copy.current) {
        copy.current.style.transform = `translate3d(${(-s * 60).toFixed(2)}px, 0, 0)`;
        copy.current.style.opacity = fade;
      }
      if (corners.current) {
        corners.current.style.transform = `translate3d(0, ${(s * 40).toFixed(2)}px, 0)`;
        corners.current.style.opacity = fade;
      }
      const settled = Math.abs(tx - px) < 0.001 && Math.abs(ty - py) < 0.001;
      if (settled && !dirty) {
        running = false;
        return;
      }
      dirty = false;
      raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      dirty = true;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (window.scrollY < h) kick();
    };
    const onScroll = () => {
      if (window.scrollY < h * 1.1) kick();
    };
    const onResize = () => {
      h = el.offsetHeight;
      kick();
    };

    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="hero" id="home" ref={hero} aria-labelledby="hero-name">
      <div className="hero__stage">
        <ShardField onCharge={onCharge} />
        <div className="hero__light" aria-hidden="true" />
      </div>

      <h1 className="hero__name" id="hero-name" ref={name}>
        <span className="hero__first" aria-hidden="true">
          {person.first.split("").map((ch, i) => (
            <span className="hero__char" key={i} style={{ "--i": i } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
        <span className="visually-hidden">{person.name}</span>
      </h1>

      <div className="hero__person">
        <div className="hero__depth" ref={figure}>
          <Image
            className="hero__cutout"
            src="/ssruvi-portrait.webp"
            alt="Ssruvi Rupani, smiling, in a black blazer and plum shirt."
            width={933}
            height={1400}
            priority
            sizes="(min-width: 900px) 34vw, 70vw"
          />
        </div>
      </div>

      <p className="hero__last" aria-hidden="true">
        <span className="hero__exit" ref={last}>
          {person.last}
        </span>
      </p>

      <div className="hero__tagline">
        <div className="hero__exit" ref={copy}>
          <p>
            SDE intern at ZootechX. I build full-stack web products, from the interface people use to the server
            behind it.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects" data-magnetic>
              See projects
            </a>
            <a className="btn btn--ghost" href="#contact" data-magnetic>
              Contact me
            </a>
          </div>
        </div>
      </div>

      <div className="hero__corners" ref={corners}>
        <p className="hero__corner hero__hint">Press and hold anywhere here, then let go.</p>
        <p className="hero__corner hero__corner--right">{person.location}</p>
      </div>
    </section>
  );
}
