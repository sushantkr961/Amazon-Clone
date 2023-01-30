import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Container } from "react-bootstrap";

const ProductCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            crossOrigin="anonymous"
            className="d-block w-100"
            //   style={{height: "300px", objectFit: "cover"}}
            src="https://m.media-amazon.com/images/I/610Q56vDdSL._SX3000_.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <LinkContainer
              style={{ cursor: "pointer" }}
              to={"/product-details"}
            >
              <h3>First slide label</h3>
            </LinkContainer>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://m.media-amazon.com/images/I/71dGRnnXNZL._SX3000_.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <LinkContainer
              style={{ cursor: "pointer" }}
              to={"/product-details"}
            >
              <h3>Second slide label</h3>
            </LinkContainer>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://m.media-amazon.com/images/I/91lLq8EGu1L._SX3000_.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <LinkContainer
              style={{ cursor: "pointer" }}
              to={"/product-details"}
            >
              <h3>Third slide label</h3>
            </LinkContainer>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default ProductCarousel;
