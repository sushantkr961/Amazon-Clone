import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [validated, setValidated] = useState(false);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmPassword]");

    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Passwords do not match");
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={6}>
            <h1>Create Account</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Your last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter last name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  name="email"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter valid email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  minLength={6}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter valid password
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Password should have at least 6 characters
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="passsowrd"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  minLength={6}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Both password should match
                </Form.Control.Feedback>
              </Form.Group>
              <Row className="pb-2">
                <Col>
                  Already have an account? <Link to={"/login"}> Login </Link>
                </Col>
              </Row>
              <Button type="submit">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Submit
              </Button>
              <Alert show={true} variant="danger">
                User with that email already exists!
              </Alert>
              <Alert show={true} variant="info">
                User Registered successfully.
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
