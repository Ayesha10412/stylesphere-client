import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assets/banner-image/img1.jpg";
import img2 from "../../assets/banner-image/img2.jpg";
import img3 from "../../assets/banner-image/img3.jpg";
import img4 from "../../assets/banner-image/img4.jpg";
import img5 from "../../assets/banner-image/img5.jpg";
import img6 from "../../assets/banner-image/img6.jpg";

const Banner = () => {
  return (
    <Carousel className="w-[90%] mx-auto mt-20 min-h-6">
      <div>
        <img className="w-full " src={img1} alt="" />
      </div>
      <div>
        <img className="w-full " src={img2} alt="" />
      </div>
      <div>
        <img className="w-full" src={img3} alt="" />
      </div>
      <div>
        <img className="w-full " src={img4} alt="" />
      </div>
      <div>
        <img className="w-full " src={img5} alt="" />
      </div>
      <div>
        <img className="w-full " src={img6} alt="" />
      </div>
    </Carousel>
  );
};

export default Banner;
