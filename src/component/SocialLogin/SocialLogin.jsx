import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Button from "../../components/ui/button";

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
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="text-black"></FaGoogle>{" "}
          <span className="text-white  text-sm font-bold">
            Login With Google
          </span>{" "}
        </Button>
      </div>
  );
};

export default SocialLogin;
