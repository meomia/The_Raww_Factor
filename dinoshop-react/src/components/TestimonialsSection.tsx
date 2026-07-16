function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="testimonials-home text-white d-flex align-items-center"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h2 className="section-title mb-5">What our Customers say?</h2>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex gap-3 align-items-center">
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: "var(--surface2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i
                        className="bi bi-person-fill"
                        style={{ fontSize: "1.8rem", color: "var(--accent)" }}
                      ></i>
                    </div>
                    <div>
                      <h5 className="mb-1">Karen Durant</h5>
                      <p className="text-warning mb-2">★★★★★</p>
                      <p className="mb-0 card-text">
                        &quot;Ever since I got a little T-rex my teenagers have been acting
                        so nicely, they really love it!&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex gap-3 align-items-center">
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: "var(--surface2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i
                        className="bi bi-person-fill"
                        style={{ fontSize: "1.8rem", color: "var(--accent)" }}
                      ></i>
                    </div>
                    <div>
                      <h5 className="mb-1">Peter Pandus</h5>
                      <p className="text-warning mb-2">★★★★★</p>
                      <p className="mb-0 card-text">
                        &quot;At fashion week a Pterodactyl is a must! I trained mine to film
                        me — personal drone is a totally new vibe!&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;