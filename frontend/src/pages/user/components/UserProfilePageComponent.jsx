/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

const UserProfilePageComponent = ({
  updateUserApiRequest,
  fetchUser,
  userInfoFromRedux,
  setReduxUserState,
  reduxDispatch,
  localStorage,
  sessionStorage,
}) => {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    success: "",
    error: "",
  });
  const [passsowrdMatchState, setPasswordMatchState] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser(userInfoFromRedux._id)
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [userInfoFromRedux._id]);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );

    if (confirmPassword.value === password.value) {
      setPasswordMatchState(true);
    } else {
      setPasswordMatchState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const country = form.country.value;
    const pinCode = form.pinCode.value;
    const city = form.city.value;
    const state = form.state.value;
    const password = form.password.value;

    if (
      event.currentTarget.checkValidity() === true &&
      form.password.value === form.confirmPassword.value
    ) {
      updateUserApiRequest(
        name,
        lastName,
        phoneNumber,
        address,
        country,
        pinCode,
        city,
        state,
        password
      )
        .then((data) => {
          //   console.log(data);
          setUpdateUserResponseState({ success: data.success, error: "" });
          reduxDispatch(
            setReduxUserState({
              doNotLogout: userInfoFromRedux.doNotLogout,
              ...data.userUpdated,
            })
          );
          if (userInfoFromRedux.doNotLogout) {
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: true, ...data.userUpdated })
            );
          }
        })
        .catch((er) =>
          setUpdateUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
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
            <h1>Your Profile</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={user.name}
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
                  defaultValue={user.lastName}
                  name="lastName"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter last name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  disabled
                  value={
                    user.email +
                    " if you want to change email,remove account and create a new one"
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  placeholder="Enter your phone number"
                  defaultValue={user.phoneNumber}
                  name="phoneNumber"
                  maxLength={10}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Enter Address</Form.Label>
                <Form.Control
                  placeholder="Enter your address"
                  defaultValue={user.address}
                  name="address"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  placeholder="Enter your Country Name"
                  defaultValue={user.country}
                  name="country"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicZip">
                <Form.Label>PIN Code</Form.Label>
                <Form.Control
                  placeholder="Enter your PIN Code"
                  defaultValue={user.pinCode}
                  name="pinCode"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder="Enter your city"
                  defaultValue={user.city}
                  name="city"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  placeholder="Enter your State Name"
                  defaultValue={user.state}
                  name="state"
                />
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
                  isInvalid={!passsowrdMatchState}
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
                  isInvalid={!passsowrdMatchState}
                />
                <Form.Control.Feedback type="invalid">
                  Both password should match
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
              <Alert
                show={
                  updateUserResponseState &&
                  updateUserResponseState.error !== ""
                }
                variant="danger"
              >
                User with that email already exists!
              </Alert>
              <Alert
                show={
                  updateUserResponseState &&
                  updateUserResponseState.success ===
                    "user updated successfully"
                }
                variant="info"
              >
                User Details Updated successfully.
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfilePageComponent;
