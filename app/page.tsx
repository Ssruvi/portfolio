import { education, person, stats } from "./content";
import { Contact } from "./components/Contact";
import { Cursor } from "./components/Cursor";
import { Experience } from "./components/Experience";
import { GitHub } from "./components/GitHub";
import { Hero } from "./components/Hero";
import { DownloadIcon } from "./components/icons";
import { Loader } from "./components/Loader";
import { Marquee } from "./components/Marquee";
import { Motion, SplitWords } from "./components/Motion";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Loader />
      <Motion />
      <Cursor />
      <div className="backdrop" aria-hidden="true">
        <div className="backdrop__grain" />
      </div>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />

      <main id="main">
        <Hero />

        <section className="section" id="about" aria-labelledby="about-h">
          <div className="container about">
            <div className="about__side">
              <h2 className="section-title reveal-title" id="about-h">
                <SplitWords text="About" />
              </h2>
              <a className="link-in reveal" href={person.resume} download>
                Download résumé
                <DownloadIcon />
              </a>
            </div>
            <div className="about__body">
              <p className="about__statement reveal-title">
                <SplitWords text="I like turning a client’s brief into something they can click, scroll and use." />
              </p>
              <p className="about__lead reveal">
                That’s my job at ZootechX, and it’s what I did across 200+ pages at Sahu Technologies.
                Outside work I study Computer Science at DJ Sanghvi and used to run the editorial team at DJSISACA.
              </p>
              <dl className="about__stats stagger">
                {stats.map((s, i) => (
                  <div className="stat" key={s.label} style={{ "--i": i } as React.CSSProperties}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <Marquee />
        <Skills />
        <Experience />

        <section className="section" id="education" aria-labelledby="education-h">
          <div className="container grid edu-wrap">
            <div className="side-head">
              <h2 className="section-title reveal-title" id="education-h">
                <SplitWords text="Education" />
              </h2>
            </div>
            <ul className="edu-grid stagger">
              {education.map((e, i) => (
                <li key={e.id} style={{ "--i": i } as React.CSSProperties}>
                  <article className="edu" data-tilt="6">
                    <h3 className="edu__course">{e.course}</h3>
                    <p className="edu__school">{e.school}</p>
                    <p className="edu__foot">{e.focus}</p>
                    <div className="edu__bottom">
                      <span className="edu__years">{e.years}</span>
                      <span className="edu__score">
                        <span>{e.score}</span>
                        {e.scoreLabel}
                      </span>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Projects />
        <GitHub />
        <Contact />
      </main>

      <footer className="footer">
        <div className="container footer__bottom">
          <a className="footer__brand" href="#home">
            Ssruvi Rupani
          </a>
          <nav className="footer__nav" aria-label="Footer">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href={person.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={person.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={person.resume} download>
              Résumé
            </a>
          </nav>
          <p className="footer__credit">© 2026 Ssruvi Rupani. Built with Next.js, hosted on Vercel.</p>
        </div>
      </footer>
    </>
  );
}
