import { Link, useNavigate } from "react-router-dom";
import signup from "../../assets/signup.jpg";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/Users/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import toast from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL);

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: data.photoURL,
      };

      // Wait briefly to ensure Firebase updates context state
      setTimeout(async () => {
        try {
          const res = await axiosPublic.post("/users", userInfo); // verifyToken removed, so no headers
          if (res.data.insertedId) {
            reset();
            toast.success("User created successfully!");

            // Navigate only after everything is confirmed
            navigate("/");
          }
        } catch (err) {
          console.error("User saving failed:", err);
        }
      }, 500); // 500ms delay (adjustable)
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                className="input input-bordered w-full p-2"
                placeholder="Enter your name"
              />
              {errors.name && (
                <span className="text-red-500 font-bold">
                  Name is required.
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                className="input input-bordered w-full p-2"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 font-bold">
                  Email is required.
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                name="photoURL"
                className="input input-bordered w-full p-2"
                placeholder="Enter your photo URL"
              />
              {errors.photoURL && (
                <span className="text-red-500 font-bold">
                  Photo url is required.
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium ">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                })}
                name="password"
                className="input input-bordered w-full p-2"
                placeholder="Enter your password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 font-bold">Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 font-bold">
                  Password length must be 6 characters!
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-500 font-bold">
                  Password length less than 20 characters!
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 font-bold">
                  Password must have at least one uppercase, one lowercase, one
                  number, and one special character.
                </p>
              )}
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
                className="btn btn-primary px-4 py-3 text-sm font-semibold bg-green-500 text-white rounded-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
