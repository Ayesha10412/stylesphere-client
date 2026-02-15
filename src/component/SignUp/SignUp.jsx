import { Link, useNavigate } from "react-router-dom";
import signup from "../../assets/signup.jpg";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import toast from "react-hot-toast";
import SocialLogin from "../SocialLogin/SocialLogin";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/button";

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
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL);

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: data.photoURL,
      };

      // Wait briefly to ensure Firebase updates context state

      const res = await axiosPublic.post("/users", userInfo); // verifyToken removed, so no headers
      if (res.data.insertedId) {
        toast.success("User created successfully!");
        reset();
        // Navigate only after everything is confirmed
        navigate("/");
      }
    } catch (err) {
      console.error("User saving failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${signup})` }}
    >
      <div className="w-full max-w-md backdrop-blur-lg bg-white/25 border border-white/5 shadow-2xl rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold mb-4 text-center text-cyan-700">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1.5">
          {/* Name */}
          <div>
            <Input
              label="Name"
              type="text"
              placeholder="Enter your name"
              name="name"
              register={register}
              validation={{ required: true }}
              error={errors.name}
            />
            {errors.name && (
              <p className="text-red-300 text-sm mt-1">Name is required.</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              label="Email"
              type="text"
              placeholder="Enter your email"
              name="email"
              register={register}
              validation={{ required: true }}
              error={errors.email}
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">Email is required.</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <Input
              label="Photo URL"
              type="text"
              placeholder="Enter your photo URL"
              name="photoURL"
              register={register}
              validation={{ required: true }}
              error={errors.photoURL}
            />
            {errors.photoURL && (
              <p className="text-red-300 text-sm mt-1">
                Photo URL is required.
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            {/* <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern:
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              })}
              className="w-full px-4 py-2 rounded-lg bg-white/30 border border-white/40 focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-200"
              placeholder="Enter your password"
            /> */}
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              register={register}
              validation={{
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern:
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              }}
              error={errors.password}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-300 text-sm mt-1">Password is required.</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-300 text-sm mt-1">
                Password must be at least 6 characters.
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-300 text-sm mt-1">
                Must include uppercase, lowercase, number & special character.
              </p>
            )}
          </div>

          <p className="text-sm text-gray-200 text-start">
            Already have an account?{" "}
            <Link className="underline hover:text-green-300" to="/login">
              Login
            </Link>
          </p>

          

          <div className="mt-4 flex flex-col md:flex-row gap-3  justify-center">
            {/* Sign Up Button */}
            <Button type="submit" variant="primary" size="xl" className="px-8 text-sm ">
              Sign Up
            </Button>

            {/* Social Login */}
            <SocialLogin />
          </div>
        </form>
      </div>
    </div>
  );
}
