import React, { useState } from "react";
import { MdCamera } from "react-icons/md";
import "./Profile.scss";
import { Button, FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "../../apis/auth.js";
import FirebaseUpload from "./../../components/Upload/index";
import { updateProfile } from "./../../apis/auth";

const Profile = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery(["getProfile"], () => getProfile(), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setForm(data);
    }
  });

  const updateMutation = useMutation(updateProfile, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries("getProfile");
      localStorage.setItem("user", JSON.stringify(variables.data));
    }
  });

  const [dialogUpload, setDialogUpload] = React.useState({
    open: false,
    type: ""
  });
  const [form, setForm] = useState({});

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const setImageUrl = (url) => {
    if (dialogUpload.type === "image") {
      setForm({ ...form, photo: url });
    } else {
      setForm({ ...form, banner: url });
    }
  };

  const handleOpen = (type) => {
    setDialogUpload({ open: true, type: type });
  };

  const handleClose = () => {
    setDialogUpload({ open: false, type: "" });
  };

  const handleSubmit = async (e) => {
    await updateMutation.mutateAsync({ data: form });
  };

  return (
    <div className="profile-container">
      <FirebaseUpload open={dialogUpload.open} onClose={handleClose} onSuccess={setImageUrl} />
      <div className="banner">
        <img
          src={
            form?.banner ||
            "https://firebasestorage.googleapis.com/v0/b/xauu-88869.appspot.com/o/Image%2Fbanner.svg?alt=media&token=a3c4d55d-b91b-4b15-ad08-dcca604a5156"
          }
          alt="banner"
        />
        <i className="banner-mask"></i>
        <div className="edit-cover" onClick={() => handleOpen("banner")}>
          <MdCamera />
          Edit Cover Photo
        </div>
      </div>
      <div className="avatar-container">
        <div className="avatar" onClick={() => handleOpen("image")}>
          <div className="avatar-img">
            <img src={form?.photo} alt="avatar" />
          </div>
          <MdCamera />
        </div>
      </div>
      <div className="profile-info">
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={2}>
            User Name
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField size="small" fullWidth variant="outlined" name="name" value={form?.name} onChange={handleChanges} />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={2}>
            Email Address
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField size="small" fullWidth variant="outlined" name="email" value={form?.email} onChange={handleChanges} />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={2}>
            Gender
          </Grid>
          <Grid item xs={12} sm={4}>
            <RadioGroup name="gender" row value={form?.gender || ""} onChange={handleChanges}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="secrecy" control={<Radio />} label="Secrecy" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={2}>
            About
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField size="small" fullWidth variant="outlined" name="about" multiline minRows={3} value={form?.about} onChange={handleChanges} />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
