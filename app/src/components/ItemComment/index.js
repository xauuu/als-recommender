import React from "react";
import "./ItemComment.scss";
import Parser from "html-react-parser";
import { formatDateTime } from "../../utils/helper.js";

const ItemComment = ({ comment }) => {
  const { photo, name, time, content } = comment;
  return (
    <div className="item-comment">
      <img src={photo} alt="avatar" />
      <div className="item-comment__content">
        <div className="item-comment__content__name">{name}</div>
        <div className="item-comment__content__time">{formatDateTime(time)}</div>
        <div className="item-comment__content__content">{Parser(content || "")}</div>
      </div>
    </div>
  );
};

export default ItemComment;
