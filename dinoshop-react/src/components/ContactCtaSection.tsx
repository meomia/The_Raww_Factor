import { Link } from "react-router-dom";

function ContactCtaSection() {
  return (
    <section className="py-5" style={{ backgroundColor: "var(--bg)" }}>
      <div className="container">
        <div className="form-page-cta text-center p-5 rounded">
          <h2>Explore Your Options</h2>
          <p className="mb-4 text-muted">
            Find the right match in our Dino Shop. Start with a surprise egg or
            a trained dino by our surviving team.
          </p>
          <Link to="/shop" className="btn btn-raww-outline">
            New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ContactCtaSection;