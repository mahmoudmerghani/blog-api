import "./AboutPage.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function AboutPage() {
    useDocumentTitle("About");
    
    return (
        <div className="about">
            <div className="about-hero">
                <div className="about-avatar">MM</div>
                <h1 className="about-name">Bitwise</h1>
                <p className="about-tagline">
                    Thoughts, ideas, and things I find interesting.
                </p>
            </div>

            <section className="about-section">
                <h2 className="about-section-title">About Me</h2>
                <p>
                    Hi! I'm Mahmoud Mirghani, a developer who enjoys writing about technology,
                    software engineering, and whatever else is on my mind. This
                    blog is where I share what I learn.
                </p>
            </section>

            <section className="about-section">
                <h2 className="about-section-title">What I Write About</h2>
                <ul className="about-topics">
                    <li>Web Development</li>
                    <li>Software Engineering</li>
                    <li>Tools &amp; Workflows</li>
                    <li>Personal Projects</li>
                </ul>
            </section>

            <section className="about-section">
                <h2 className="about-section-title">Get in Touch</h2>
                <p>
                    Have a question or just want to say hi? Feel free to reach
                    out.
                </p>
                <div className="about-links">
                    <a
                        className="about-social-btn"
                        href="https://github.com/mahmoudmerghani"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                    <a
                        className="about-social-btn about-social-btn--linkedin"
                        href="https://www.linkedin.com/in/mahmoud-mirghani-016763319/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 0 1-1.98-1.98 1.98 1.98 0 0 1 1.98-1.98 1.98 1.98 0 0 1 1.98 1.98 1.98 1.98 0 0 1-1.98 1.98zm1.956 13.019H3.379V9h3.914v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                    </a>
                    <div
                        className="about-email"
                        href="mailto:mahmoudtawfiq777@gmail.com"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2-8 5-8-5h16zm0 12H4V8.236l8 5 8-5V18z" />
                        </svg>
                        mahmoudtawfiq777@gmail.com
                    </div>
                </div>
            </section>
        </div>
    );
}
