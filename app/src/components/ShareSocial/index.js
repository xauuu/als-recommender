import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import "./ShareSocial.scss";

const ShareSocial = ({ url }) => {
  return (
    <div className="share-social">
      <a className="facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer">
        <FaFacebookF />
        <span>Facebook</span>
      </a>
      <a className="twitter" href={`https://twitter.com/intent/tweet?url=${url}`} target="_blank" rel="noopener noreferrer">
        <FaTwitter />
        <span>Twitter</span>
      </a>
      <a className="linkedin" href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`} target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn />
        <span>Linkedin</span>
      </a>
    </div>
  );
};

export default ShareSocial;
