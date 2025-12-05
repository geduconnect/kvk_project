import React from "react";
import { Link } from "react-router-dom";

import partnersimage1 from "../../assets/img/brands/advantaSeedsLogo.webp";
import partnersimage2 from "../../assets/img/brands/ankurLogo.webp";
import partnersimage3 from "../../assets/img/brands/bayerLogo.webp";
import partnersimage4 from "../../assets/img/brands/cortevaLogo.webp";
import partnersimage5 from "../../assets/img/brands/dupontPioneerLogo.webp";
import partnersimage6 from "../../assets/img/brands/kaveriSeedsLogo.webp";
import partnersimage7 from "../../assets/img/brands/mahycoLogo.webp";
import partnersimage8 from "../../assets/img/brands/nuziveeduSeeds.webp";
import partnersimage9 from "../../assets/img/brands/pahujaSeedsLogo.webp";
import partnersimage10 from "../../assets/img/brands/seminisLogo.webp";
import partnersimage11 from "../../assets/img/brands/syngentaLogo.webp";
import partnersimage12 from "../../assets/img/brands/uplLogo.webp";
import partnersimage13 from "../../assets/img/brands/vnrLogo.webp";

export const Affiliations = () => {
  const partnersData = [
    { id: 1, partnerImg: partnersimage1 },
    { id: 2, partnerImg: partnersimage2 },
    { id: 3, partnerImg: partnersimage3 },
    { id: 4, partnerImg: partnersimage4 },
    { id: 5, partnerImg: partnersimage5 },
    { id: 6, partnerImg: partnersimage6 },
    { id: 7, partnerImg: partnersimage7 },
    { id: 8, partnerImg: partnersimage8 },
    { id: 9, partnerImg: partnersimage9 },
    { id: 10, partnerImg: partnersimage10 },
    { id: 11, partnerImg: partnersimage11 },
    { id: 12, partnerImg: partnersimage12 },
    { id: 13, partnerImg: partnersimage13 },
  ];

  return (
    <div className="partners">
      <div className="partners-container">
        <div className="section-title">
          <h2>Our Brands</h2>
          <Link to="/brands" className="view-all-btn">
            View All
          </Link>
        </div>


        <div className="partners-area">
          <div className="partners-inner">
            {partnersData.slice(0, 7).map((partner) => (
              <div key={partner.id} className="partnerslider-image">
                <img src={partner.partnerImg} alt={`Brand ${partner.id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
