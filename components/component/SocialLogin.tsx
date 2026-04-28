"use client"

import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";


const SocialLogin = () => {

  const handleGoogleLogin = () => {
   
  };
  return (
  
  <Button
    variant="outline"
    onClick={handleGoogleLogin}
    className="flex justify-center  items-center border-none  bg-white/30 hover:bg-[#008080] text-[#111827]  hover:text-white/80"
  >
    <span className="flex gap-2 items-center font-bold"><FaGoogle />Login with Google </span>
  </Button>
  );
};

export default SocialLogin;
