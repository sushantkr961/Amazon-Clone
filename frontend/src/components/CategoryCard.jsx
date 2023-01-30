import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CategoryCard({ category, idx }) {
  const images = [
    "https://cdn.pixabay.com/photo/2015/06/02/12/59/book-794978__340.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCWzWmuQtVqkreyoULjFj5Womx40kPaJpjruaNQ_9f_Q&s",
    "https://m.media-amazon.com/images/I/81YFyWzuFPL._AC_UY218_.jpg",
    "https://m.media-amazon.com/images/G/31/img19/AMS/Houseads/Laptops-Sept2019._CB436595915_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/PB/PC/Gateway/QC/Mixer-186x116._SY116_CB614658577_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/PB/PC/Gateway/QC/Photoframe-186x116._SY116_CB614658577_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/PB/PC/Gateway/QC/Artboard_3-186X116._SY116_CB614658688_.jpg",
    "https://m.media-amazon.com/images/I/71r07rY2wcL._AC_UY218_.jpg",
    "https://m.media-amazon.com/images/I/41HPbhGPHzS._AC_UY218_.jpg",
  ];

  return (
    <Card>
      <Card.Img crossOrigin="anonymous" variant="top" src={images[idx]} />
      <Card.Body>
        <Card.Title>{category}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <LinkContainer to={"/product-list"}>
          <Button variant="primary">Go to Category</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default CategoryCard;
