import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../assets/login.jpg";
import { AuthContext } from "../../Providers/AuthProviders";
import toast from "react-hot-toast";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success("Login Successful!!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left Side Image & Title */}
        <div className="flex flex-col items-center justify-center bg-gray-100 p-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Login Now!</h2>
          <img
            src={login}
            alt="Login illustration"
            className="w-full max-w-xs rounded-md"
          />
        </div>

        {/* Right Side Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full input input-bordered"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full input input-bordered"
                required
              />
              {/* Uncomment this to add forgot password */}
              {/* <Link
                to="/forgot"
                state={{ email }}
                className="text-xs text-gray-500 hover:underline mt-1 inline-block"
              >
                Forgot Password?
              </Link> */}
            </div>
            <div className="flex items-center justify-center mt-6">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary bg-teal-400 font-semibold rounded-lg text-white text-sm px-3 py-2"
              />
            </div>
            <p className="text-center text-sm font-semibold text-gray-500">
              New here?{" "}
              <Link
                to="/signUp"
                className="text-primary underline hover:text-green-600"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
