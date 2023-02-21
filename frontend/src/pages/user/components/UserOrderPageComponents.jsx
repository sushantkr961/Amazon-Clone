/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserOrderPageComponent = ({ getOrders }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((orders) => setOrders(orders));
  }, []);

  return (
    <Row className="m-5">
      <Col md={12}>
        <h1>My Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Order details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>Mark Laure</td>
                <td>{item.createdAt.substring(0, 10)}</td>
                <td>₹ {item.orderTotal.cartSubtotal}</td>
                <td>
                  {item.isDelivered ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  <Link to={`/user/order-details/${item._id}`}>
                    Go to order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UserOrderPageComponent;
