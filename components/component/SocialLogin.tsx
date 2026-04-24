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
    className="flex items-center border-none gap-2 bg-white/30 hover:bg-white/35 text-[#111827]  hover:text-white"
  >
    <span className=" font-bold"><FaGoogle /> </span>
  </Button>
  );
};

export default SocialLogin;
