import React from "react";
import Navbar from "../../common/Navbar";
import { useStyles } from "./style";

const LayoutComponent = (props) => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};

export default LayoutComponent;
