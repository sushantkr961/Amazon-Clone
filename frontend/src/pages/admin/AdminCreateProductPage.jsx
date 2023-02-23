import axios from "axios";
import CreateProductPageComponent from "./components/CreateProductPageComponent";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utlis";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

const AdminCreateProductPage = () => {
  return (
    <CreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
    />
  );
};

export default AdminCreateProductPage;
