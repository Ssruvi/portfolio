"use client";

import { useEffect, useRef } from "react";

type Shard = {
  x: number;
  y: number;
  z: number; // 0.1 (far) .. 2 (near, in front of the lens)
  vx: number;
  vy: number;
  a: number;
  va: number;
  line: boolean;
  len: number; // lines only
  base?: HTMLCanvasElement; // pre-rendered body
  lit?: HTMLCanvasElement; // pre-rendered plum glow, faded in while charging
  half: number; // sprite half-size in CSS px
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Draws one glass shard into its own small canvas, once. */
function sprite(w: number, h: number, skew: number, blur: number, lit: boolean, dpr: number) {
  const pad = blur * 2 + 4;
  const size = Math.ceil(Math.max(w, h) * 1.5 + pad * 2);
  const c = document.createElement("canvas");
  c.width = Math.ceil(size * dpr);
  c.height = Math.ceil(size * dpr);
  const g = c.getContext("2d")!;
  g.scale(dpr, dpr);
  g.translate(size / 2, size / 2);
  g.transform(1, 0, skew, 1, 0, 0);
  if (blur) g.filter = `blur(${blur}px)`;
  const grad = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
  if (lit) {
    grad.addColorStop(0, "rgba(214, 128, 170, 0.95)");
    grad.addColorStop(1, "rgba(120, 45, 85, 0.5)");
  } else {
    grad.addColorStop(0, "rgba(70, 42, 60, 0.95)");
    grad.addColorStop(1, "rgba(12, 8, 12, 0.95)");
  }
  g.fillStyle = grad;
  g.beginPath();
  g.moveTo(-w / 2, -h / 2);
  g.lineTo(w / 2, -h / 2 + h * 0.15);
  g.lineTo(w / 2 - w * 0.1, h / 2);
  g.lineTo(-w / 2 + w * 0.05, h / 2 - h * 0.1);
  g.closePath();
  g.fill();
  g.filter = "none";
  if (!blur) {
    g.strokeStyle = lit ? "rgba(255, 220, 238, 0.9)" : "rgba(226, 166, 196, 0.45)";
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(-w / 2, -h / 2);
    g.lineTo(w / 2, -h / 2 + h * 0.15);
    g.stroke();
  }
  return { canvas: c, half: size / 2 };
}

/**
 * A drifting field of glass shards behind the hero name, in three depths.
 * The pointer pushes them aside; press and hold to draw them in, release to scatter them.
 */
export function ShardField({ onCharge }: { onCharge?: (c: number) => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const host = cv.parentElement!.parentElement as HTMLElement; // the hero section

    let W = 0;
    let H = 0;
    let dpr = 1;
    let shards: Shard[] = [];
    const mouse = { x: -9999, y: -9999, tx: 0, ty: 0, px: 0, py: 0 };
    let holding = false;
    let charge = 0;
    let lastCharge = -1;
    let running = false;
    let raf = 0;

    const make = (z: number, w: number, h: number, blur: number, x: number, y: number): Shard => {
      const skew = rand(-0.5, 0.5);
      const base = sprite(w, h, skew, blur, false, dpr);
      const lit = sprite(w, h, skew, blur, true, dpr);
      return {
        x,
        y,
        z,
        vx: rand(-0.06, 0.06),
        vy: rand(-0.1, 0.03),
        a: rand(0, Math.PI * 2),
        va: rand(-0.002, 0.002),
        line: false,
        len: 0,
        base: base.canvas,
        lit: lit.canvas,
        half: base.half,
      };
    };

    const build = () => {
      const r = cv.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      const count = Math.round(Math.min(46, Math.max(20, (W * H) / 30000)));
      const mid = Array.from({ length: count }, () => {
        const z = rand(0.3, 1);
        if (Math.random() < 0.3) {
          return {
            x: rand(0, W),
            y: rand(0, H),
            z,
            vx: rand(-0.06, 0.06),
            vy: rand(-0.1, 0.03),
            a: rand(0, Math.PI * 2),
            va: rand(-0.002, 0.002),
            line: true,
            len: rand(60, 220) * z,
            half: 0,
          } as Shard;
        }
        return make(z, rand(14, 70) * z, rand(6, 34) * z, 0, rand(0, W), rand(0, H));
      });
      const far = Array.from({ length: Math.round(count * 0.5) }, () =>
        make(rand(0.1, 0.22), rand(3, 9), rand(2, 5), 0, rand(0, W), rand(0, H)),
      );
      const edges = [
        [rand(-0.04, 0.1), rand(0.05, 0.3)],
        [rand(0.86, 1.04), rand(0.1, 0.4)],
        [rand(-0.05, 0.12), rand(0.65, 0.95)],
        [rand(0.84, 1.05), rand(0.7, 1)],
      ];
      const near = edges.map(([fx, fy]) => {
        const s = make(rand(1.5, 2), rand(140, 260), rand(50, 110), rand(6, 10), fx * W, fy * H);
        s.vx = s.vy = 0;
        s.va = rand(-0.0008, 0.0008);
        return s;
      });
      shards = [...far, ...mid, ...near];
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      mouse.px += (mouse.tx - mouse.px) * 0.06;
      mouse.py += (mouse.ty - mouse.py) * 0.06;

      ctx.lineWidth = 1;
      for (const s of shards) {
        const sx = s.x + mouse.px * 26 * s.z;
        const sy = s.y + mouse.py * 18 * s.z;
        const cos = Math.cos(s.a) * dpr;
        const sin = Math.sin(s.a) * dpr;
        ctx.setTransform(cos, sin, -sin, cos, sx * dpr, sy * dpr);
        if (s.line) {
          ctx.globalAlpha = Math.min(1, 0.1 + 0.25 * s.z + charge * 0.25);
          ctx.strokeStyle = "#f3eef2";
          ctx.beginPath();
          ctx.moveTo(-s.len / 2, 0);
          ctx.lineTo(s.len / 2, 0);
          ctx.stroke();
        } else {
          const size = s.half * 2;
          ctx.globalAlpha = s.z < 0.25 ? 0.55 : Math.min(1, 0.55 + 0.45 * s.z);
          ctx.drawImage(s.base!, -s.half, -s.half, size, size);
          if (charge > 0.02) {
            ctx.globalAlpha = charge * 0.9;
            ctx.drawImage(s.lit!, -s.half, -s.half, size, size);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      if (holding) charge = Math.min(1, charge + 0.012);
      else charge = Math.max(0, charge - 0.03);
      if (Math.abs(charge - lastCharge) > 0.004) {
        lastCharge = charge;
        onCharge?.(charge);
      }

      for (const s of shards) {
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (holding) {
          const pull = 0.0009 * charge * (0.5 + Math.min(1, s.z));
          s.vx -= dx * pull + (dy / d) * 0.05 * charge;
          s.vy -= dy * pull - (dx / d) * 0.05 * charge;
          s.va += 0.0006 * charge;
        } else if (d < 170) {
          const push = ((170 - d) / 170) * 0.35 * Math.min(1, s.z);
          s.vx += (dx / d) * push;
          s.vy += (dy / d) * push;
        }
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.va *= 0.985;
        const drift = s.z > 1.2 ? 0.15 : 1;
        s.x += s.vx + 0.06 * s.z * drift;
        s.y += s.vy - 0.1 * s.z * drift;
        s.a += s.va + 0.0015 * (Math.min(1, s.z) - 0.5);
        const m = 160;
        if (s.x < -m) s.x = W + m;
        if (s.x > W + m) s.x = -m;
        if (s.y < -m) s.y = H + m;
        if (s.y > H + m) s.y = -m;
      }
      draw();
      if (running) raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const release = () => {
      if (!holding) return;
      holding = false;
      host.classList.remove("is-charging");
      host.classList.add("is-burst");
      window.setTimeout(() => host.classList.remove("is-burst"), 700);
      for (const s of shards) {
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (6 + 22 * charge) * (0.4 + Math.min(1, s.z)) * Math.max(0.25, 1 - d / 900);
        s.vx += (dx / d) * f;
        s.vy += (dy / d) * f;
        s.va += (Math.random() - 0.5) * 0.08 * charge;
      }
    };

    const local = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.tx = (mouse.x / W - 0.5) * 2;
      mouse.ty = (mouse.y / H - 0.5) * 2;
    };
    const onMove = (e: PointerEvent) => local(e);
    const onDown = (e: PointerEvent) => {
      if ((e.target as Element).closest("a, button")) return;
      local(e);
      holding = true;
      host.classList.add("is-charging");
    };
    const onLeave = () => {
      release();
      mouse.x = mouse.y = -9999;
    };

    build();
    draw();
    if (!reduce) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", release);
      host.addEventListener("pointerleave", onLeave);
    }

    // Only animate while the hero is on screen and the tab is visible.
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(host);
    const onVis = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    let resizeT = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        build();
        draw();
      }, 150);
    });
    ro.observe(cv);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", release);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [onCharge]);

  return <canvas ref={canvas} className="hero__field" aria-hidden="true" />;
}
