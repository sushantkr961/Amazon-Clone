import React from "react";
import { Alert, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

const CartPageComponent = ({
  addToCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
  removeFromCart
}) => {
  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID,quantity,price) => {
    if(window.confirm("Are you sure?")){
       reduxDispatch(removeFromCart(productID,quantity,price))
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Alert variant="info">Your cart is empty</Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemComponent
                  key={idx}
                  changeCount={changeCount}
                  item={item}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>
                Subtotal ({cartItems.length}{" "}
                {cartItems.length === 1 ? "Product" : "Products"})
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <span className="fw-bold">{cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to={"/user/cart-details"}>
                <Button disabled={cartSubtotal === 0} type="button">
                  Proceed To Checkout
                </Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPageComponent;
