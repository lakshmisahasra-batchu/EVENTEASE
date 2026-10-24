
import { useState } from "react";
import "./App.css";

const INITIAL_WORKSHOPS = [
  {
    id: "web-dev",
    number: "01",
    title: "Web Development Bootcamp",
    category: "TECH",
    date: "28 OCT 2026",
    time: "10:00 AM",
    venue: "Computer Lab 1",
    seats: 30,
    description:
      "Turn your ideas into interactive experiences. Explore the foundations of modern web development and build something of your own.",
    accent: "pink",
    icon: "✳",
    tags: ["HTML + CSS", "JavaScript", "BEGINNER FRIENDLY"],
  },
  {
    id: "ui-ux",
    number: "02",
    title: "UI/UX Design Essentials",
    category: "DESIGN",
    date: "30 OCT 2026",
    time: "02:00 PM",
    venue: "Seminar Hall",
    seats: 25,
    description:
      "Learn to think like a designer. Explore visual hierarchy, user journeys and the small details that make digital experiences feel effortless.",
    accent: "lime",
    icon: "◉",
    tags: ["FIGMA", "PROTOTYPING", "ALL LEVELS"],
  },
  {
    id: "git-github",
    number: "03",
    title: "Git & GitHub Workshop",
    category: "TOOLS",
    date: "02 NOV 2026",
    time: "11:00 AM",
    venue: "Innovation Hub",
    seats: 20,
    description:
      "Get comfortable with version control, collaboration and the workflow developers use to manage real projects together.",
    accent: "blue",
    icon: "⌘",
    tags: ["VERSION CONTROL", "COLLABORATION", "HANDS-ON"],
  },
];

const FILTERS = ["ALL", "TECH", "DESIGN", "TOOLS"];

const clubs = [
  {
    name: "CodeIO",
    category: "Technology & Development",
    instagram: "https://www.instagram.com/codeio_bmsce/",
  },
  {
    name: "OSCode BMSCE",
    category: "Open Source",
    instagram: "https://www.instagram.com/oscode_bmsce/",
  },
  {
    name: "IEEE BMSCE",
    category: "Technology",
    instagram: "https://www.instagram.com/bmsce_ieee/",
  },
  {
    name: "Pentagram",
    category: "Mathematics Club",
    instagram: "",
  },
  {
    name: "Danzaddix BMSCE",
    category: "Dance",
    instagram: "https://www.instagram.com/danzaddix_bmsce/",
  },
  {
    name: "The Groove House",
    category: "Singing & Music",
    instagram: "",
  },
  {
    name: "BMSCE Fashion Team",
    category: "Fashion",
    instagram: "https://www.instagram.com/bmsce.fashionteam/",
  },
];

