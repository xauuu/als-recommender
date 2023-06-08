import { Grid } from "@mui/material";
import React from "react";
import "./Search.scss";
import { useQuery } from "@tanstack/react-query";
import ItemTrending from "./../../components/ItemTrending/index";
import { getRatedNovels } from "../../apis/home.js";
import { useSelector } from "react-redux";

const Search = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user);

  const { data, isLoading } = useQuery(["rated", user?.user_id], () => getRatedNovels(user.user_id), {
    enabled: isLoggedIn
  });

  return (
    <Grid container justifyContent="center" spacing={5}>
      <Grid item xs={7}>
        {!isLoading && data?.map((item) => <ItemTrending novel={item} />)}
      </Grid>
    </Grid>
  );
};

export default Search;
