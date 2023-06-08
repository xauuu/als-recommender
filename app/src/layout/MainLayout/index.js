import React from "react";
import Header from "./Header/index.js";
import Footer from "./Footer/index";

function MainLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </React.Fragment>
  );
}

export default MainLayout;
