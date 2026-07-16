import HeroSectionHome from "../components/HeroSectionHome";
import DinoCategoriesHome from "../components/DinoCategoriesHome";
import AboutSectionHome from "../components/AboutSectionHome";
import FeaturesSectionHome from "../components/FeaturesSectionHome";
import TestimonialsSection from "../components/TestimonialsSection";
import PopularProductsSection from "../components/PopularProductsSection";
import NewsletterSection from "../components/NewsletterSection";

function HomePage() {
  return (
    <>
      
      <main>
        <HeroSectionHome />
        <PopularProductsSection />
        <DinoCategoriesHome />
        <AboutSectionHome />
        <TestimonialsSection />
        <FeaturesSectionHome />
        <NewsletterSection />
      </main>

    </>
  );
}

export default HomePage;