/* eslint-disable react-hooks/exhaustive-deps */
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
  Image,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";

const onHover = {
  cursor: "pointer",
  position: "absolute",
  left: "5px",
  top: "-10px",
  transform: "scale(2.7)",
};

const EditProductPageComponent = ({
  categories,
  fetchProduct,
  updateProductApiRequest,
}) => {
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [attributeFormDB, setAttributeFormDB] = useState([]); // for select list
  const [attributesTable, setAttributesTable] = useState([]); // for html table
  const [categoryChoosen,setCategoryChoosen] = useState("Choose category")

  const { id } = useParams();
  const navigate = useNavigate();
  const attrVal = useRef(null);
  const attrKey = useRef(null);

  const setValueForAttrFormDBselectForm = (e) => {
    // console.log(e.target.value)
    if (e.target.value !== "Choose attribute") {
      var selectedAttr = attributeFormDB.find(
        (item) => item.key === e.target.value
      );
      // console.log(selectedAttr)
      let valuesForAttrKeys = attrVal.current;
      if (selectedAttr && selectedAttr.value.length > 0) {
        while (valuesForAttrKeys.options.length) {
          valuesForAttrKeys.remove(0);
        }
      }
      valuesForAttrKeys.options.add(new Option("Choose attribute value"));
      selectedAttr.value.map((item) => {
        valuesForAttrKeys.add(new Option(item));
        return "";
      });
    }
  };

  useEffect(() => {
    fetchProduct(id)
      .then((res) => setProduct(res))
      .catch((er) => console.log(er));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributesTable: attributesTable,
    };
    if (event.currentTarget.checkValidity() === true) {
      updateProductApiRequest(id, formInputs)
        .then((data) => {
          if (data.message === "product updated successfully") {
            navigate("/admin/products");
          }
        })
        .catch((er) =>
          setUpdateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };

  useEffect(() => {
    let categoryOfEditedProduct = categories.find(
      (item) => item.name === product.category
    );
    if (categoryOfEditedProduct) {
      const maniCategoryOfEditedProduct =
        categoryOfEditedProduct.name.split("/")[0];
      const maniCategoryOfEditedProductAllData = categories.find(
        (categoryOfEditedProduct) =>
          categoryOfEditedProduct.name === maniCategoryOfEditedProduct
      );
      // console.log(maniCategoryOfEditedProductAllData)
      if (
        maniCategoryOfEditedProductAllData &&
        maniCategoryOfEditedProductAllData.attrs.length > 0
      ) {
        setAttributeFormDB(maniCategoryOfEditedProductAllData.attrs);
      }
    }
    setCategoryChoosen(product.category)
    setAttributesTable(product.attrs);
  }, [product]);

  const changeCategory = (e) => {
    const highLevelCategory = e.target.value.split("/")[0];
    const highLevelCategoryAllData = categories.find(
      (cat) => cat.name === highLevelCategory
    );
    if (highLevelCategory && highLevelCategory.attrs) {
      setAttributeFormDB(highLevelCategoryAllData.attrs);
    } else {
      setAttributeFormDB([]);
    }
    setCategoryChoosen(e.target.value)
  };

  const attributeValueSelected = (e) => {
    if (e.target.value !== "Choose attribute value") {
    //   console.log(attrKey.current.value);
    //   console.log(e.target.value);
      setAttributesTableWrapper(attrKey.current.value, e.target.value);
    }
  };
  const setAttributesTableWrapper = (key, val) => {
    setAttributesTable((attr) => {
      // console.log(attr)
      if (attr.length !== 0) {
        var keyExistsInOldTable = false;
        let modifiedTable = attr.map((item) => {
          if (item.key === key) {
            keyExistsInOldTable = true;
            item.value = val;
            return item;
          } else {
            return item;
          }
        });
        if (keyExistsInOldTable) {
          return [...modifiedTable];
        } else return [...modifiedTable, { key: key, value: val }];
      } else {
        return [{ key: key, value: val }];
      }
    });
  };

  const deleteAttribute = (key) =>{
    setAttributesTable((table) => table.filter((item) => item.key !== key))
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit product</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={product.name}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                defaultValue={product.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                name="count"
                required
                type="number"
                defaultValue={product.count}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                required
                type="text"
                defaultValue={product.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                required
                name="category"
                aria-label="Default select example"
                onChange={changeCategory}
              >
                <option value="Choose category">Choose category</option>
                {categories.map((item, idx) => {
                  return product.category === item.name ? (
                    <option selected key={idx} value={item.name}>
                      {item.name}
                    </option>
                  ) : (
                    // if true then it is come from redux that is added previously
                    <option key={idx} value={item.name}>
                      {item.name}
                    </option>
                    //  if false then it is come from fetch all categories option
                  );
                })}
              </Form.Select>
            </Form.Group>

            {attributeFormDB.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attrKey}
                      onChange={setValueForAttrFormDBselectForm}
                    >
                      <option>Choose attribute</option>
                      {attributeFormDB.map((item, idx) => (
                        <Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      name="atrrVal"
                      aria-label="Default select example"
                      ref={attrVal}
                      onChange={attributeValueSelected}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row>
              {attributesTable && attributesTable.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton onClick={() => deleteAttribute(item.key)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    disabled={categoryChoosen === "Choose category"}
                    placeholder="first choose or create category"
                    name="newAttrKey"
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    disabled={categoryChoosen === "Choose category"}
                    placeholder="first choose or create category"
                    required={true}
                    name="newAttrValue"
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="primary">
              After typing attribute key and value press enterr on one of the
              field
            </Alert>

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Row>
                {product.images &&
                  product.images.map((image, idx) => (
                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                      <Image src={image.path ?? null} fluid />
                      <i style={onHover} className="bi bi-x text-danger"></i>
                    </Col>
                  ))}
              </Row>
              <Form.Control required type="file" multiple />
            </Form.Group>
            <Button variant="primary" type="submit">
              UPDATE
            </Button>
            {updateProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProductPageComponent;
