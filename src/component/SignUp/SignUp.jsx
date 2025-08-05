import { Link } from "react-router-dom";
import signup from "../../assets/signup.jpg";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12 mt-20">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden grid md:grid-cols-2 gap-8 p-8">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src={signup}
            alt="Signup"
            className="w-full max-w-md rounded-lg object-cover"
          />
        </div>
        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Create Your Account
          </h2>
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full p-2"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full p-2"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full p-2"
                placeholder="Enter your photo URL"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium ">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full p-2"
                placeholder="Enter your password"
              />
            </div>

            <p className=" text-sm font-semibold px-6 text-gray-500">
              Already have an account?{" "}
              <Link className="underline hover:text-green-600" to="/login">
                Login
              </Link>{" "}
            </p>

            <div className="form-control mt-6 flex justify-center">
              <input
                type="submit"
                value="SignUp"
                className="btn btn-primary px-4 py-2 bg-green-500 text-white rounded-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
