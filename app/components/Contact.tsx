"use client";

import { useState } from "react";
import { person } from "../content";
import { ArrowOut, LinkedInIcon } from "./icons";
import { SplitWords } from "./Motion";

const TOPICS = ["Internship or job", "Freelance project", "Something else"];
const MAX = 1000;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function Contact() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Add your name so Ssruvi knows who's writing.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter an email address Ssruvi can reply to.";
    if (message.trim().length < 10) next.message = "Write a little more, at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    const subject = `${topic}: message from ${name.trim()}`;
    const body = `${message.trim()}\n\n${name.trim()}\n${email.trim()}`;
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-h">
      <div className="container">
        <div className="contact__panel reveal reveal--scale">
          <div className="contact__intro">
            <h2 className="section-title reveal-title" id="contact-h">
              <SplitWords text="Tell me about it" />
            </h2>
            <p className="section-lede">
              Hiring for an internship or a role, or have a project in mind? Write here and it opens in your email
              app, ready to send.
            </p>
            <ul className="contact__direct">
              <li>
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </li>
              <li>
                <a href={person.phoneHref}>{person.phone}</a>
              </li>
              <li>
                <a href={person.linkedin} target="_blank" rel="noreferrer">
                  <LinkedInIcon size={15} />
                  LinkedIn
                  <ArrowOut />
                </a>
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={submit} noValidate>
            <fieldset className="topic-picker">
              <legend>What&apos;s this about?</legend>
              <div className="topic-picker__options">
                {TOPICS.map((t) => (
                  <label key={t} className="topic-chip" data-selected={topic === t}>
                    <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="cf-name">Name</label>
              <input
                id="cf-name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "cf-name-err" : undefined}
              />
              {errors.name && (
                <p className="field__error" id="cf-name-err">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "cf-email-err" : undefined}
              />
              {errors.email && (
                <p className="field__error" id="cf-email-err">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                rows={5}
                maxLength={MAX}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={`cf-message-count${errors.message ? " cf-message-err" : ""}`}
              />
              <p className="field__count" id="cf-message-count">
                {message.length} / {MAX}
              </p>
              {errors.message && (
                <p className="field__error" id="cf-message-err">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn--primary contact-form__submit" data-magnetic>
              Open in email app
            </button>
            <p className="contact-form__status" role="status">
              {sent && (
                <>
                  Your email app should be open with the message ready. If nothing opened, write to{" "}
                  <a href={`mailto:${person.email}`}>{person.email}</a>.
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
