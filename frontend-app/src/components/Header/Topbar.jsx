/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
export const Topbar = () => {
  const [isopenDropdown, setIsopenDropdown] = useState(false);

  return (
    <div className="topbar">
      {/* optional: small promo, language switch, login / account links */}
      <div className="topbar-left">Welcome farmers!</div>
      <div className="topbar-right">

       
       <div className="callnow">
              <span className="callnow-elem">
                <i className="fa-brands fa-rocketchat"></i>
              </span>
              <span className="callnow-elem">
                <p className="call-num">+91 7488210403</p>
              </span>
            </div>
      </div>
    </div>
  );
};
