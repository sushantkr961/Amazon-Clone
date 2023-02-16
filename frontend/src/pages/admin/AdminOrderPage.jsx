import OrderPageComponent from "./components/OrderPageComponent";
import axios from "axios";

const fetchOrder = async (abctrl) => {
  const { data } = await axios.get(`/api/orders/admin`, {
    signal: abctrl.signal,
  });
  // console.log(data);
  return data;
};

const AdminOrderPage = () => {
  return <OrderPageComponent fetchOrder={fetchOrder} />;
};

export default AdminOrderPage;
