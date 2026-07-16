import { Link } from "react-router-dom";


function HeroSectionHome() {
  return (
    <section className="hero-home text-white d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center py-5">
          <div className="col-lg-5">
            <h1 className="mb-4">Bring home a DINO&apos;saurtastic pet today!</h1>
            <Link to="/shop" className="btn btn-raww-primary">
              Shop now!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSectionHome;