import { Link } from "react-router-dom";
import animation from "../../assets/404 error page with cat.json";
import Lottie from "lottie-react";
export default function ErrorPage() {
  return (
    <div className="mt-34 flex flex-col items-center">
      <h2 className="text-3xl text-center text-orange-700 font-bold">
        Error Page
      </h2>
      <div className="w-[30%] mx-auto mt-6">
        <Lottie animationData={animation} loop={true} />
      </div>
      <Link to="/" className="text-sm text-gray-600 mt-7">
        <span className="text-center"> Go Back</span>
      </Link>
    </div>
  );
}
