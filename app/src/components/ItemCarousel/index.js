import React from "react";
import { NavLink } from "react-router-dom";
import "./ItemCarousel.scss";

const ItemCarousel = ({ novel }) => {
  const { id, image_url, title, description, year, genres } = novel;

  return (
    <div className="slide-item">
      <div className="slide-item__bg">
        <img src={image_url} alt={title} />
      </div>
      <div className="slide-item__shadow"></div>
      <div className="slide-content">
        <div className="slide-image">
          <NavLink to={`detail/${id}`}>
            <img src={image_url} alt={title} />
          </NavLink>
        </div>
        <div className="slide-text">
          <div className="title">
            <NavLink to={`detail/${id}`}>{title}</NavLink>
          </div>
          <div className="year">{year}</div>
          <div className="excerpt">
            <span>Summary</span>
            <div>{description || "Lorem "}</div>
          </div>
          <div className="tag">
            {genres?.map((item, index) => (
              <NavLink to="/tag" key={index}>
                {item}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCarousel;
