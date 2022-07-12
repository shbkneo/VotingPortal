import React from "react";
import { Images } from "../../utils/Images";
import LoginBG from "../../assets/svgs/LoginBG";

const BackgroundContainer = (props) => {
  return (
    <div
      style={{
        height: "99vh",
        overflow: "hidden",
        display: "flex",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          flex: 0.6,

          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "100%",
            backgroundImage: `url(${Images.bgGrey})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",

            boxSizing: "border-box",
            padding: "20px 0px 0px 40px",
          }}
        >
          <div style={{ margin: "0px 0px 40px 0px" }}>
            <img style={{ width: 200 }} src={Images.logo} alt=""></img>
          </div>
          {props.children}
        </div>
      </div>
      <div
        style={{
          flex: 0.4,

          overflow: "hidden",
        }}
      >
        <div style={{ width: "80%", height: "100%" }}>
          <LoginBG />
        </div>
      </div>
    </div>
  );
};

export default BackgroundContainer;
