import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
    return (
        <section id="contact" className="section">
            <div className="container">
                <div className="contact-card">
                    <h2 className="section-title">Contact Me</h2>
                    <p className="section-subtitle">
                        I'd love to connect — reach out via LinkedIn, GitHub, or Email.
                    </p>

                    <div className="contact-buttons">
                        <a
                        href="https://www.linkedin.com/in/laura-negrin-a6b05a198/"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-btn"
                    >
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </a>
                    <a
                        href="https://github.com/launeg"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-btn"
                    >
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                    </a>
                    <a href="mailto:youremail@example.com" className="contact-btn">
                        <FontAwesomeIcon icon={faEnvelope} size="2x" />
                    </a>
                    </div>
                </div>
            </div>
        </section>
    );
}