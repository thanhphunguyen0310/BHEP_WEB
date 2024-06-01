import Footer from "../../Footer";
import NavBar from "../../Header";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="container">
        <div style={{ marginTop: "100px"}} className="content">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
