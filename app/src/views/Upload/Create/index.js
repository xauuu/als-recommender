import React, { useState } from "react";
import "./../Upload.scss";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { predict } from "../../../apis/home.js";

const Create = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const [novelData, setnovelData] = React.useState({});
  const [open, setOpen] = useState(false);
  const [predictResult, setPredictResult] = useState(0);

  const handleChanges = (e) => {
    setnovelData({ ...novelData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const data = await predict({ data: novelData });
    setOpen(true);
    setPredictResult(data?.result);
  };
  const handleClose = () => {
    setOpen(false);
    setnovelData({});
    setPredictResult(0);
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Kết Quả Dự đoán</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{predictResult === 0 ? "Không bị bệnh" : "Bị bệnh"}</DialogContentText>
        </DialogContent>
      </Dialog>
      <div className="title">
        <IconButton onClick={history.goBack}>
          <MdArrowBack />
        </IconButton>
        <div>diabetes</div>
      </div>
      <form className="form">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  name="Pregnancies"
                  label="Pregnancies"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={novelData.Pregnancies || ""}
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="Glucose"
                  label="Glucose"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={novelData.Glucose || ""}
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="BloodPressure"
                  label="BloodPressure"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={novelData.BloodPressure || ""}
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="SkinThickness"
                  label="SkinThickness "
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={novelData.SkinThickness || ""}
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="Insulin"
                  label="Insulin"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={novelData.Insulin || ""}
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="BMI"
                  label="BMI"
                  fullWidth
                  size="small"
                  type="number"
                  variant="outlined"
                  value={novelData.BMI || ""}
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="DiabetesPedigreeFunction"
                  label="DiabetesPedigreeFunction"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={novelData.DiabetesPedigreeFunction || ""}
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required name="Age" label="Age" fullWidth size="small" variant="outlined" value={novelData.Age || ""} onChange={handleChanges} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                  Predict
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default Create;
