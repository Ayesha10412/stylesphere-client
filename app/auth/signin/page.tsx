"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import { CustomInput } from "@/components/ui/CustomInput";
import { Button } from "@/components/ui/button";
import SocialLogin from "@/components/component/SocialLogin";

import loginImg from "@/assets/login.jpg";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* 🔹 Background Image */}
      <Image
        src={loginImg}
        alt="login"
        fill
        className="object-cover"
        priority
      />

      {/* 🔹 Overlay (optional dark layer for better contrast) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔹 Glass Form */}
      <div
        className="relative z-10 w-full max-w-max lg:max-w-md p-4 rounded-2xl 
                  backdrop-blur-lg bg-white/10 border border-white/20 
                  shadow-2xl text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Login Now!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Email */}
          <CustomInput
            name="email"
            label="Email"
            type="text"
            register={register}
            control={control}
            error={errors.email}
            placeholder="Enter your email"
            required
          />

          {/* Password */}
          <CustomInput
            name="password"
            label="Password"
            type="password"
            register={register}
            control={control}
            error={errors.password}
            placeholder="Enter your password"
            required
          />

          {/* 🔹 Moved slightly UP (closer to password) */}
          <span className="text-sm text-gray-200">
            New here?{" "}
            <Link href="/signup" className="underline hover:text-green-300">
              Create an account
            </Link>
          </span>
          <div className="flex justify-end gap-3 items-center">
            <Button type="submit" className="bg-[#545556] hover:bg-[#1f2937]">
              Login
            </Button>
          </div>
          {/* 🔹 Divider with text */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/20"></div>
            <span className="text-xs text-gray-300 whitespace-nowrap">
              or continue with Google
            </span>
            <div className="h-px flex-1 bg-white/20"></div>
          </div>

          <SocialLogin />
        </form>
      </div>
    </div>
  );
}
