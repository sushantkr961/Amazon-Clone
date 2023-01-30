import AllRoutes from "./AllRoutes/AllRoutes";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ScrollToTop from "./utilities/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <HeaderComponent />
      <AllRoutes />
      <FooterComponent />
    </>
  );
};

export default App;
