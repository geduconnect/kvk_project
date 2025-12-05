import "./HomeCarousel.css";
import imgcat1 from "../assets/monitor.png"
import imgcat2 from "../assets/tshirt.png"
import imgcat3 from "../assets/couch.png"
import imgcat4 from "../assets/usb.png"
import imgcat5 from "../assets/electrical-appliance.png"
import imgcat6 from "../assets/work-place.png"
import imgcat7 from "../assets/4659308.png"
import imgcat8 from "../assets/mobile-phone.png"
import imgcat9 from "../assets/electrical-appliance.png"
export const ProductCategory = () => {
  return (
    <>
      <div className="products-category">
        <div className="img-card">
            <img src={imgcat1} alt="Card Category" className="img-card" />
            <p>Computers</p>
        </div>
        <div className="img-card">
            <img src={imgcat2} alt="Card Category" className="img-card" />
            <p>Clothing</p>
        </div>
        <div className="img-card">
            <img src={imgcat3} alt="Card Category" className="img-card" />
            <p>Furniture</p>
        </div>
        <div className="img-card">
            <img src={imgcat4} alt="Card Category" className="img-card" />
            <p>Mobile Accessories</p>
        </div>
        <div className="img-card">
            <img src={imgcat5} alt="Card Category" className="img-card" />
            <p>Electroller</p>
        </div>
        <div className="img-card">
            <img src={imgcat6} alt="Card Category" className="img-card" />
            <p>Office</p>
        </div>
        <div className="img-card">
            <img src={imgcat7} alt="Card Category" className="img-card" />
            <p>Study</p>
        </div>
        <div className="img-card">
            <img src={imgcat8} alt="Card Category" className="img-card" />
            <p>SmartPhones</p>
        </div>
        <div className="img-card">
            <img src={imgcat9} alt="Card Category" className="img-card" />
            <p>Kitchen</p>
        </div>
       
      </div>

    </>
  );
};
