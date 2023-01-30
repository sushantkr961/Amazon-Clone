import React from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";

const CartItemComponent = () => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image crossOrigin="anonymous"
              src="https://m.media-amazon.com/images/G/31/img21/CEPC/Electronics/Revamp/SBC/xcm_banners_06_sbc_v1_564x564_in-en._CB657839316_.jpg"
              fluid
            />
          </Col>
          <Col md={2}>
            Logitech <br />
            Gaming
          </Col>
          <Col md={2}>
            <b>₹124</b>
          </Col>
          <Col md={3}>
            <Form.Select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.confirm("Are you sure?")}
            >
              <i className="bi bi-trash"></i>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  );
};

export default CartItemComponent;
