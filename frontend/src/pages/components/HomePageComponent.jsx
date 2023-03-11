import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CategoryCard from "../../components/CategoryCard";
import MetaComponents from "../../components/MetaComponents";
import ProductCarousel from "../../components/ProductCarousel";

const HomePageComponent = ({ categories, getBestSellers }) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    getBestSellers()
      .then((data) => {
        setBestsellers(data);
      })
      .catch((er) =>
      console.log(er.response.data.message ? er.response.data.message : er.response.data)
      );
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories, getBestSellers]);

  return (
    <>
    <MetaComponents />
      <ProductCarousel bestsellers={bestsellers} />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, idx) => (
            <CategoryCard key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePageComponent;
