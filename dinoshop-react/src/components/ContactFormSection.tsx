import { useState } from "react";

function ContactFormSection() {
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!acceptedPolicy) {
      setFeedbackMessage("Please accept the Privacy Policy.");
      return;
    }

    setFeedbackMessage("Your message has been sent.");
    setEmail("");
    setMessageText("");
    setAcceptedPolicy(false);
  };

  return (
    <section
      className="form-page-section"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="container">
        <div className="row align-items-start g-5">
          <div className="col-lg-5">
            <div className="card shadow p-4 form-card">
              <h1 className="fw-bold mb-3">Send Us a Message</h1>
              <p className="text-muted mb-4">
                Did your Dino eat the couch? Are you looking for a friendly Dino?
                Send us a message and we will get back to you in no time.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="contactEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="contactEmail"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contactText" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="contactText"
                    name="message"
                    rows={5}
                    placeholder="Type your message"
                    required
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="privacyPolicy"
                    checked={acceptedPolicy}
                    onChange={(event) => setAcceptedPolicy(event.target.checked)}
                    required
                  />
                  <label className="form-check-label" htmlFor="privacyPolicy">
                    I have read and accept the Privacy Policy.
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>

                <p className="mt-3 mb-0">{feedbackMessage}</p>
              </form>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="contact-visual-card">
              <img
                src="/img/Jurassic.png"
                className="img-fluid w-100 rounded"
                alt="Featured location map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFormSection;