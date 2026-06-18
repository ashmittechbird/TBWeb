export default function Contact() {
  return (
    <section className="section contact" id="contact" data-screen-label="Contact">
      <div className="wrap">
        <div className="contact-card reveal-up" id="contactCard">
          <div className="contact-split">
            {/* Left — heading + description + button */}
            <div className="contact-left">
              <p className="eyebrow dark"><i></i>Let's build together</p>
              <h2 className="contact-title">Let's get<br />in touch.</h2>
              <p className="contact-lead">
                Tell us about your project. We'll help you build scalable, secure, and future-ready
                technology foundations.
              </p>
              <a href="mailto:connect@techbirdit.in" className="btn-pill solid">
                <span>Start a project</span><i className="arrow"></i>
              </a>
            </div>

            {/* Right — contact details */}
            <div className="contact-right">
              <div className="contact-rows">
                <a className="contact-row" href="tel:+919766661836">
                  <span>Phone</span><strong>+91 97666 61836</strong>
                </a>
                <a className="contact-row" href="mailto:connect@techbirdit.in">
                  <span>Email</span><strong>connect@techbirdit.in</strong>
                </a>
                <a className="contact-row" href="https://techbirdit.in" target="_blank" rel="noopener">
                  <span>Web</span><strong>techbirdit.in</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
