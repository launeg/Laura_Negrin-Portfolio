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
            <h2>About Me</h2>
            <h4 className="aboutText">
            I’m a Computer Science graduate from Rutgers University with a passion for full-stack development and cloud technologies. As an AWS Cloud Support Engineer, I gained hands-on experience working with multiple AWS services, learning how they connect and identifying common issues. I enjoy learning quickly, solving challenging problems, and building solutions that make an impact. I’m now looking to focus on more creative, developer-centered projects where I can combine technical skill with thoughtful design.
            </h4>
            <div className="about-cta">
              <a
                className="btn"
                href="/Laura_Negrin-Portfolio/LauraResumeV1.pdf"
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
  