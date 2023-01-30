import React from "react";
import { Container, Row } from "react-bootstrap";
import CategoryCard from "../components/CategoryCard";
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
  const catgo = [
    "Books",
    "Mobile",
    "Television",
    "Laptop",
    "Kitchen",
    "Stationary",
    "Accessories",
    "Monitor",
    "PC components",
  ];

  return (
    <>
      <ProductCarousel />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {catgo.map((category, idx) => (
            <CategoryCard key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
