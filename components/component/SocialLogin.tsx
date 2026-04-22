"use client"

import { Button } from "../ui/button";


const SocialLogin = () => {

  const handleGoogleLogin = () => {
   
  };
  return (
  
      <div>
  <Button
    variant="outline"
    onClick={handleGoogleLogin}
    className="flex items-center gap-2 border-[#7C3AED] text-[#111827] hover:bg-[#7C3AED] hover:text-white"
  >
    {/* <FaGoogle className="text-[#111827] group-hover:text-white" /> */}
    <span className="text-sm font-bold">Login With Google</span>
  </Button>
</div>
  );
};

export default SocialLogin;
