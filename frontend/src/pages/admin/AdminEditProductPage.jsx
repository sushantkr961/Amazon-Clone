import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";
import EditProductPageComponent from "./components/EditProductPageComponent";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utlis";

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

  const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath);
    if (process.env.NODE_ENV !== "production") {
      // to do: change to !==
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
      );
    }
  };

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      reduxDisptach={reduxDisptach}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
    />
  );
};

export default AdminEditProductPage;
