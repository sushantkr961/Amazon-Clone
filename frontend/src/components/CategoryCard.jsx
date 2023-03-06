import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CategoryCard({ category, idx }) {
 

  return (
    <Card>
      <Card.Img crossOrigin="anonymous" variant="top" src={category.image ?? null} />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text>
          {category.description}
        </Card.Text>
        <LinkContainer to={`/product-list/category/${category.name}`}>
          <Button variant="primary">Go to Category</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default CategoryCard;
