"use client";

import { useEffect, useState } from "react";
import { person } from "../content";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MenuIcon } from "./icons";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Highlight the section in view.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((s): s is HTMLElement => Boolean(s));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const lenis = window.__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className="nav">
      <div className="nav__bar">
        <a className="nav__brand" href="#home" aria-label="Ssruvi Rupani, back to top">
          <span className="nav__mark" aria-hidden="true">
            S
          </span>
          <span className="nav__wordmark">Ssruvi Rupani</span>
        </a>

        <nav className="nav__menu" id="site-menu" data-open={open} aria-label="Sections">
          <ul>
            {links.map((l, i) => (
              <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={l.href} aria-current={active === l.href ? "true" : undefined} onClick={() => setOpen(false)}>
                  <span className="nav__link-text" data-text={l.label}>
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__end">
          <div className="nav__socials">
            <a href={person.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={person.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
          <a className="btn btn--ghost btn--sm nav__resume" href={person.resume} download>
            Résumé
            <DownloadIcon />
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>
    </header>
  );
}