function App() {
  const [workshops, setWorkshops] = useState(INITIAL_WORKSHOPS);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const visibleWorkshops =
    activeFilter === "ALL"
      ? workshops
      : workshops.filter((workshop) => workshop.category === activeFilter);

  function openRegistration(workshop) {
    setSelectedWorkshop(workshop);
    setForm({ name: "", email: "" });
    setStatus({ type: "", message: "" });
  }

  function closeRegistration() {
    if (submitting) return;
    setSelectedWorkshop(null);
    setStatus({ type: "", message: "" });
  }

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleRegistration(event) {
    event.preventDefault();

    if (!selectedWorkshop) return;

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email) {
      setStatus({
        type: "error",
        message: "Please enter your name and email.",
      });
      return;
    }

    if (selectedWorkshop.seats <= 0) {
      setStatus({
        type: "error",
        message: "Sorry, this workshop is fully booked.",
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(
        `/api/workshops/${encodeURIComponent(selectedWorkshop.id)}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Registration failed. Please check the details and try again."
        );
      }

      setWorkshops((current) =>
        current.map((workshop) =>
          workshop.id === selectedWorkshop.id
            ? {
                ...workshop,
                seats:
                  typeof data.remainingSeats === "number"
                    ? data.remainingSeats
                    : Math.max(0, workshop.seats - 1),
              }
            : workshop
        )
      );

      setSelectedWorkshop((current) =>
        current?.id === selectedWorkshop.id
          ? {
              ...current,
              seats:
                typeof data.remainingSeats === "number"
                  ? data.remainingSeats
                  : Math.max(0, selectedWorkshop.seats - 1),
            }
          : current
      );

      setStatus({
        type: "success",
        message: data.message || "Registration complete!",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message === "Failed to fetch"
            ? "The registration server is unavailable. Start your backend and try again."
            : error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="eventease">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="EventEase home">
          <span className="brand-mark">
            e<span>✳</span>
          </span>
          <span>
            eventease<span className="brand-period">.</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#workshops">Workshops</a>
          <a href="#clubs">Clubs</a>
          <a href="#about">The experience</a>
        </nav>

        <a className="nav-cta" href="#workshops">
          Find your thing <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />

        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            CAMPUS EVENTS, REIMAGINED
          </div>

          <h1>
            Less scrolling.
            <br />
            <span>More doing.</span>
          </h1>

          <p className="hero-description">
            Meet your next big idea. Get hands-on, meet your people and make
            something worth talking about.
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#workshops">
              Explore workshops <span aria-hidden="true">↘</span>
            </a>
            <span className="hero-note">YOUR NEXT CHAPTER STARTS HERE.</span>
          </div>

          <div className="hero-stats">
            <div>
              <strong>03</strong>
              <span>WORKSHOPS</span>
            </div>
            <i />
            <div>
              <strong>75</strong>
              <span>SEATS TO GRAB</span>
            </div>
            <i />
            <div>
              <strong>∞</strong>
              <span>NEW POSSIBILITIES</span>
            </div>
          </div>
        </div>

        <div
          className="hero-art"
          aria-label="3D inspired workshop poster artwork"
        >
          <div className="art-backdrop" />
          <div className="art-sticker sticker-top">
            MAKE IT
            <br />
            REAL ↗
          </div>

          <div className="floating-disc">
            <div className="disc-core">
              <span>e</span>
            </div>
          </div>

          <div className="hero-poster">
            <div className="poster-topline">
              <span>EVENTEASE LAB</span>
              <span>26 / 01</span>
            </div>
            <div className="poster-big-type">
              IDEAS
              <br />
              INTO
              <br />
              <span>ORBIT.</span>
            </div>
            <div className="poster-bottom">
              <span>LEARN SOMETHING.</span>
              <span>BUILD SOMETHING.</span>
            </div>
            <div className="poster-sun" />
          </div>

          <div className="floating-cube" aria-hidden="true">
            <div className="cube-face cube-front">GO!</div>
            <div className="cube-face cube-side" />
            <div className="cube-face cube-top" />
          </div>

          <div className="art-label art-label-left">
            <span className="label-star">✳</span>
            <span>
              LEARN BY
              <br />
              MAKING
            </span>
          </div>

          <div className="art-label art-label-right">
            <span>YOUR SKILLS</span>
            <strong>LEVEL UP.</strong>
          </div>

          <div className="art-spark spark-one">✳</div>
          <div className="art-spark spark-two">✦</div>
        </div>

        <div className="hero-side-note">SCROLL TO DISCOVER ↓</div>
      </section>

      <div className="ticker" aria-label="EventEase highlights">
        <div className="ticker-track">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index}>
              MAKE SOMETHING COOL <b>✳</b> MEET YOUR PEOPLE <b>✳</b> TRY
              SOMETHING NEW <b>✳</b> NO BORING LECTURES <b>✳</b>
            </span>
          ))}
        </div>
      </div>

      <section className="workshops-section" id="workshops">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark-eyebrow">
              <span className="tiny-cross">✳</span> THE LINEUP
            </p>
            <h2>
              Pick your
              <br />
              <span>next obsession.</span>
            </h2>
          </div>

          <div className="section-intro">
            <p>
              Three ways to spend your time doing something that actually
              moves you forward.
            </p>
            <span>OCT — NOV 2026 / CAMPUS EDITION</span>
          </div>
        </div>

        <div className="filter-row" aria-label="Filter workshops">
          <span className="filter-label">I'M INTO</span>
          {FILTERS.map((filter) => (
            <button
              type="button"
              key={filter}
              className={`filter-chip ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
              {activeFilter === filter && <span> ↗</span>}
            </button>
          ))}
          <span className="results-count">
            {String(visibleWorkshops.length).padStart(2, "0")} RESULTS
          </span>
        </div>

        <div
          className={`workshop-stage ${
            activeFilter !== "ALL" ? "filtered-stage" : ""
          }`}
        >
          {visibleWorkshops.map((workshop, index) => (
            <article
              className={`workshop-poster poster-${workshop.accent} poster-index-${index}`}
              key={workshop.id}
            >
              <div className="poster-no">{workshop.number} / WORKSHOP</div>

              <div className="poster-art" aria-hidden="true">
                {workshop.accent === "pink" && (
                  <>
                    <div className="pink-sphere">
                      <div className="sphere-highlight" />
                    </div>
                    <div className="pink-ring" />
                    <div className="pink-mini-orbit" />
                    <span className="poster-art-symbol">{"</>"}</span>
                  </>
                )}

                {workshop.accent === "lime" && (
                  <>
                    <div className="lime-donut">
                      <div />
                    </div>
                    <div className="lime-platform" />
                    <div className="lime-ball" />
                    <span className="poster-art-symbol">◎</span>
                  </>
                )}

                {workshop.accent === "blue" && (
                  <>
                    <div className="blue-cube">
                      <span />
                    </div>
                    <div className="blue-ring" />
                    <div className="blue-orb" />
                    <span className="poster-art-symbol">⌘</span>
                  </>
                )}
              </div>

              <div className="poster-category">{workshop.category} / 2026</div>
              <h3>{workshop.title}</h3>

              <div className="poster-description">
                <p>{workshop.description}</p>
              </div>

              <div className="poster-meta">
                <span>{workshop.date}</span>
                <span>{workshop.time}</span>
                <span>{workshop.venue}</span>
              </div>

              <div className="poster-footer">
                <div className="seat-count">
                  <strong>{workshop.seats}</strong>
                  <span>
                    SEATS
                    <br />
                    LEFT
                  </span>
                </div>

                <button
                  type="button"
                  className="poster-register"
                  onClick={() => openRegistration(workshop)}
                  disabled={workshop.seats <= 0}
                >
                  {workshop.seats <= 0 ? "FULL" : "I'M IN"}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>

              <div className="poster-side-word" aria-hidden="true">
                {workshop.accent === "pink"
                  ? "CREATE"
                  : workshop.accent === "lime"
                    ? "IMAGINE"
                    : "CONNECT"}
              </div>
            </article>
          ))}
        </div>

        {visibleWorkshops.length === 0 && (
          <p className="empty-state">Nothing here yet. Try another category.</p>
        )}

        <div className="below-lineup">
          <span>GOOD THINGS HAPPEN WHEN YOU SHOW UP.</span>
          <span>MORE EXPERIENCES COMING SOON ↗</span>
        </div>
      </section>

      <section className="clubs-section" id="clubs">
        <div className="clubs-heading">
          <p className="eyebrow dark-eyebrow">
            <span className="tiny-cross">✳</span> THE CAMPUS COMMUNITY
          </p>
          <h2>
            Find your
            <br />
            <span>people.</span>
          </h2>
          <p className="clubs-intro">
            Explore campus communities, discover what they're about, and
            connect with people who share your interests.
          </p>
        </div>

        <div className="clubs-grid">
          {clubs.map((club, index) => (
            <article className="club-card" key={club.name}>
              <div className={`club-mark club-mark-${index % 4}`}>
                {club.name
                  .split(" ")
                  .filter(Boolean)
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 3)
                  .toUpperCase()}
              </div>

              <div className="club-info">
                <h3>{club.name}</h3>
                <p>{club.category}</p>
              </div>

              {club.instagram ? (
                <a
                  className="club-instagram"
                  href={club.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${club.name} on Instagram`}
                >
                  Instagram <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="club-coming-soon">LINK SOON</span>
              )}
            </article>
          ))}
        </div>

        <p className="clubs-note">
          Club details and links are provided for discovery. Follow each club
          for its latest updates.
        </p>
      </section>

      <section className="manifesto" id="about">
        <div className="manifesto-art" aria-hidden="true">
          <div className="manifesto-star">✳</div>
          <div className="manifesto-ring" />
          <div className="manifesto-block">
            DO
            <br />
            THE
            <br />
            <span>THING.</span>
          </div>
          <div className="manifesto-small">
            NO MORE
            <br />
            SOMEDAY.
          </div>
        </div>

        <div className="manifesto-copy">
          <p className="eyebrow">
            <span className="live-dot" />
            WHY EVENTEASE?
          </p>
          <h2>
            Your curiosity
            <br />
            deserves a
            <br />
            <span>calendar invite.</span>
          </h2>
          <p>
            You don't need to have it all figured out. Just bring your
            curiosity. Learn alongside people who are building, experimenting
            and figuring it out too.
          </p>
          <a className="manifesto-link" href="#workshops">
            FIND YOUR NEXT THING <span>↗</span>
          </a>
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">
            e<span>✳</span>
          </span>
          <span>
            eventease<span className="brand-period">.</span>
          </span>
        </a>
        <span>MADE FOR THE CURIOUS.</span>
        <a href="#home">BACK TO TOP ↑</a>
        <span className="footer-year">© 2026</span>
      </footer>

      {selectedWorkshop && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeRegistration();
          }}
        >
          <section
            className={`registration-modal modal-${selectedWorkshop.accent}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={closeRegistration}
              aria-label="Close registration"
              disabled={submitting}
            >
              ×
            </button>

            {status.type === "success" ? (
              <div className="success-content">
                <div className="success-symbol">✓</div>
                <p className="eyebrow dark-eyebrow">YOU'RE ON THE LIST</p>
                <h2 id="modal-title">
                  See you
                  <br />
                  <span>there.</span>
                </h2>
                <p>{status.message}</p>
                <p className="success-details">
                  {selectedWorkshop.title}
                  <br />
                  {selectedWorkshop.date} · {selectedWorkshop.time}
                </p>
                <button
                  type="button"
                  className="modal-submit"
                  onClick={() => setSelectedWorkshop(null)}
                >
                  BACK TO THE LINEUP <span>↗</span>
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow dark-eyebrow">
                  <span className="tiny-cross">✳</span> YOUR NEXT CHAPTER
                </p>

                <div className="modal-heading-art" aria-hidden="true">
                  <span>{selectedWorkshop.icon}</span>
                </div>

                <p className="modal-category">
                  {selectedWorkshop.category} / {selectedWorkshop.date}
                </p>

                <h2 id="modal-title">
                  Save your
                  <br />
                  <span>spot.</span>
                </h2>

                <p className="modal-workshop-title">
                  {selectedWorkshop.title}
                </p>

                <div className="modal-details">
                  <span>{selectedWorkshop.time}</span>
                  <span>{selectedWorkshop.venue}</span>
                  <span>{selectedWorkshop.seats} seats left</span>
                </div>

                <form onSubmit={handleRegistration}>
                  <label htmlFor="registration-name">YOUR NAME</label>
                  <input
                    id="registration-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="What should we call you?"
                    value={form.name}
                    onChange={updateForm}
                    required
                    maxLength={100}
                    disabled={submitting}
                  />

                  <label htmlFor="registration-email">EMAIL ADDRESS</label>
                  <input
                    id="registration-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateForm}
                    required
                    maxLength={254}
                    disabled={submitting}
                  />

                  {status.message && (
                    <p className={`form-status ${status.type}`} role="alert">
                      {status.message}
                    </p>
                  )}

                  <button
                    className="modal-submit"
                    type="submit"
                    disabled={submitting || selectedWorkshop.seats <= 0}
                  >
                    {submitting ? "SAVING YOUR SPOT..." : "COUNT ME IN"}
                    <span>↗</span>
                  </button>

                  <p className="form-footnote">
                    Your details are used for this workshop registration.
                  </p>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
