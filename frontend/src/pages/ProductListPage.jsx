import ProductListPageComponent from "./components/ProductListPageComponent";
import axios from "axios";

const ProductListPage = () => {
  const getProducts = async () => {
    const { data } = await axios.get("/api/products");
    return data;
  };

  return <ProductListPageComponent getProducts={getProducts} />;
};

export default ProductListPage;
