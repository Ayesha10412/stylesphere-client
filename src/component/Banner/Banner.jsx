import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assets/banner-image/img1.jpeg";
import img2 from "../../assets/banner-image/img2.jpeg";
import img3 from "../../assets/banner-image/img3.jpeg";
import img4 from "../../assets/banner-image/img4.jpeg";
import img5 from "../../assets/banner-image/img5.jpeg";
import img6 from "../../assets/banner-image/img6.jpeg";

const Banner = () => {
  return (
    <Carousel className="w-[90%] mx-auto mt-20 min-h-7">
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
