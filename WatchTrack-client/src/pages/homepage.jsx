import CategoryCarousel from "../components/CategoryCarousel";
import HeroBanner from "../components/HeroBanner";
import { Container } from "@mantine/core";

function Homepage() {
    return (
        <div>
            <HeroBanner />
            <Container size="xl" style={{ padding: "20px 0" }}>
                <div className="carousel-section">
                    <CategoryCarousel title="Trending Now" category="Trending Now" />
                    <CategoryCarousel title="New Releases" category="New Releases" />
                    <CategoryCarousel title="Popular Movies" category="Popular Movies" />
                </div>
            </Container>
        </div>
    );
}

export default Homepage;