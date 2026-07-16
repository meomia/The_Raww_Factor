import { HeroBanner } from "../components/HeroBanner";
import { StatisticsBanner } from "../components/StatisticsBanner";
import { TeamBanner } from "../components/TeamBanner";
import { StoryBanner } from "../components/StoryBanner";
import { RatingsBanner } from "../components/RatingsBanner";
import { CTABanner } from "../components/CTABanner";

export function AboutPage() {
    return (
        <main>
            <HeroBanner />
            <StatisticsBanner />
            <TeamBanner />
            <StoryBanner />
            <RatingsBanner />
            <CTABanner />
        </main>
    );
}

