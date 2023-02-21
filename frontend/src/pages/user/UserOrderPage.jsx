import axios from "axios"
import UserOrderPageComponent from "./components/UserOrderPageComponents"

const getOrders = async () => {
  const {data} = await axios.get("/api/orders")
  return data
}

const UserOrderPage = () => {
  return (
   <UserOrderPageComponent getOrders={getOrders} />
  )
}

export default UserOrderPage