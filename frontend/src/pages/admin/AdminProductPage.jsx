import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponents from "../../components/admin/AdminLinksComponents";

const AdminProductPage = () => {
  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) alert("Product deleted!");
  };

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponents />
      </Col>
      <Col md={10}>
        <h1>
          Product List{" "}
          <LinkContainer to={"/admin/create-new-product"}>
            <Button variant="primary" size="lg">
              Create New
            </Button>
          </LinkContainer>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Samsung", price: "₹25000", category: "Mobile" },
              { name: "Sony", price: "₹250000", category: "TV" },
              { name: "HP", price: "₹55000", category: "Laptop" },
            ].map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <LinkContainer to="/admin/edit-product">
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={deleteHandler}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
export default AdminProductPage;
