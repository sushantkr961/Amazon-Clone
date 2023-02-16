import ProductPageComponent from "./components/ProductPageComponent";
import axios from "axios"

const fetchProducts = async (abctrl) => {
  const { data } = await axios.get("/api/products/admin", { signal: abctrl.signal });
  // console.log(data);
  return data;
};

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`/api/products/admin/${productId}`);
  return data;
};



const AdminProductPage = () => {

  return (
    <ProductPageComponent fetchProducts={fetchProducts} deleteProduct={deleteProduct} />
  );
};
export default AdminProductPage;
