import { Link } from 'react-router-dom';
import '../styles/styleAboutUs.css';

export function CTABanner() {
    return (
        <section className="cta-about text-white d-flex align-items-center text-center">
            <div className="container">

                <h2 className="mb-3">Choose your new prehistoric friend</h2>

                <p className="mb-4">
                    Browse our full collection of ethically cloned prehistoric companions.
                    Find the perfect match for your home, estate, or private lagoon.
                </p>

                <Link to="/shop" className="btn btn-raww-primary">
                    View Shop
                </Link>

            </div>
        </section>
    );
}