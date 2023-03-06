import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CategoryCard from "../../components/CategoryCard";
import ProductCarousel from "../../components/ProductCarousel";

const HomePageComponent = ({ categories }) => {
  const [mainCagegories, setMainCagegories] = useState([]);

  useEffect(() => {
    setMainCagegories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);

  return (
    <>
      <ProductCarousel />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCagegories.map((category, idx) => (
            <CategoryCard key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePageComponent;
