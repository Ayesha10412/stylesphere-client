
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";
import Button from "../../../components/ui/button";

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
      // <div>
      //   <Button
      //     variant="outline"
      //     onClick={handleGoogleLogin}
      //   >
      //     <FaGoogle className="text-black"></FaGoogle>{" "}
      //     <span className="text-white  text-sm font-bold">
      //       Login With Google
      //     </span>{" "}
      //   </Button>
      // </div>
      <div>
  <Button
    variant="outline"
    onClick={handleGoogleLogin}
    className="flex items-center gap-2 border-[#7C3AED] text-[#111827] hover:bg-[#7C3AED] hover:text-white"
  >
    <FaGoogle className="text-[#111827] group-hover:text-white" />
    <span className="text-sm font-bold">Login With Google</span>
  </Button>
</div>
  );
};

export default SocialLogin;
