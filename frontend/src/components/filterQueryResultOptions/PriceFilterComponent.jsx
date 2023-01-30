import { Form } from "react-bootstrap";

const PriceFilterComponent = () => {
  return (
    <>
      <Form.Label>
        <span>Price no greater than: </span> ₹500
      </Form.Label>
      <Form.Range min={10} max={1000} step={10}/>
    </>
  );
};

export default PriceFilterComponent;
