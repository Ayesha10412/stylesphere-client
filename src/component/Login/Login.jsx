import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../assets/login.jpg";
import { AuthContext } from "../../Providers/AuthProviders";
import toast from "react-hot-toast";
import SocialLogin from "../SocialLogin/SocialLogin";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/button";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    signIn(email, password)
      .then(() => {
        toast.success("Login Successful!!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
<div
  className="relative min-h-screen w-full bg-cover bg-center flex justify-center items-center"
  style={{ backgroundImage: `url(${login})` }}
>
  {/* Black overlay for readability */}
  <div className="absolute inset-0 bg-black/50 z-10"></div>

  {/* Glass form panel */}
  <div className="relative z-20 w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
    <h2 className="text-3xl font-bold mb-6 text-center text-cyan-500">
      Login Now!
    </h2>

    <form onSubmit={handleLogin} className="space-y-4">
      {/* Email */}
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/20 text-white placeholder-gray-300"
      />

      {/* Password */}
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-white/20 text-white placeholder-gray-300"
      />

      {/* Signup link */}
      <p className="text-sm text-gray-200 text-start">
        New here?{" "}
        <Link className="underline hover:text-green-300" to="/signUp">
          Create an account
        </Link>
      </p>

      {/* Buttons */}
      <div className="mt-4 flex flex-col md:flex-row gap-3 justify-center">
        <Button type="submit" variant="primary" size="xl" className="px-8 text-sm">
          Login
        </Button>
        <SocialLogin />
      </div>
    </form>
  </div>
</div>



  );
}
