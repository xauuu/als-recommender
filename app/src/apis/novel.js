import apiServices from "./../utils/api";

export const getNovelDetail = (id) => {
  if (!id) return {};
  return apiServices.get("/book_detail/" + id).then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return {};
    }
  });
};

export const getNovelListByUser = () => {
  return apiServices.get("/novel/my").then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const createNovel = ({ data }) => {
  return apiServices.post("/novel/create", { ...data }).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

export const updateNovel = ({ id, data }) => {
  return apiServices.put("/novel/update/" + id, { ...data }).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

export const getNovelLastUpdate = (number) => {
  return apiServices.get("/novel/last-update/" + number).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const getNovelByStatus = (status) => {
  return apiServices.get("/novel/status/" + status).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const ratingNovel = ({ id, rating }) => {
  return apiServices.post("/novel/rating/" + id, rating).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

export const searchNovel = (keyword) => {
  return apiServices.get("/novel/search/" + keyword).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const getAllNovel = () => {
  return apiServices.get("/novel/").then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const deleteNovel = ({ id }) => {
  return apiServices.delete("/novel/" + id).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};
