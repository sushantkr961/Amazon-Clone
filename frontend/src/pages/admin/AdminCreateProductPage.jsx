import axios from "axios";
import CreateProductPageComponent from "./components/CreateProductPageComponent";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utlis";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  newCategory,
} from "../../redux/actions/categoryActions";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

const AdminCreateProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const reduxDispatch = useDispatch();

  return (
    <CreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      reduxDispatch={reduxDispatch}
      newCategory={newCategory}
      categories={categories}
      deleteCategory={deleteCategory}
    />
  );
};

export default AdminCreateProductPage;
