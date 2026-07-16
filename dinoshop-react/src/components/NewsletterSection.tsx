import { useState } from "react";

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter an email address.");
      return;
    }

    setMessage("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      className="newsletter-home text-white d-flex align-items-center"
    >
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-6">
            <h2 className="section-title mb-3">Sign up for our newsletter</h2>
            <p className="mb-4">
              Wan&apos;t to be the first for new research breakthroughs, weekly giveaways
              and sesonal discounts? Sign up now, and get 20% on a licence course!
            </p>

            <form id="newsletterForm" className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <input
                  type="email"
                  id="newsletterEmail"
                  className="form-control"
                  placeholder="E-Mail"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-raww-primary">
                  Subscribe
                </button>
              </div>

              <div className="col-12">
                <p id="newsletterMessage" className="mb-0">
                  {message}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;