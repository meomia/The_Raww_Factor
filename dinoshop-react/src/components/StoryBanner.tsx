export function StoryBanner() {
    return(
        <section className="py-5" style={{backgroundColor:'var(--surface)'}}>
            <div className="container">
                <div className="row g-5 align-items-start">

                    <div className="col-lg-6 text-end">
                        <img src="/img/AboutUsImg.png" className="img-fluid" alt="About Us" />
                    </div>

                    <div className="col-lg-6">
                        <h2 className="display-5 fw-bold mb-4">Our Story & Mission</h2>
                        <h5 className="mb-3">Once upon a time...</h5>
                        <p className="text-muted">
                            The Raww Factor was born from a simple question — why should dinosaurs stay extinct? 
                            Our team spent a decade perfecting ethical cloning technology to bring prehistoric 
                            companions back to life. Today we ship to customers worldwide, from tiny Archaeopteryx 
                            to full-grown Brachiosaurus.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}