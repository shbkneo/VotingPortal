import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Colors } from "../../utils/Colors";
import { useStyles } from "./style";

const DialogComponent = ({ data = {}, close, ...props }) => {
  const classes = useStyles();

  return (
    <Dialog open={props.open} onClose={close}>
      <DialogTitle>
        <Grid container>
          <Grid xs={12} item>
            <Typography style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              {data?.name}
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <Typography>Total no of votes : {data?.count}</Typography>
          </Grid>
          {props.select ? (
            <>
              <Grid xs={12} item style={{ marginBottom: 10 }}>
                <Typography>Select {data?.name} as champion? </Typography>
              </Grid>
              <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    style={{
                      textTransform: "none",
                      color: "white",
                      backgroundColor: Colors.green,
                      borderRadius: 20,
                    }}
                    onClick={() => props.onSubmit(data)}
                    variant="contained"
                  >
                    Yes
                  </Button>
                </div>
              </Grid>
            </>
          ) : (
            <>
              <Grid xs={12} item style={{ marginBottom: 10 }}>
                <Typography>Comments: </Typography>
              </Grid>
              {data?.comments?.map((el, i) => (
                <Grid item xs={12} style={{ marginBottom: 10 }} key={i}>
                  <Paper
                    variant="outlined"
                    style={{
                      width: "100%",
                      padding: "0 5px",
                      boxSizing: "border-box",

                      backgroundColor: "#e6e6e6",
                    }}
                  >
                    <Grid item xs={12}>
                      <div>
                        <Typography
                          style={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            wordBreak: "break-word",
                            WebkitLineClamp: 3,
                          }}
                          variant="body1"
                        >
                          {el?.comment}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        style={{
                          wordWrap: "break-word",
                          textAlign: "end",
                        }}
                      >
                        - {el?.commentator}
                      </Typography>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </DialogTitle>
    </Dialog>
  );
};

export default DialogComponent;
