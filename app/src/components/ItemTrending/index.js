import React from "react";
import { NavLink } from "react-router-dom";
import "./ItemTrending.scss";

const ItemTrending = ({ novel }) => {
  const { id, average_rating, image_url, title, authors, genres } = novel;
  return (
    <div className="trendlist">
      <span className="trendlist__rating">{average_rating.toFixed(2)}</span>
      <div className="trendlist__image">
        <NavLink to={`detail/${id}`}>
          <img src={image_url} alt={title} />
        </NavLink>
      </div>
      <div className="trendlist__content">
        <div className="trendlist__content__title">
          <NavLink to={`detail/${id}`}>{title}</NavLink>
        </div>
        <div className="trendlist__content__description">{authors || "Lorem "}</div>
        <div className="trendlist__content__tag">
          {genres?.map((item, index) => {
            if (index < 6) {
              return (
                <NavLink to="/tag" key={index}>
                  {item}
                </NavLink>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemTrending;
