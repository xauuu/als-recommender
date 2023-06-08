import apiServices from "./../utils/api";

export const login = (email, password) => {
  return apiServices
    .post("/auth/login", { email, password })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return error;
    });
};

export const register = (name, email, password, passwordConfirm, photo = "") => {
  return apiServices
    .post("/auth/register", { name, email, photo, password, passwordConfirm })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return error;
    });
};

export const logout = () => {
  return apiServices
    .get("/auth/logout")
    .then((response) => {
      return;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProfile = () => {
  return apiServices
    .get("/auth/me")
    .then((response) => {
      if (response.status === 200) {
        return response.data.data;
      } else {
        return {};
      }
    })
    .catch((error) => {
      return error;
    });
};

export const updateProfile = ({ data }) => {
  return apiServices
    .post("/auth/update", { ...data })
    .then((response) => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return error;
    });
};
