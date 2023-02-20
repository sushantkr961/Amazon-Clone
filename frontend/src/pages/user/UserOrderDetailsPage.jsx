import axios from "axios";
import { useSelector } from "react-redux";
import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import { loadScript } from "@paypal/paypal-js";


const UserOrderDetails = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const getOrder = async (orderId) => {
    const { data } = await axios.get("/api/orders/user/" + orderId);
    return data;
  };

  const loadPayPalScript = ({cartSubtotal,cartItems}) => {
    loadScript({
      "client-id":
        "Ace7F8jC8vr9dhPe9dY0zOgCEnngDfaJQPdXD-Dv0YXya3QjCpHInagXARvnOi5Z135liWECVgVuIUBk",
    })
      .then((paypal) => {
        // console.log(paypal)
        paypal
          .Buttons(buttons(cartSubtotal,cartItems)
          
          )
          .render("#paypal-container-element");
      })
      .catch((err) => {
        console.error("Failed to load teh PayPal JS SDK script", err);
      });
  };

  const buttons = (cartSubtotal,cartItems) => {
    return {
            createOrder: createPayPalOrderHandler,
            onCancel: onCancelHandler,
            onApprove: onApproveHandler,
            onError: onErrorHandler,
          }
  }

  const createPayPalOrderHandler = () => {
    console.log("createPayPalOrderHandler");
  };
  const onCancelHandler = () => {
    console.log("onCancelHandler");
  };
  
  const onApproveHandler = () => {
    console.log("onApproveHandler");
  };
  
  const onErrorHandler = () => {
    console.log("onErrorHandler");
  };

  return (
    <UserOrderDetailsPageComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
      loadPayPalScript={loadPayPalScript}
    />
  );
};

export default UserOrderDetails;
