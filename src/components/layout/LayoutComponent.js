import React, { useState } from "react";
import Navbar from "../../common/Navbar";
import SideBarComponent from "./SideBarComponent";
import { useStyles } from "./style";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { helper } from "../../utils/Helper";
import DrawerComponent from "../Drawers/DrawerComponent";

const LayoutComponent = (props) => {
  const { login, userData } = useSelector((state) => state);
  const [openDrawer, setOpenDrawer] = useState(false);
  const closeDrawerHandler = () => {
    setOpenDrawer(false);
  };
  const openDrawerHandler = () => {
    setOpenDrawer(true);
  };

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

          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: 10, top: 5 }}>
          <Avatar
            onClick={openDrawerHandler}
            style={{
              backgroundColor: "white",
              color: "red",
              border: "1px solid grey",
              cursor: "pointer",
            }}
            alt="sdf"
          >
            {helper.getInitials(userData?.name)}
          </Avatar>
          <DrawerComponent
            anchor="right"
            data={userData}
            open={openDrawer}
            onClose={closeDrawerHandler}
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default LayoutComponent;
