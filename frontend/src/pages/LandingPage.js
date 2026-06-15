import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import studentHero from "../assets/student.png";
import logo from "../assets/logo.png";

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="cp-page">
      {/* ===== Top Navigation Bar ===== */}
      <header className={`cp-navbar ${scrolled ? "is-scrolled" : ""}`}>
        <div className="cp-container cp-nav-inner">
          <a href="/" className="cp-brand" aria-label="Career Pathway home">
            <img src={logo} alt="Career Pathway" className="cp-brand-logo" style={{ height: 200 }} />
          </a>

          <nav className="cp-nav-links" aria-label="Primary">
            <a href="#features" onClick={scrollToId("features")}>Features</a>
            <a href="#about" onClick={scrollToId("about")}>About</a>
            <a href="#process" onClick={scrollToId("process")}>How it works</a>
          </nav>

          <div className="cp-nav-actions">
            <Link to="/login" className="cp-btn cp-btn-ghost">Log in</Link>
            <Link to="/signup" className="cp-btn cp-btn-primary">Get Started</Link>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="cp-hero">
        <div className="cp-hero-bg" aria-hidden="true">
          <div className="cp-hero-blob cp-hero-blob-1" />
          <div className="cp-hero-blob cp-hero-blob-2" />
          <div className="cp-hero-grid" />
        </div>

        <div className="cp-container cp-hero-inner">
          <div className="cp-hero-copy">
            <span className="cp-eyebrow">
              <span className="cp-eyebrow-dot" /> For Cameroonian Students
            </span>
            <h1 className="cp-hero-title">
              Find your path from <span className="cp-accent">classroom</span><br />
              to <span className="cp-underline">career</span>.
            </h1>
            <p className="cp-hero-sub">
              Explore university programs, understand admission requirements,
              and discover the career paths waiting for you after secondary school —
              all tailored to Cameroon.
            </p>

            <div className="cp-hero-ctas">
              <Link to="/signup" className="cp-btn cp-btn-primary cp-btn-lg">
                Start Exploring <span aria-hidden="true">→</span>
              </Link>
              <a href="#process" onClick={scrollToId("process")} className="cp-btn cp-btn-outline cp-btn-lg">
                How it works
              </a>
            </div>

            
          </div>

          <div className="cp-hero-art">
            <div className="cp-hero-art-frame">
              <img src={studentHero} alt="Smiling student holding a laptop and books" />

              

              
            </div>
          </div>
        </div>
      </section>

      {/* ===== Marquee strip ===== */}
      <section className="cp-strip" aria-label="Coverage">
  <div className="cp-container cp-strip-inner">
    <span className="cp-strip-label">Explore</span>
    <div className="cp-strip-track">
      <span>University Programs</span><span>·</span>
      <span>Careers</span><span>·</span>
      <span>Concours</span><span>·</span>
      <span>University Programs</span><span>·</span>
      <span>Careers</span><span>·</span>
      <span>Concours</span>
    </div>
  </div>
</section>

      {/* ===== Features ===== */}
      <section className="cp-features" id="features">
        <div className="cp-container">
          <div className="cp-section-head">
            <span className="cp-kicker">What we offer</span>
            <h2>Everything you need to <span className="cp-accent">plan your future</span></h2>
            <p>Three focused tools to guide every step of your academic journey.</p>
          </div>

          <div className="cp-bento">
            <article className="cp-bento-card cp-bento-large">
              <div className="cp-card-icon">🎯</div>
              <h3>Explore Careers</h3>
              <p>
                Discover careers that match your interests and learn exactly what
                it takes to get there in the Cameroonian job market.
              </p>
              <span className="cp-card-tag">Career insights</span>
            </article>

            <article className="cp-bento-card">
              <div className="cp-card-icon cp-card-icon-orange">🎓</div>
              <h3>Find Programs</h3>
              <p>
                Browse university programs and check admission requirements
                before you apply.
              </p>
            </article>

            <article className="cp-bento-card ">
              <div className="cp-card-icon cp-card-icon-light">📚</div>
              <h3>Prepare for Concours</h3>
              <p>
                Stay updated on upcoming competitive entrance examinations,
                requirements, and deadlines.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="cp-about" id="about">
        <div className="cp-container">
          <div className="cp-about-head">
            <div>
              <span className="cp-kicker">About</span>
              <h2>Built for Cameroonian secondary school students.</h2>
            </div>
            <p>
              Career Pathway centralises everything GCE O-Level and A-Level students
              need to make informed decisions about university and beyond.
            </p>
          </div>

          <div className="cp-about-grid">
            <div className="cp-about-card">
              <div className="cp-card-icon">🏫</div>
              <h3>What is Career Pathway?</h3>
              <p>
                A web platform designed to help students in Cameroon make informed
                decisions about their university education and career futures.
              </p>
            </div>

            <div className="cp-about-card">
              <div className="cp-card-icon cp-card-icon-orange">🤖</div>
              <h3>Smart Recommendations</h3>
              <p>
                Our engine analyses your favourite subjects and interests to suggest
                university programs that fit your academic profile.
              </p>
            </div>

            <div className="cp-about-card">
              <div className="cp-card-icon">🗺️</div>
              <h3>How it works</h3>
              <p>
                Set up your profile, pick your subjects and interests, and instantly
                get matched programs, careers, and concours updates.
              </p>
            </div>

            <div className="cp-about-card">
              <div className="cp-card-icon cp-card-icon-orange">🎓</div>
              <h3>Universities Covered</h3>
              <p>
                Currently covering the University of Buea and the University of
                Bamenda with detailed program and admission information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="cp-process" id="process">
        <div className="cp-container">
          <div className="cp-section-head">
            <span className="cp-kicker">Three steps</span>
            <h2>From sign-up to <span className="cp-accent">a clear plan</span></h2>
          </div>

          <div className="cp-steps">
            <div className="cp-step">
              <div className="cp-step-num">01</div>
              <h4>Create your profile</h4>
              <p>Sign up and tell us your subjects and interests.</p>
            </div>
            <div className="cp-step">
              <div className="cp-step-num">02</div>
              <h4>Get recommendations</h4>
              <p>We match you to the best university programs in Cameroon.</p>
            </div>
            <div className="cp-step">
              <div className="cp-step-num">03</div>
              <h4>Plan your future</h4>
              <p>Explore careers, programs, and concours all in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="cp-cta">
        <div className="cp-container cp-cta-inner">
          <div>
            <h2>Your future starts with one decision.</h2>
            <p>Join thousands of students mapping out their path with Career Pathway.</p>
          </div>
          <Link to="/signup" className="cp-btn cp-btn-primary cp-btn-lg">
            Create free account
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="cp-footer">
        <div className="cp-container cp-footer-inner">
          <div className="cp-footer-brand">
            <img src={logo} alt="Career Pathway" className="cp-footer-logo" />
            <p>Helping Cameroonian students find their path from classroom to career.</p>
          </div>
          <div className="cp-footer-cols">
            <div>
              <h5>Platform</h5>
              <a href="#features" onClick={scrollToId("features")}>Features</a>
              <a href="#about" onClick={scrollToId("about")}>About</a>
              <a href="#process" onClick={scrollToId("process")}>How it works</a>
            </div>
            <div>
              <h5>Account</h5>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
            <div>
              <h5>Legal</h5>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="cp-container cp-footer-bottom">
          <p>© {new Date().getFullYear()} Career Pathway · Built for students in Cameroon</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;