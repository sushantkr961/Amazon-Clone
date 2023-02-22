import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";
import EditProductPageComponent from "./components/EditProductPageComponent";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

const updateProductApiRequest = async (productId, formInputs) => {
  const { data } = await axios.put(`/api/products/admin/${productId}`, {
    ...formInputs,
  });
  return data;
};

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const reduxDisptach = useDispatch();

  const imageDeleteHandler = async(imagePath,productId) => {
    let encoded = encodeURIComponent(imagePath)
    await axios.delete(`/api/products/admin/image/${encoded}/${productId}`)
  }

  const uploadHandler = async(images,productId) => {
    const formData = new FormData()

    Array.from(images).forEach((image) => {
      formData.append("images",image)
    })
    await axios.post("/api/products/admin/upload?productId="+productId,formData)
  }

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      reduxDisptach={reduxDisptach}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadHandler={uploadHandler}
    />
  );
};

export default AdminEditProductPage;
