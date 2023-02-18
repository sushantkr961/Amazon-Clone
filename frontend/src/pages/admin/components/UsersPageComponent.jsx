/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponents from "../../../components/admin/AdminLinksComponents";
import { logout } from "../../../redux/actions/userAction";

const UsersPageComponent = ({ fetchUsers, deleteUser }) => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteUser(userId);
      if (data === "user removed successfully") {
        setUserDeleted(true);
      }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController(); // JS inbuilt function check mdn
    // by using AbortController when users come on this page then it connected to db otherwise disconnected automatically for this page
    fetchUsers(abctrl)
      .then((res) => setUsers(res))
      .catch(
        (err) => dispatch(logout())
        // console.log(
        //   err.response.data.message
        //     ? err.response.data.message
        //     : err.response.data
        // )
      );
    return () => abctrl.abort();
  }, [userDeleted]);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponents />
      </Col>
      <Col md={10}>
        <h1>User List </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/edit-user/${user._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="bi bi-x-circle"></i>
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

export default UsersPageComponent;
