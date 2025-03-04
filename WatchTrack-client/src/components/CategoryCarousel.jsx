import { Carousel } from "@mantine/carousel";
import { Card, Image, Text } from "@mantine/core";
import "@mantine/carousel/styles.css";

const movies = [
  { title: "Movie 1", image: "https://placehold.co/400x200" },
  { title: "Movie 2", image: "https://placehold.co/400x200" },
  { title: "Movie 3", image: "https://placehold.co/400x200" },
  { title: "Movie 4", image: "https://placehold.co/400x200" },
  { title: "Movie 5", image: "https://placehold.co/400x200" },
  { title: "Movie 6", image: "https://placehold.co/400x200" },
  { title: "Movie 7", image: "https://placehold.co/400x200" },
  { title: "Movie 8", image: "https://placehold.co/400x200" },
  { title: "Movie 9", image: "https://placehold.co/400x200" },
  { title: "Movie 10", image: "https://placehold.co/400x200" },
];

const CategoryCarousel = ({ title }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <Text size="xl" weight={700} mb="sm">
        {title}
      </Text>
      <Carousel
        withIndicators
        height={200}
        slideSize="33.333333%"
        slideGap="md"
        align="start"
        slidesToScroll={3}
      >
        {movies.map((movie, index) => (
          <Carousel.Slide key={index}>
            <Card shadow="sm" padding="lg">
              <Card.Section>
                <Image src={movie.image} height={160} alt={movie.title} />
              </Card.Section>
              <Text align="center" mt="sm">
                {movie.title}
              </Text>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
