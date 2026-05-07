/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import signup from "@/assets/signup.jpg";
import SocialLogin from "@/components/component/SocialLogin";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/ui/CustomInput";
import api from "@/config/api";
import { useState } from "react";
import { RegisterFormData } from "@/lib/schema";
import { handleApiError } from "@/helper/handleApiError";

export default function SignUp() {
  const {
    register,
    reset,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const res = await api.post("/user/register", payload);

      if (res.status === 201 || res.status === 200) {
        reset();
        router.push("/admin-layout");
      }
    } catch (error: unknown) {
      console.error("Signup failed:", error);

      handleApiError<RegisterFormData>(error, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center bg-blend-overlay bg-black/15"
      style={{ backgroundImage: `url(${signup.src})` }}
    >
      <div className="w-full max-w-md backdrop-blur-lg bg-white/25 border border-white/5 shadow-2xl rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#008080]">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Name */}
          <CustomInput
            label="Name"
            type="text"
            control={control}
            placeholder="Enter your name"
            name="name"
            register={register}
            error={errors.name}
          />

          {/* Email */}
          <CustomInput
            label="Email"
            type="text"
            placeholder="Enter your email"
            name="email"
            control={control}
            register={register}
            error={errors.email}
          />

          {/* Photo URL */}
          {/* <CustomInput
            label="Upload Photo"
            type="image"
            control={control}
            name="photo"
            register={register}
          /> */}

          {/* Password */}
          <CustomInput
            label="Password"
            type="password"
            control={control}
            placeholder="Enter your password"
            name="password"
            register={register}
            error={errors.password}
          />
          <CustomInput
            label="Confirm Password"
            type="password"
            control={control}
            placeholder="Confirm your password"
            name="confirmPassword"
            register={register}
          />

          <p className="text-sm text-gray-200">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="underline hover:text-green-300"
            >
              Login
            </Link>
          </p>
          {errors.root && (
            <p className="text-red-500 text-sm ">{errors.root.message}</p>
          )}
          <div className="mt-4  flex flex-col md:flex-row gap-2 justify-end">
            <SocialLogin />
            <Button
              type="submit"
              className="px-6 text-sm bg-[#008080] hover:bg-[#004040]"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
