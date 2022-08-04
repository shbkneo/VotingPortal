import { Avatar, Divider, Drawer, Grid } from "@mui/material";
import React from "react";
import { helper } from "../../utils/Helper";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const DrawerComponent = (props) => {
  return (
    <Drawer anchor={props.anchor} open={props.open} onClose={props.onClose}>
      <Grid container style={{ padding: 20 }}>
        <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{
              border: "1px solid grey",
            }}
            alt="sdf"
          >
            {helper.getInitials(props?.data?.name)}
          </Avatar>

          <p style={{ marginLeft: 10, fontSize: "1.4rem" }}>
            {props?.data?.name}
          </p>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ marginTop: 10 }} />
        </Grid>

        <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
          <AlternateEmailIcon fontSize="small" />
          <p style={{ marginLeft: 10 }}>{props?.data?.email}</p>
        </Grid>
        <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
          <LocalPhoneIcon fontSize="small" />

          <p style={{ marginLeft: 10 }}>{props?.data?.phone || "NA"}</p>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default DrawerComponent;
