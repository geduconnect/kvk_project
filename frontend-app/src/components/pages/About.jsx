import React from "react";
import aboutImg from "../../assets/img/about-banner.jpg";
import featurescardimg1 from "../../assets/img/icon-1.svg";
import featurescardimg2 from "../../assets/img/icon-2.svg";
import featurescardimg3 from "../../assets/img/icon-3.svg";
import featurescardimg4 from "../../assets/img/icon-4.svg";
import featurescardimg5 from "../../assets/img/icon-5.svg";
import featurescardimg6 from "../../assets/img/icon-6.svg";
import { Link } from "react-router-dom";
import "./pages.css";
export const About = () => {
  const aboutfeatures = [
    {
      id: 1,
      icon: featurescardimg1,
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
      title: "Best Prices & Offers",
    },
    {
      id: 2,
      icon: featurescardimg2,
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
      title: "Wide Assortment",
    },
    {
      id: 3,
      icon: featurescardimg3,
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
      title: "Free Delivery",
    },
    {
      id: 4,
      icon: featurescardimg4,
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
      title: "Easy Returns",
    },
    {
      id: 5,
      icon: featurescardimg5,
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
      title: "100% Satisfaction",
    },
    {
      id: 6,
      icon: featurescardimg6,
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
      title: "Great Daily Deal",
    },
  ];
  return (
    <>
      <div className="aboutus">
        <div className="about-container">
          <div className="about-row">
            <div className="about-cont">
              <section className="about-upper">
                <div className="about-upper-img">
                  <img src={aboutImg} alt="" />
                </div>
                <div className="about-upper-content">
                  <h2 className="about-upper-content-title">Welcome to Nest</h2>
                  <p className="about-upper-content-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate id est
                    laborum.
                  </p>
                  <p className="about-upper-content-desc">
                    Ius ferri velit sanctus cu, sed at soleat accusata. Dictas
                    prompta et Ut placerat legendos interpre.Donec vitae sapien
                    ut libero venenatis faucibus. Nullam quis ante Etiam sit
                    amet orci eget. Quis commodo odio aenean sed adipiscing.
                    Turpis massa tincidunt dui ut ornare lectus. Auctor elit sed
                    vulputate mi sit amet. Commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate id est laborum.
                  </p>
                </div>
              </section>
              <section className="about-features">
                <h2 className="about-features-title">What We Provide?</h2>
                <div className="about-features-row">
                  {aboutfeatures.map((aboutfeature, index) => (
                    <div className="about-features-container" key={index}>
                      <div className="about-features-card">
                        <img src={aboutfeature.icon} alt="" />
                        <div className="about-features-content">
                          <h4>{aboutfeature.title}</h4>
                          <p>{aboutfeature.description}</p>
                          <Link className="about-learnmore" href="#">
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <section className="our-performance">
        <div className="our-performance-row mb-50 align-items-center">
          <div className="our-performance-description">
            <img
              src={aboutImg}
              alt=""
              className="mb-md-3 mb-lg-0 mb-sm-4"
            />
          </div>
          <div className="our-performance-description">
            <h4 className="mb-20 text-muted">Our performance</h4>
            <h1 className="heading-1 mb-40">
              Your Partner for e-commerce grocery solution
            </h1>
            <p className="mb-30">
              Ed ut perspiciatis unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et
              quasi architecto
            </p>
            <p>
              Pitatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia
            </p>
          </div>
        </div>
        <div className="our-performance-sub-row">
          {[
            {
              title: "Who we are",
              description:
                "Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in.",
            },
            {
              title: "Our history",
              description:
                "Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in.",
            },
            {
              title: "Our mission",
              description:
                "Volutpat diam ut venenatis tellus in metus. Nec dui nunc mattis enim ut tellus eros donec ac odio orci ultrices in.",
            },
          ].map((item, index) => (
            <div
              className="sub-card"
              key={index}
            >
              <h3 className="mb-30">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mb-50 d-none d-md-block">
        <div className="row about-count">
          {[
            { count: 12, label: "Glorious years" },
            { count: 36, label: "Happy clients" },
            { count: 56, label: "Projects complete" },
            { count: 24, label: "Team advisor" },
            { count: 26, label: "Products Sale" },
          ].map((item, index) => (
            <div
              className="col-lg-1-5 col-md-6 text-center mb-lg-0 mb-md-5"
              key={index}
            >
              <h1 className="heading-1">
                <span className="count">{item.count}</span>+
              </h1>
              <h4>{item.label}</h4>
            </div>
          ))}
        </div>
      </section>
      <div className="container">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <section className="mb-50">
              <h2 className="title style-3 mb-40 text-center">
                Our Team
              </h2>
              <div className="row">
                <div className="col-lg-4 mb-lg-0 mb-md-5 mb-sm-5">
                  <h6 className="mb-5 text-brand">Our Team</h6>
                  <h1 className="mb-30">Meet Our Expert Team</h1>
                  <p className="mb-30">
                    Proin ullamcorper pretium orci. Donec necscele
                    risque leo. Nam massa dolor imperdiet neccon sequata
                    congue idsem. Maecenas malesuada faucibus finibus.
                  </p>
                  <p className="mb-30">
                    Proin ullamcorper pretium orci. Donec necscele
                    risque leo. Nam massa dolor imperdiet neccon sequata
                    congue idsem. Maecenas malesuada faucibus finibus.
                  </p>
                  <a href="#" className="btn">
                    View All Members
                  </a>
                </div>
                <div className="col-lg-8">
                  <div className="row">
                    {[
                      {
                        img: "about-6.png",
                        name: "H. Merinda",
                        title: "CEO & Co-Founder",
                      },
                      {
                        img: "about-8.png",
                        name: "Dilan Specter",
                        title: "Head Engineer",
                      },
                    ].map((member, index) => (
                      <div className="col-lg-6 col-md-6" key={index}>
                        <div className="team-card">
                          <img
                            src={`assets/imgs/page/${member.img}`}
                            alt=""
                          />
                          <div className="content text-center">
                            <h4 className="mb-5">{member.name}</h4>
                            <span>{member.title}</span>
                            <div className="social-network mt-20">
                              <a href="#">
                                <img
                                  src="assets/imgs/theme/icons/icon-facebook-brand.svg"
                                  alt=""
                                />
                              </a>
                              <a href="#">
                                <img
                                  src="assets/imgs/theme/icons/icon-twitter-brand.svg"
                                  alt=""
                                />
                              </a>
                              <a href="#">
                                <img
                                  src="assets/imgs/theme/icons/icon-instagram-brand.svg"
                                  alt=""
                                />
                              </a>
                              <a href="#">
                                <img
                                  src="assets/imgs/theme/icons/icon-youtube-brand.svg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
