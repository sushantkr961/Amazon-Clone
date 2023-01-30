import { Row, Col } from "react-bootstrap";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import AdminLinksComponents from "../../components/admin/AdminLinksComponents";
const AdminChatPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponents />
      </Col>
      <Col md={10}>
        <Row>
          <AdminChatRoomComponent />
        </Row>
      </Col>
    </Row>
  );
};

export default AdminChatPage;
