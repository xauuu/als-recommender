import apiServices from "./../utils/api";
// get list user
export const getUserList = () => {
  return apiServices.get("/auth/list").then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};
