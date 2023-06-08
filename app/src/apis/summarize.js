import apiServices from "./../utils/api";
export const summarize = (body) => {
  return apiServices.post("/summarize/", body).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return "";
    }
  });
};
