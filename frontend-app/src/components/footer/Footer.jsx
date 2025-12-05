import React from "react";

import "./Footer.css";

import footerImg from "../../assets/img/kvklogo1.png";
// import { Link } from "react-router-dom";
// import img1 from "../assets/img/logo.jpg";
// import serviceimag1 from "../assets/img/Picture1.jpg";
// import serviceimag2 from "../assets/img/Picture2.jpg";
// import serviceimag3 from "../assets/img/Picture3.jpg";
// import serviceimag4 from "../assets/img/Picture4.jpg";
// import serviceimag5 from "../assets/img/Picture5.jpg";
// import serviceimag6 from "../assets/img/Picture6.jpg";
// import serviceimag7 from "../assets/img/Picture7.jpg";
// import serviceimag8 from "../assets/img/Picture8.jpg";
// import serviceimag9 from "../assets/img/Picture9.jpg";
// import serviceimag10 from "../assets/img/Picture10.jpg";
// import serviceimag11 from "../assets/img/Picture11.jpg";
// import serviceimag12 from "../assets/img/Picture12.jpg";
// (other imports...)
// export const servicesdata = [
//   {
//     id: 1,
//     // serviceimage: serviceimag1,
//     cardtitle: "Bold Peanuts",
//     title: "Bold Peanuts",
//     description: "Premium quality Bold Peanuts for various uses.",
//     specifications: {
//       Type: "Bold Peanuts",
//       Minquantity: "28000 kg",
//       Origin: "India",

//       Packing: "25/50kg Jute bag, pp bag, vacuum bag",
//     },
//     // image: serviceimag1,
//   },
//   {
//     id: 2,
//     // serviceimage: serviceimag2,
//     cardtitle: "Java Peanut",
//     title: "Java Peanut",
//     description: "High-quality Java Peanuts, perfect for cooking.",
//     specifications: {
//       Type: "Fresh Onion",
//       Minquantity: "28000 kg",
//       Origin: "India",

//       Packing: "25/50kg Jute bag, pp bag, vacuum bag",
//     },
//     // image: serviceimag2,
//   },
//   {
//     id: 3,
//     // serviceimage: serviceimag3,
//     cardtitle: "TJ Peanut",
//     title: "TJ Peanut",
//     description: "Premium quality TJ Peanut for various uses.",
//     specifications: {
//       Type: "TJ Peanut",
//       Origin: "India",
//       Color: "brown/mustard",
//       Packing: "30kg",
//       Minquantity: "28000 kg",
//     },
//     // image: serviceimag3,
//   },
//   {
//     id: 4,
//     // serviceimage: serviceimag4,
//     cardtitle: "Roasted Blanched Peanuts",
//     title: "Roasted Blanched Peanuts",
//     description: "Premium quality Roasted Blanched Peanuts for various uses.",
//     specifications: {
//       Type: "Roasted Blanched Peanuts",
//       Origin: "India",
//       cultivationType: "natural",
//       Packing: "50/100kg paper box",
//     },
//     // image: serviceimag4,
//   },
//   {
//     id: 5,
//     // serviceimage: serviceimag5,
//     cardtitle: "Peanut split (Raw/Blanched)",
//     title: "Peanut split (Raw/Blanched)",
//     description: "Premium quality Peanut split (Raw/Blanched) for various uses.",
//     specifications: {
//       Type: "Peanut split (Raw/Blanched)",
//       Origin: "India",
//       cultivationType: "natural",
//       Packing: "50/100kg paper box",
//     },
//     // image: serviceimag5,
//   },
//   {
//     id: 6,
//     // serviceimage: serviceimag8,
//     cardtitle: "Psyllium Husk and Powder",
//     title: "Psyllium Husk and Powder",
//     description: "Premium quality Psyllium Husk and Powder for various uses.",
//     specifications: {
//       Color: "brown",
//       Type: "Psyllium Husk and Powder",
//       Count: "38/42, 40/50, 50/60, 60/70",
//       Moisture: "7% max",
//       Minquantity: "1000 kg",
//       uses: "Human Consumption",
//       Origin: "India",

//       Packing: "25 kg pp bag",
//     },
//     // image: serviceimag8,
//   },
//   {
//     id: 7,
//     // serviceimage: serviceimag9,
//     cardtitle: "PINK ONION",
//     title: "PINK ONION",
//     description: "Premium quality PINK ONION for various uses.",
//     specifications: {
//       Type: "PINK ONION",
//       Color: "brown/creamy",

