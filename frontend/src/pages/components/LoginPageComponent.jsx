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
import { Link, useNavigate } from "react-router-dom";

const LoginPageComponent = ({ loginUserApiRequest }) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseState({ loading: true });
      loginUserApiRequest(email, password, doNotLogout)
        .then((res) => {
          console.log(res);
          setLoginUserResponseState({
            success: res.success,
            loading: false,
            error: "",
          });
          if (
            res.success === "Login successfully" &&
            !res.userLoggedIn.isAdmin
          ) {
            navigate("/user", { replace: true }); // replace:true means if we move to next page after successfull login then when we click we want to go back then login page is not shown if it is not given or rplace is false then it will back to login page
          } else {
            navigate("/admin/orders", { replace: true });
          }
        })
        .catch((err) =>
          setLoginUserResponseState({
            error: err.response.data.message
              ? err.response.data.message
              : err.response.data,
          })
        );
    }

    setValidated(true);
  };

  return (
    <>
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={6}>
            <h1>Login</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="doNotLogout"
                  label="Remember me"
                />
              </Form.Group>
              <Row className="pb-2">
                <Col>
                  New to Amazon? <Link to={"/register"}> Register </Link>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                {loginUserResponseState &&
                loginUserResponseState.loading === true ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}
                Login
              </Button>
              <Alert
                show={
                  loginUserResponseState &&
                  loginUserResponseState.error === "wrong credentials"
                }
                variant="danger"
              >
                Wrong credentials!
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPageComponent;
