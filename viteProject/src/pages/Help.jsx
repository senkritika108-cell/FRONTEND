import React, { useState } from "react";
import "./help.css";

const faqData = [
  {
    question: "How do I request a refund?",
    answer:
      "Open the trip in your app, choose 'Get help', select the issue and request a refund. Our team will review."
  },
  {
    question: "I experienced an issue during my ride — what now?",
    answer:
      "Use 'Help' in the app for that trip or contact support below. For urgent safety concerns, call local emergency services first."
  },
  {
    question: "How do I change my payment method?",
    answer:
      "Go to Wallet/Payments in the app, add or select a payment method and set it as default."
  }
];

const faqCards = [
  {
    title: "How do I get a receipt?",
    desc: "Open the trip in your app, tap 'Receipt' and email or download it.",
    linkText: "Learn more →",
    link: "#"
  },
  {
    title: "I left something in a ride",
    desc: "Use 'Your Trips' → select trip → 'I lost an item' to contact your driver.",
    linkText: "Report lost item →",
    link: "#"
  },
  {
    title: "How are fares calculated?",
    desc: "Fares depend on distance, time, taxes and applicable fees. Surge pricing may apply.",
    linkText: "Fare details →",
    link: "#"
  },
  {
    title: "Cancel a trip",
    desc: "You can cancel from the app; cancellation fees may apply after driver accepts.",
    linkText: "Cancel trip →",
    link: "#"
  }
];

export default function Help() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const filteredFaqCards = faqCards.filter(
    (card) =>
      card.title.toLowerCase().includes(search.toLowerCase()) ||
      card.desc.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFaqData = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="help-root">
      <header className="hc-header" role="banner" aria-label="Help header">
        <div className="hc-container">
          <a className="logo" href="/">
            UBER
          </a>
          <nav className="top-nav" aria-label="Top navigation">
            <a href="/ride">Ride</a>
            <a href="/drive">Drive</a>
            <a href="/help" className="active">
              Help
            </a>
            <a href="/login">Log in</a>
          </nav>
        </div>
      </header>

      <main className="hc-main" id="main" role="main">
        <section className="hero">
          <div className="hc-container">
            <h1>How can we help?</h1>
            <p className="lead">
              Find answers, contact support, or browse common issues for rides and drivers.
            </p>

            <div className="search-form">
              <input
                type="search"
                placeholder="Search for: refunds, receipts, lost item..."
                aria-label="Search help"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section id="faqs" className="hc-section">
          <div className="hc-container">
            <h2>Popular help topics</h2>
            <div className="faq-grid">
              {filteredFaqCards.map((card, i) => (
                <article className="faq-card" key={i}>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <a href={card.link} className="more">
                    {card.linkText}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="detailed-faq" className="hc-section">
          <div className="hc-container">
            <h2>Frequently asked questions</h2>
            <div className="accordion">
              {filteredFaqData.map((item, i) => (
                <div key={i}>
                  <button
                    className={`acc-toggle ${openIndex === i ? "open" : ""}`}
                    aria-expanded={openIndex === i}
                    onClick={() => toggleAccordion(i)}
                  >
                    {item.question}
                  </button>
                  <div
                    className="acc-panel"
                    style={{
                      maxHeight: openIndex === i ? "200px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.25s ease"
                    }}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="hc-section contact-section">
          <div className="hc-container">
            <h2>Contact support</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <h3>Chat with us</h3>
                <p>
                  Fastest way — open the Help section in your app and choose Chat support.
                </p>
                <a className="btn" href="#">
                  Start chat
                </a>
              </div>

              <div className="contact-card">
                <h3>Call support</h3>
                <p>
                  Available 24/7 in many regions. Local numbers shown in the app.
                </p>
                <a className="btn" href="tel:+18001234567">
                  Call +1 (800) 123-4567
                </a>
              </div>

              <div className="contact-card">
                <h3>Email</h3>
                <p>Send details and screenshots. Please include trip ID if available.</p>
                <a className="btn" href="mailto:support@uber.mock">
                  support@uber.mock
                </a>
              </div>

              <div className="contact-card">
                <h3>Lost & Found</h3>
                <p>Report items left in vehicles and we'll connect you with the driver.</p>
                <a className="btn" href="#">
                  Report lost item
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="safety" className="hc-section safety">
          <div className="hc-container">
            <h2>Safety & Privacy</h2>
            <p>
              We take safety seriously. Read our guidelines on rider safety and how to report safety issues.
            </p>
            <a className="link" href="#">
              Safety guidelines →
            </a>
          </div>
        </section>
      </main>

      <footer className="hc-footer" role="contentinfo">
        <div className="hc-container">
          <div className="footer-left">
            <a className="logo" href="/">
              UBER
            </a>
            <p className="muted">© 2025 Uber Mock. This is a demo help page.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Accessibility</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
