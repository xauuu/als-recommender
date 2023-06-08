import React from "react";
import "./../Upload.scss";
import { BsBook, BsPlusCircle, BsCloudUpload } from "react-icons/bs";
import { Button, Grid, IconButton, MenuItem, TextField } from "@mui/material";
import { genres } from "./data";
import FirebaseUpload from "../../../components/Upload/index.js";
import { createNovel, getNovelDetail, updateNovel } from "./../../../apis/novel";
import { useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Create = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const { data } = useQuery(["getNovel", id], () => getNovelDetail(id));
  const [dialogUpload, setDialogUpload] = React.useState({
    open: false,
    type: ""
  });
  const [novelData, setnovelData] = React.useState({
    title: "",
    description: "",
    genres: [],
    image_url: "https://pbs.twimg.com/profile_images/1546551891152207872/k_XtbogZ_400x400.jpg",
    banner_url: "https://pbs.twimg.com/profile_images/1546551891152207872/k_XtbogZ_400x400.jpg",
    created_by: user.name,
    updated_by: user.name
  });

  const setImageUrl = (url) => {
    if (dialogUpload.type === "image") {
      setnovelData({ ...novelData, image_url: url });
    } else {
      setnovelData({ ...novelData, banner_url: url });
    }
  };

  const handleOpen = (type) => {
    setDialogUpload({ open: true, type: type });
  };

  const handleClose = () => {
    setDialogUpload({ open: false, type: "" });
  };

  const handleChanges = (e) => {
    setnovelData({ ...novelData, [e.target.name]: e.target.value });
  };

  const updateMutation = useMutation(updateNovel, {
    onSuccess: () => {
      queryClient.invalidateQueries("myNovelDetail");
    }
  });

  const createMutation = useMutation(createNovel, {
    onSuccess: () => {
      queryClient.invalidateQueries("myNovels");
    }
  });

  const handleCreate = async () => {
    if (novelData?.id) {
      await updateMutation.mutateAsync(
        { id: id, data: novelData },
        {
          onSuccess: () => {
            history.goBack();
          }
        }
      );
    } else {
      await createMutation.mutateAsync(
        { data: novelData },
        {
          onSuccess: () => {
            history.push("/upload");
          }
        }
      );
    }
  };

  React.useEffect(() => {
    setnovelData({
      ...novelData,
      ...data
    });
  }, [data]);

  return (
    <React.Fragment>
      <FirebaseUpload open={dialogUpload.open} onClose={handleClose} onSuccess={setImageUrl} />
      <div className="title">
        <IconButton onClick={history.goBack}>
          <MdArrowBack />
        </IconButton>
        <div>
          <BsBook />
          novel information
        </div>
      </div>
      <form className="form">
        <Grid container spacing={3} justifyContent="center">
          <Grid className="upload" item xs={12} sm={5}>
            <div className="image-container">
              <div className="image-upload" onClick={(e) => handleOpen("image")}>
                <BsPlusCircle />
                <img src={novelData.image_url} alt="novel" />
              </div>
              <div className="button-upload">
                <Button variant="contained" color="primary" onClick={(e) => handleOpen("image")}>
                  <BsCloudUpload />
                  Image
                </Button>
              </div>
            </div>
            <div className="banner-container">
              <div className="image-upload" onClick={(e) => handleOpen("banner")}>
                <BsPlusCircle />
                <img src={novelData.banner_url} alt="novel" />
              </div>
              <div className="button-upload">
                <Button variant="contained" color="primary" onClick={(e) => handleOpen("banner")}>
                  <BsCloudUpload />
                  Banner
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  name="title"
                  label="Title"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  value={novelData.title}
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  minRows={5}
                  maxRows={7}
                  name="description"
                  label="Description"
                  fullWidth
                  autoComplete="given-name"
                  value={novelData.description}
                  variant="outlined"
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  multiple
                  required
                  label="Genres"
                  name="genres"
                  variant="outlined"
                  SelectProps={{
                    multiple: true,
                    value: novelData.genres,
                    onChange: handleChanges
                  }}
                >
                  {genres.map((genre) => (
                    <MenuItem className="to_capitalize" key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                  {novelData.id ? "Update" : "Create"}
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