//       Packing: "10/20kg Jute bag",
//       Minquantity: "1000 kg",
//       Origin: "India",
//     },
//     // image: serviceimag9,
//   },
//   {
//     id: 8,
//     // serviceimage: serviceimag10,
//     cardtitle: "Honey Mustard / Eucalyptus Hone",
//     title: "Honey Mustard / Eucalyptus Honey",
//     description: "Premium quality bold Honey Mustard / Eucalyptus Hone for various uses.",
//     specifications: {
//       Type: "Bold Honey Mustard / Eucalyptus Hone",
//       Count: "38/42, 40/50, 50/60, 60/70",
//       Moisture: "7% max",
//       "Foreign material": "0.5% max",
//       "Oil content": "48-52%",
//       Packing: "25/50kg Jute bag, pp bag, vacuum bag",
//     },
//     // image: serviceimag10,
//   },
//   {
//     id: 9,
//     // serviceimage: serviceimag11,
//     cardtitle: "Fresh Cavendish G9 Banana",
//     title: "Fresh Cavendish G9 Banana",
//     description: "Premium quality Fresh Cavendish G9 Bananas for various uses.",
//     specifications: {
//       Type: "Fresh Cavendish G9 Bananas",
//       Count: "38/42, 40/50, 50/60, 60/70",
//       Moisture: "7% max",
//       "Foreign material": "0.5% max",
//       "Oil content": "48-52%",
//       Packing: "25/50kg Jute bag, pp bag, vacuum bag",
//     },
//     // image: serviceimag11,
//   },
//   {
//     id: 10,
//     // serviceimage: serviceimag12,
//     cardtitle: "PEANUT BUTTER",
//     title: "PEANUT BUTTER",
//     description: "Premium quality PEANUT BUTTER for various uses.",
//     specifications: {
//       Type: "PEANUT BUTTER",
//       Color: "light white/creamy",
//       Shape: "curve",
//       nutCount: "180-190",
//       lps: "46,47,48,49,50",
//       Minquantity: "1000 kg",
//       Origin: "India",
//     },
//     // image: serviceimag12,
//   },
//   {
//     id: 11,
//     // serviceimage: serviceimag6,
//     cardtitle: "Cummin",
//     title: "Cumin",
//     description: "Premium quality Cumins for various uses.",
//     specifications: {
//       taste: "sweet",

//       Type: "Cumins",
//       form: "gel",
//       Moisture: "7% max",
//       "Foreign material": "0.5% max",
//       "Oil content": "48-52%",
//       Packing: "250g 5kg(client pref), glass bottle jar (client pref)",
//       Minquantity: "100 kg",
//       Origin: "India",
//     },
//     // image: serviceimag6,
//   },
//   {
//     id: 11,
//     // serviceimage: serviceimag7,
//     cardtitle: "Cummin",
//     title: "Cumin",
//     description: "Premium quality Cumins for various uses.",
//     specifications: {
//       taste: "sweet",

