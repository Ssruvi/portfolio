import { person } from "../content";
import { ArrowOut, RepoIcon } from "./icons";
import { SplitWords } from "./Motion";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  size: number;
};

const LANG_COLOURS: Record<string, string> = {
  Python: "#e2a6c4",
  JavaScript: "#c47a9f",
  TypeScript: "#9c4772",
  HTML: "#6f3352",
};

async function getRepos(): Promise<Repo[] | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${person.githubUser}/repos?per_page=100&sort=pushed`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const all = (await res.json()) as Repo[];
    // Skip forks, empty repos and the profile README repo.
    return all.filter(
      (r) => !r.fork && r.size > 0 && r.language && r.name.toLowerCase() !== person.githubUser.toLowerCase(),
    );
  } catch {
    return null;
  }
}

function ago(iso: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 86400000));
  if (days < 1) return "today";
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.round(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export async function GitHub() {
  const repos = await getRepos();

  const langs = new Map<string, number>();
  repos?.forEach((r) => r.language && langs.set(r.language, (langs.get(r.language) ?? 0) + 1));
  const total = [...langs.values()].reduce((a, b) => a + b, 0);
  const langList = [...langs.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <section className="section" id="github" aria-labelledby="github-h">
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <h2 className="section-title reveal-title" id="github-h">
              <SplitWords text="Recent code" />
            </h2>
            <p className="section-lede reveal">
              Straight from GitHub, most recently pushed first. Updated every hour.
            </p>
          </div>
          <a className="btn btn--ghost btn--sm reveal" href={person.github} target="_blank" rel="noreferrer" data-magnetic>
            See the profile
            <ArrowOut />
          </a>
        </div>

        {!repos ? (
          <p className="github__error reveal">
            GitHub didn&apos;t answer just now.{" "}
            <a href={person.github} target="_blank" rel="noreferrer">
              See the repositories on GitHub
            </a>
            .
          </p>
        ) : (
          <div className="github__grid">
            <div className="github__stats reveal">
              <p className="github__number">
                <span>{repos.length}</span>
                public repositories with code
              </p>
              {total > 0 && (
                <div className="langs">
                  <p className="langs__title">Languages by repository</p>
                  <div className="langs__bar" role="img" aria-label={langList.map(([l, n]) => `${l} ${n}`).join(", ")}>
                    {langList.map(([l, n]) => (
                      <span key={l} style={{ flexGrow: n, background: LANG_COLOURS[l] ?? "#4a3a45" }} />
                    ))}
                  </div>
                  <ul className="langs__legend">
                    {langList.map(([l, n]) => (
                      <li key={l}>
                        <span className="langs__dot" style={{ background: LANG_COLOURS[l] ?? "#4a3a45" }} />
                        {l}
                        <span className="muted">{Math.round((n / total) * 100)}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <ul className="repo-feed stagger">
              {repos.slice(0, 6).map((r, i) => (
                <li key={r.name} style={{ "--i": i } as React.CSSProperties}>
                  <a className="repo" href={r.html_url} target="_blank" rel="noreferrer" data-cursor="Code">
                    <RepoIcon className="repo__icon" />
                    <span className="repo__main">
                      <span className="repo__name">{r.name}</span>
                      {r.description && <span className="repo__desc">{r.description}</span>}
                    </span>
                    <span className="repo__meta">
                      {r.language && (
                        <span className="repo__lang">
                          <span className="langs__dot" style={{ background: LANG_COLOURS[r.language] ?? "#4a3a45" }} />
                          {r.language}
                        </span>
                      )}
                      <span>Pushed {ago(r.pushed_at)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
