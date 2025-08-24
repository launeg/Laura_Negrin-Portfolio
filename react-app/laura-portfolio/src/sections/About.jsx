export default function About() {
    return (
      <section id="about" className="section">
        <div className="container about">
          <div className="about-media">
            <div className="border-container">
              <img className="border" src="/Laura_Negrin-Portfolio/images/laura.jpg" alt="Laura Negrin" />
            </div>
          </div>
          <div className="about-copy">
            <h2 className="section-title">Hello</h2>
            <p>
              I'm Laura Negrin, a Computer Science graduate from Rutgers with a passion for
              cloud and web development. I enjoy solving challenging problems and building 
              solutions that make an impact.
            </p>
            <div className="about-cta">
              <a
                className="btn"
                href="/LauraResumeV1.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
              <a className="btn" href="#contact">
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
  