//       Type: "Cumins",
//       form: "gel",
//       Moisture: "7% max",
//       "Foreign material": "0.5% max",
//       "Oil content": "48-52%",
//       Packing: "250g 5kg(client pref), glass bottle jar (client pref)",
//       Minquantity: "100 kg",
//       Origin: "India",
//     },
//     // image: serviceimag7,
//   },
//   // Repeat for the rest of the products
// ];
export const Footer = () => {

  const handleShareClick = () => {
    const textToShare = encodeURIComponent(
      'Check out this awesome link: https://example.com'
    );
    const whatsappUrl = `whatsapp://send?text=${textToShare}`;
    window.location.href = whatsappUrl;
  };
  const phoneNumber = '9926122299'; // Replace with the desired phone number
  const message = 'Hello, I would like to Enquire about your services.'; // Optional: Pre-filled message

  // WhatsApp API URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <footer className="footer">
        <div className="container">

          {/* <div className="footer-top">
            <div className="container">
              <div className="footer-top-bg row">
                <div
                  className="footer-box  wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                  }}
                >
                  <i className="fa fa-map-marker-alt"></i>
                  <div className="footer-box-content">
                    <h3>Head Office</h3>
                    <p>
                      G-2/50, Krishna Nagar, Sirsi Road, Vaishali Nagar, Jaipur,
                      Rajasthan – 302021
                    </p>
                  </div>
                </div>
                <div
                  className="footer-box f-box2 wow fadeInUp"
                  data-wow-delay="0.4s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.4s",
                    animationName: "fadeInUp",
                  }}
                >
                  <i className="fas fa-phone"></i>
                  <div className="footer-box-content">
                    <h3>Call Us</h3>
                    <p>
                      <a href="tel:9926122299">9926122299</a>
                    </p>
                  </div>
                </div>
                <div
                  className="footer-box f-box3 wow fadeInUp"
                  data-wow-delay="0.6s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.6s",
                    animationName: "fadeInUp",
                  }}
                >
                  <i className="fa fa-envelope"></i>
                  <div className="footer-box-content">
                    <h3>Mail Us</h3>
                    <p>
                      <a href="mailto:earthyfusionpvtltd@gmail.com">
                        earthyfusionpvtltd@gmail.com
                      </a>
                    </p>
                    <p>
                      <a href="mailto:Info@earthyfusionpvtltd.com">
                        Info@earthyfusionpvtltd.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="footer-area ">
            <div className="footer-main ">
              <div className="grid">
                <div className="footer-about">

                  <div className="footer-logo ">
                    <div className="footer-img">
                      <a href="">
                        <img src={footerImg} alt="footer-logo" />
                      </a>
                    </div>
                  </div>
                 
                </div>


                <div className="footer-widget">
                  <h3>Quick Links</h3>
                  <ul>
                    {/* <Link to="/"> */}
                      <li>Home</li>
                    {/* </Link> */}
                    {/* <Link to="/aboutus"> */}
                      <li>About</li>
                    {/* </Link> */}

                    {/* <Link to="/certifications"> */}
                      <li>Certifications</li>
                    {/* </Link> */}
                    {/* <Link to="/contactus"> */}
                      <li>Contact</li>
                    {/* </Link> */}
                  </ul>
                </div>
                <div className="footer-widget">
                  <h3>Peanut Products</h3>
                  <ul>
                    {/* <Link to='/peanuts'> */}
                      <li>

                        {/* product.cardtitle.toLowerCase()}`}> */}

                        Bold Peanut

                      </li>
                    {/* </Link> */}
                    {/* <Link to='/peanuts'> */}
                      <li>

                        Java Peanut

                      </li>
                    {/* </Link> */}
                    {/* <Link to='/peanuts'> */}
                      <li>

                        TJ Peanut

                      </li>
                    {/* </Link> */}
                    {/* <Link to='/peanuts'> */}
                      <li>

                        Roasted Blanched Peanuts

                      </li>
                    {/* </Link> */}
                    {/* <Link to='/peanuts'> */}
                      <li>

                        Peanut split (Raw/Blanched)

                      </li>
                    {/* </Link> */}

                    {/* <Link to='/peanutbutter'> */}
                      <li>

                        Peanut Butter

                      </li>
                    {/* </Link> */}

                  </ul>
                </div>
                <div className="footer-widget">
                  <h3>Our Products</h3>
                  <ul>

                    {/* <Link to='/psylliumhusk'> */}
                      <li>

                        Psyllium Husk and Powder

                      </li>
                    {/* </Link> */}
                    {/* <Link to='/onion'> */}
                      <li>

                        Pink Onion

                      </li>
                    {/* </Link> */}
                    {/* <Link to='/honey'> */}
                      <li>

                        Honey Mustard / Eucalyptus Honey

                      </li>
                    {/* </Link> */}
                    {/* <Link to='/banana'> */}
                      <li>

                        Fresh Cavendish G9 Banana

                      </li>
                    {/* </Link> */}

                    {/* <Link to='/cummin'> */}
                      <li>

                        Cummins

                      </li>
                    {/* </Link> */}
                  </ul>
                </div>

                <div className="footer-widget">
                  <h3>Contact Us</h3>
                  <ul>
                    <li>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" >
                        <i className="fa-brands fa-square-whatsapp"></i>+91 992-612-2299
                      </a>
                    </li>
                    <li>
                      <a href="mailto:earthyfusionpvtltd@gmail.com">
                        <i className="fa fa-envelope"></i>
                        earthyfusionpvtltd@gmail.com,
                        <br />
                        Info@earthyfusionpvtltd.com
                      </a>
                    </li>
                    <li>
                      <a href="https://www.google.com/maps?ll=26.939626,75.630464&z=11&t=m&hl=en-US&gl=US&mapclient=embed&q=g+250,+Sirsi+Rd+Hanuman+Nagar+Extension,+Krishna+Nagar,+Vaishali+Nagar+Jaipur,+Rajasthan+302021">
                        <i className="fa fa-map-marker-alt"></i>G-2/50, Krishna
                        Nagar, Sirsi Road, Vaishali Nagar, Jaipur, Rajasthan –
                        302021
                      </a>
                    </li>
                  </ul>
                  <div className="footer-icon">
                    <li>
                      <a className="footer-item" href="">
                        {/* <Link to="https://www.facebook.com/profile.php?id=61566816340589"> */}
                          <i className="fa-brands fa-facebook-f"></i>
                        {/* </Link> */}
                      </a>
                    </li>
                    <li>
                      <a className="footer-item" href="">
                        {/* <Link to="https://www.instagram.com/earthyfusion/"> */}
                          <i className="fa-brands fa-instagram"></i>
                        {/* </Link> */}
                      </a>
                    </li>
                    <li>
                      <a className="footer-item" href="">
                        {/* {/* <Link to="https://in.linkedin.com/company/earthy-fusion-private-limited/"> */} 
                          {/* <i className="fa-brands fa-linkedin"></i> */}
                        {/* </Link> */}
                      </a>
                    </li>
                    <li>
                      <a className="footer-item" href="">
                        {/* <Link to="https://twitter.com/earthyfusion"> */}
                          <i className="fa-brands fa-x-twitter"></i>
                        {/* </Link> */}
                      </a>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </footer>
      <div className="copyright">
        <p>Copyright ©2024 All Rights Reserved. by Earthy Fusion Private Limited</p>
      </div>
    </>
  );
};
