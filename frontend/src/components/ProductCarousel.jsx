import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Container } from "react-bootstrap";

const ProductCarousel = ({ bestsellers }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return bestsellers.length > 0 ? (
    <Container>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {bestsellers.map((item, idx) => (
          <Carousel.Item key={idx}>
            <img
              crossOrigin="anonymous"
              className="d-block w-100"
              //   style={{height: "300px", objectFit: "cover"}}
              src={item.images?item.images[0].path:null}
              alt="First slide"
            />
            <Carousel.Caption>
              <LinkContainer
                style={{ cursor: "pointer" }}
                to={`/product-details/${item._id}`}
              >
                <h3>Bestseller in {item.category} Category</h3>
              </LinkContainer>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  ) : null;
};

export default ProductCarousel;
