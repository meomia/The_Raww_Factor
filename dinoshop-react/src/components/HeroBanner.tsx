import { Link } from 'react-router-dom';
import '../styles/styleAboutUs.css';

export function HeroBanner(){
    return (
        <section className="hero-about text-white d-flex align-items-center">
            <div className="container">
                <div className = "row align-items-center">
                    <div className="col-md-6">
                    <p className="section-kicker mb-2">Our story</p>
                    <h1 className="display-4 fw-bold">About us</h1>
                    <p className="lead mt-3">
                        We are a dedicated team of palaeontologists, zoologists and researchers
                        making prehistoric companionship possible for everyone. Welcome to The Raww Factor.
                    </p>
                    <Link to="/shop" className="btn btn-raww-primary mt-2">Browse the Shop</Link>
                </div>
            </div>
            </div>
        </section>
    );
}