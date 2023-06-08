import React from "react";
import { NavLink } from "react-router-dom";
import "./ItemStory.scss";

const ItemStory = ({ novel }) => {
  const { image_url, title, genres, id, average_rating, books_count, authors } = novel;

  return (
    <div className="item-story">
      <NavLink to={`detail/${id}`}>
        <div className="thumbnail">
          <img src={image_url} alt={title} />
          <div className="chap">Book Count: {books_count}</div>
        </div>
        <div className="info">
          <div>
            <div className="title">{title}</div>
            <div className="genres">{genres?.join(", ")}</div>
          </div>
          <div className="rating">{average_rating.toFixed(2)}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default ItemStory;
