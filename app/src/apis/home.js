import apiServices from "./../utils/api";

export const getRandomNovels = (number) => {
  return apiServices.get("/novel/random/" + number).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const getTopNovels = (number) => {
  return apiServices.get("/novel/top/" + number).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const getTrendingNovels = (number) => {
  return apiServices.get("/books_by_popularity/" + number).then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  });
};

export const getRecommendNovels = (user_id) => {
  return apiServices.get("/recommendations/" + user_id).then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  });
};

export const getRatedNovels = (user_id) => {
  return apiServices.get("/books_rated_by_user/" + user_id).then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  });
};

export const getNewestNovels = (number) => {
  return apiServices.get("/books_newest/" + number).then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  });
};

export const predict = ({ data }) => {
  return apiServices.post("/predict", { ...data }).then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  });
};
