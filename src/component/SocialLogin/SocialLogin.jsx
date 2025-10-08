import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photo: result.user?.photoURL,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        navigate("/");
      });
    });
  };
  return (
    <div>
      <div className="divider"></div>
      <div>
        <button
          onClick={handleGoogleLogin}
          className="btn bg-[#d18454] flex items-center gap-1 py-2 px-2 rounded-lg text-black text-lg "
        >
          <FaGoogle className="text-black"></FaGoogle>{" "}
          <span className="text-white text-xs font-bold">
            Login With Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
