import React from "react";
import { NavLink } from "react-router-dom";

const Empty = () => {
  return (
    <div className="empty">
      <div className="empty-image">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAACFCAMAAABv2ibxAAAAPFBMVEUAAADFxs3Hx8/Dw8vFxc3Fxc/FxczExc3Fxs3FxcrDxMzExszFxs3ExMzFxszGxs3Exs3Hx8/ExMzFxs10R7mIAAAAE3RSTlMA3yBAvxBv788wUICgkK+vkF9gQHXkXQAAAfxJREFUaN7t2smOwkAMBNDesvQCA+T//3U6E4aScCMuLjQauQ4ByYcnO87N7jfT/OU3YsLdCUmUONIsCiSpbfwEQGnOk+PE36W6O0txCEkKO+SDQ1hSo0KQjpauokiQbntLosaQzuSWIK39mUWNIW09T4V/IU2ixpKiqLGkKmosaWGODxK9KUjiTVGlJTuEJ4kBcqXNn+aIzSBJ9cGtXxUcQXK3/h9Z0qlkkuRCW7anrA3T1JN6pljPKxxMs2RlyR3cfEnoDtO8RkUJyaUmP2gP09SR0B6mKZZFT0J7mCaS8OnpSOBeLUtQlTDNlsbT1JTkNOWyaEnvl8WnWrKihLz89LQlLIt/6o0jYZpcSS4LWUKCSSaZZJJJJplkkkkmmWSSSSaZZJJJJplkkkkmmfSXpOkT0vEkS7g3Kh+RWn/OZAl3YekjUsDFDFc6fuaPSBXjI0vT1hMVpSiyHJJLe1lNGueQ8tZz4Us9J8yPLE1+3/SgJaVhjg8p4iRWd/dk6g+V2dLjVW2VLYHygSphgD0t0qXHxZZvZaJISGi4PMAhmqaExCSuU7QlWG0BBU5TQsoFnQlOSULyra0jTlVC4jzgGjglCdx5wF2zmvT+kimdwA0kfa7kscTgFnBaErh69mMOEptrkHQTShVHaJBoHF/CURhVkhxdAhdfFL4Bk3+cWERw0jEAAAAASUVORK5CYII="
          alt="upload"
        />
      </div>
      <div className="empty-footer">
        <div className="empty-title">No Works!</div>
        <div className="empty-subtitle text-muted">Click the button below to create your first fiction now.</div>
        <div className="empty-action">
          <NavLink to="/upload/create" className="btn btn-outline-primary">
            Create Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Empty;
