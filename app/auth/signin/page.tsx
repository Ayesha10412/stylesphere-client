"use client";

import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import { CustomInput } from "@/components/ui/CustomInput";

import loginImg from "@/assets/login.jpg";
import { Button } from "@/components/ui/button";
import SocialLogin from "@/components/component/SocialLogin";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "/";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {

  };

  return (
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Background */}
      <Image src={loginImg} alt="login" fill className="object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Form */}
      <div className="relative z-20 w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-500">
          Login Now!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <CustomInput
            name="email"
            label="Email"
            type="email"
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

          {/* Signup */}
          <p className="text-sm text-gray-200">
            New here?{" "}
            <Link href="/signup" className="underline hover:text-green-300">
              Create an account
            </Link>
          </p>

          {/* Buttons */}
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <Button
              type="submit"
              className="bg-[#111827] hover:bg-[#1f2937]"
            >
              Login
            </Button>

            <SocialLogin />
          </div>
        </form>
      </div>
    </div>
  );
}