import apiServices from "./../utils/api";

export const getChapterDetail = (chapter_number, novel_id) => {
  return apiServices.get("novel/chapter/detail", { params: { chapter_number, novel_id } }).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const getChapterByNovelId = (novel_id) => {
  return apiServices.get("novel/chapter/novel/" + novel_id).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};

export const createChapter = ({ data }) => {
  return apiServices.post("novel/chapter/create", data).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

export const updateChapter = ({ id, data }) => {
  return apiServices.put("novel/chapter/" + id, { ...data }).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

export const addComment = ({ data }) => {
  return apiServices.post("comment/add", { ...data }).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

export const getCommentByChapterId = (id) => {
  return apiServices.get("comment/" + id).then((response) => {
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  });
};
