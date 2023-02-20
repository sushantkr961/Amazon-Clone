import React from "react";
import { Button } from "react-bootstrap";

const RemoveFromCartComponent = ({
  orderCreated,
  productID,
  quantity,
  price,
  removeFromCartHandler,
}) => {
  return (
    <Button
      disabled={orderCreated}
      type="button"
      variant="secondary"
      onClick={
        removeFromCartHandler
          ? () => removeFromCartHandler(productID, quantity, price)
          : undefined
      }
    >
      <i className="bi bi-trash"></i>
    </Button>
  );
};

export default RemoveFromCartComponent;
