import React, { useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import AddedToCartMessageComponent from "../components/AddedToCartMessageComponent";
import ImageZoom from "js-image-zoom"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const ProductDetailsPage = () => {
  const dispatch = useDispatch()

  const addToCartHandler = () => {
    dispatch(addToCart())
  }

  const products = useSelector((state) => state.cart.value)
  // console.log(products)

  let options = {
    width: 400,
    zoomWidth: 500,
    fillContainer: true,
    zoomPosition: "right",
    scale: 2,
    offset: { vertical: 0, horizontal: 0 },
  }
  useEffect(() => {
    new ImageZoom(document.getElementById("first"),options)
    new ImageZoom(document.getElementById("second"),options)
    new ImageZoom(document.getElementById("third"),options)
    new ImageZoom(document.getElementById("fourth"),options)
  })

  return (
    <Container>
      <AddedToCartMessageComponent />
      <Row className="mt-5">
        <Col style={{zIndex:1}} md={4}>
          <div id="first">
            <Image crossOrigin="anonymous"
              fluid
              src="https://m.media-amazon.com/images/G/31/img21/CEPC/Electronics/Revamp/SBC/xcm_banners_13_sbc_v1_564x564_in-en._CB657839269_.jpg"
            />
          </div>
          <br />
          <div id="second">
            <Image
              fluid
              src="https://m.media-amazon.com/images/G/31/img21/CEPC/Electronics/Revamp/xcm_banners_01_feb1_564x564_in-en._CB628696172_.jpg"
            />
          </div>
          <br />
          <div id="third">
            <Image
              fluid
              src="https://m.media-amazon.com/images/G/31/img21/CEPC/Electronics/Revamp/xcm_banners_01_feb22_564x564_in-en._CB628916123_.jpg"
            />
          </div>
          <br />
          <div id="fourth">
            <Image
              fluid
              src="https://m.media-amazon.com/images/G/31/img21/CEPC/Electronics/Revamp/SBC/xcm_banners_06_sbc_v1_564x564_in-en._CB657839316_.jpg"
            />
          </div>
          <br />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup varient="flush">
                <ListGroup.Item>
                  <h1>Product Name {products}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={4} /> (1)
                </ListGroup.Item>
                <ListGroup.Item>
                  Price <span className="fw-bold">₹324</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Consequuntur repellendus explicabo quae provident, ipsa soluta
                  voluptatem adipisci quos dolore possimus culpa expedita,
                  temporibus cumque nihil quibusdam sit ipsum voluptate! Nobis?
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>Status: in stock</ListGroup.Item>
                <ListGroup.Item>
                  Price: <span className="fw-bold">₹324</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Quantity:
                  <Form.Select aria-label="Default select example">
                    <option>1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} variant="danger">Add to cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
              <ListGroup varient="flush">
                {Array.from({ length: 10 }).map((item, idx) => (
                  <ListGroup.Item key={idx}>
                    Sushant kumar <br />
                    <Rating readonly size={20} initialValue={4} /> <br />
                    30-01-2023 <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat id explicabo iste veniam, laboriosam aliquam, quod
                    quaerat consequuntur repellat soluta quam reprehenderit
                    ducimus tempora, fugit debitis? Illum, aspernatur.
                    Repellendus, accusantium?
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          <Alert variant="danger">Longin first to write a review</Alert>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Write a review</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <option>Your rating</option>
              <option value="5">(very good)</option>
              <option value="4">(good)</option>
              <option value="3">(average)</option>
              <option value="2">(bad)</option>
              <option value="1">(awful)</option>
            </Form.Select>
            <Button className="mb-3 mt-3" variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
