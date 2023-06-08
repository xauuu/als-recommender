import React, { useEffect, useState } from "react";
import ItemCarousel from "./../../components/ItemCarousel/index";
import ItemTrending from "./../../components/ItemTrending/index";
import Grid from "@mui/material/Grid";
import PopularSection from "./../Section/PopularSection";
import ItemStory from "../../components/ItemStory/index.js";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { getNewestNovels, getRecommendNovels, getTrendingNovels } from "./../../apis/home";
import { useQuery } from "@tanstack/react-query";
import { getNovelLastUpdate } from "./../../apis/novel";
import { useSelector } from "react-redux";

const Home = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const { data: carousel, isLoading } = useQuery(["newest", 5], () => getTrendingNovels(5));
  const { data: trending, isLoading: isLoadingTrending } = useQuery(["trending", 2], () => getNewestNovels(2));
  const { data: forU, isLoading: isLoadingForU } = useQuery(["recommendations", user?.user_id], () => getRecommendNovels(user.user_id), {
    enabled: isLoggedIn
  });

  return (
    <Grid>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <div className="title">Trending</div>
          {!isLoading && (
            <OwlCarousel className="owl-theme" margin={10} loop items={1} autoplay={false}>
              {carousel.map((novel, index) => (
                <ItemCarousel novel={novel} key={index} />
              ))}
            </OwlCarousel>
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="title">Newest</div>
          {!isLoadingTrending && trending?.map((novel, index) => <ItemTrending novel={novel} key={index} />)}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <div className="title">For You</div>
          <Grid container spacing={3}>
            {!isLoadingForU &&
              forU.map((novel, index) => (
                <Grid item md={2} xs={4} key={index}>
                  <ItemStory novel={novel} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
