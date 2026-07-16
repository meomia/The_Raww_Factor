import { Link } from "react-router-dom";

function AboutSectionHome() {
  return (
    <section
      id="about"
      className="py-5"
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <h2 className="section-title mb-4">Who is behind Rawwr?</h2>
            <p>
              At Rawwr we are dedicated to this breakthrough new technology and we want
              to make everybody able to own their own prehistoric pet! Behind Rawwr is
              a dedicated team of professors, zoologists and researchers making sure to
              deliver and develop healthy creatures home to you!
            </p>

            <Link to="/about" className="btn btn-raww-outline">
              More about us
            </Link>
          </div>

          <div className="col-lg-7">
            <img
              src="/img/AboutUsImg.png"
              alt="About us"
              className="img-fluid w-100 rounded-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSectionHome;