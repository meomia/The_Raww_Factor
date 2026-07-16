import { Link } from "react-router-dom";

function DinoCategoriesHome() {
  return (
    <section
      id="shop"
      className="py-5 py-lg-6"
      style={{
        backgroundColor: "var(--surface)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title mb-3">What rawwr you looking for?</h2>
          <p className="muted mx-auto" style={{ maxWidth: "720px" }}>
            We have dinosaurs for all! If your into history or fashion, we got it!
            Search through our catalogue to find your new DINO baby.
          </p>
        </div>

        <div className="row justify-content-center g-4">
          <div className="col-6 col-md-3 col-lg-2">
            <Link to="/shop" className="text-decoration-none d-block text-center">
              <div className="img-placeholder mb-3">
                <img
                  src="/img/Herbivore.png"
                  alt="Herbivores"
                  className="img-fluid rounded-3"
                />
              </div>
              <h6 className="mb-0">Herbivores</h6>
            </Link>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <Link to="/shop" className="text-decoration-none d-block text-center">
              <div className="img-placeholder mb-3">
                <img
                  src="/img/Carnivore.png"
                  alt="Carnivores"
                  className="img-fluid rounded-3"
                />
              </div>
              <h6 className="mb-0">Carnivores</h6>
            </Link>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <Link to="/shop" className="text-decoration-none d-block text-center">
              <div className="img-placeholder mb-3">
                <img
                  src="/img/Jurassic.png"
                  alt="Jurassic"
                  className="img-fluid rounded-3"
                />
              </div>
              <h6 className="mb-0">Jurassic</h6>
            </Link>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <Link to="/shop" className="text-decoration-none d-block text-center">
              <div className="img-placeholder mb-3">
                <img
                  src="/img/Jurassic.png"
                  alt="See all"
                  className="img-fluid rounded-3"
                />
              </div>
              <h6 className="mb-0">See all</h6>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DinoCategoriesHome;