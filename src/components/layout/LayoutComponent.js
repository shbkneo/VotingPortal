import React from "react";
import Navbar from "../../common/Navbar";
import SideBarComponent from "./SideBarComponent";
import { useStyles } from "./style";
import { useSelector } from "react-redux";

const LayoutComponent = (props) => {
  const { login } = useSelector((state) => state);

  return (
    <div style={{ display: "flex" }}>
      {/* <Navbar />
      {props.children} */}
      {login && <SideBarComponent />}

      <div
        style={{
          flex: 1,

          height: "99vh",
          overflow: "auto",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default LayoutComponent;
