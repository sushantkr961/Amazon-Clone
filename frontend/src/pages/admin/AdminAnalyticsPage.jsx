import axios from "axios";
import AnalyticsPageComponent from "./components/AnalyticsPageComponent";

const fetchOrdersForFirstDate = async (abctrl, firstDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + firstDateToCompare,
    {
      signal: abctrl.signal,
    }
  );
  return data;
};

const fetchOrdersForSecondDate = async (abctrl, secondDateToCompare) => {
  const { data } = await axios.get(
    "/api/orders/analysis/" + secondDateToCompare,
    {
      signal: abctrl.signal,
    }
  );
  return data;
};

const AdminAnalyticsPage = () => {
  return (
    <AnalyticsPageComponent
      fetchOrdersForFirstDate={fetchOrdersForFirstDate}
      fetchOrdersForSecondDate={fetchOrdersForSecondDate}
    />
  );
};

export default AdminAnalyticsPage;
