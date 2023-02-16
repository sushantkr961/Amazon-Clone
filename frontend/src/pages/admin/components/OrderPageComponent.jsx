/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponents from "../../../components/admin/AdminLinksComponents";

const OrderPageComponent = ({ fetchOrder }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const abctrl = new AbortController();
    fetchOrder(abctrl)
      .then((res) => setOrders(res))
      .catch((err) =>
        setOrders([
          {
            name: err.response.data.message
              ? err.response.data.message
              : err.response.data,
          },
        ])
      );

    return () => abctrl.abort();
  }, []);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponents />
      </Col>
      <Col md={10}>
        <h1>Orders</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Payment Method</th>
              <th>Order details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  {item.user !== null ? (
                    <>
                      {item.user.name} {item.user.lastName}
                    </>
                  ) : null}
                </td>
                <td>{item.createdAt.substring(0, 10)}</td>
                <td>₹ {item.orderTotal.cartSubtotal}</td>
                <td>
                  {item.isDelivered ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>{item.paymentMethod}</td>
                <td>
                  <Link to={`/admin/order-details/${item._id}`}>
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

export default OrderPageComponent;
