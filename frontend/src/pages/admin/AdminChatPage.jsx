import { Row, Col } from "react-bootstrap";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import AdminLinksComponents from "../../components/admin/AdminLinksComponents";
import { useSelector } from "react-redux"

const AdminChatPage = () => {
  const {chatRooms} = useSelector((state) => state.adminChat)
  // console.log(chatRooms)
  
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponents />
      </Col>
      <Col md={10}>
        <Row>
          {Object.entries(chatRooms).map((chatRoom, index) => (
          <AdminChatRoomComponent key={index} chatRoom={chatRoom} />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default AdminChatPage;
