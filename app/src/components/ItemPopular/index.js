import React from "react";
import Rating from "@mui/material/Rating";
import { NavLink } from "react-router-dom";
import "./ItemPopular.scss";

const ItemPopular = ({ serial, novel }) => {
  const { id, title, genres, image_url, rating } = novel;

  return (
    <div className="item-popular">
      <div className="item-serial-number">{serial}</div>
      <div className="item-popular__image">
        <NavLink exact to={`/detail/${id}`}>
          <img src={image_url} alt={title} />
        </NavLink>
      </div>
      <div className="item-popular__content">
        <div className="item-popular__title">
          <NavLink exact to={`/detail/${id}`}>
            {title}
          </NavLink>
        </div>
        <div className="item-popular__genres">
          <span>Genres: </span>
          {genres.join(", ")}
        </div>
        <div className="item-popular__rating">
          <Rating value={rating} precision={0.5} readOnly />
        </div>
      </div>
    </div>
  );
};

export default ItemPopular;
