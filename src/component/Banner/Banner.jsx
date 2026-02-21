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
    <Carousel
      className="w-full mx-auto mt-20"
      autoPlay
      infiniteLoop
      interval={4000}
      transitionTime={800}
      showThumbs={false}
      showStatus={false}
      stopOnHover={false}
      emulateTouch
    >
      {[img1, img2, img3, img4, img5, img6].map((img, index) => (
        <div key={index}>
          <img
            src={img}
            alt={`banner-${index}`}
            className="w-full h-[500px] md:h-[600px] lg:h-[650px] object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;