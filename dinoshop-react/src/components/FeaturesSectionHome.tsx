function FeaturesSectionHome() {
  return (
    <section
      id="features"
      className="py-5"
      style={{
        backgroundColor: "var(--surface)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="h-100">
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-surface)",
                  background: "var(--surface2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <i
                  className="bi bi-eyedropper"
                  style={{ fontSize: "1.6rem", color: "var(--accent)" }}
                ></i>
              </div>
              <h5>Ethically cloned</h5>
              <p className="mb-0">
                We source our resources for cloning ethically and safely!
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="h-100">
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-surface)",
                  background: "var(--surface2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <i
                  className="bi bi-shield-check"
                  style={{ fontSize: "1.6rem", color: "var(--accent)" }}
                ></i>
              </div>
              <h5>Armoured delivery</h5>
              <p className="mb-0">
                Your new dinosaur pet will be delivered safely in a specially designed
                package!
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="h-100">
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-surface)",
                  background: "var(--surface2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <i
                  className="bi bi-headset"
                  style={{ fontSize: "1.6rem", color: "var(--accent)" }}
                ></i>
              </div>
              <h5>Expert support</h5>
              <p className="mb-0">
                Need help? We have experts on the line 24/7 making sure everything is
                alright between you and your pet!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSectionHome;