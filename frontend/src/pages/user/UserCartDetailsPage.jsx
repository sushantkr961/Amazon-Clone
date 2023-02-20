import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";

const UserCartDetailsPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const reduxDispatch = useDispatch();

  const getUser = async () => {
    const { data } = await axios.get(`/api/users/profile/` + userInfo._id);
    return data;
  };

  const createOrder = async(orderData) => {
    const {data} = await axios.post("/api/orders",{...orderData})
    return data
  }

  return (
    <UserCartDetailsPageComponent
      cartItems={cartItems}
      itemsCount={itemsCount}
      cartSubtotal={cartSubtotal}
      reduxDispatch={reduxDispatch}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      getUser={getUser}
      userInfo={userInfo}
      createOrder={createOrder}
    />
  );
};

export default UserCartDetailsPage;
