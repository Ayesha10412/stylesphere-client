"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import { CustomInput } from "@/components/ui/CustomInput";
import { Button } from "@/components/ui/button";
import SocialLogin from "@/components/component/SocialLogin";

import loginImg from "@/assets/login.jpg";
import api from "@/config/api";
import { useState } from "react";
import { useSession } from "@/context/SessionProvider";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { refreshSession } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: "admin@gmail.com", password: "Admin@123" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await api
        .post("/auth/login", data, { withCredentials: true })
        .then(async (res) => {
          if (res.status === 200) {
            await refreshSession();
            router.push("/admin-layout");
          }
        });
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
        className="relative z-10 w-full max-w-max lg:max-w-sm p-4 rounded-2xl 
                  backdrop-blur-lg bg-white/10 border border-white/20 
                  shadow-2xl text-white"
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-[#008080]">
          Login Now!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Link
              href="/auth/signup"
              className="underline hover:text-green-300"
            >
              Create an account
            </Link>
          </span>
          <div className="flex justify-end gap-3 items-center mt-4">
            <Button
              type="submit"
              className="bg-[#008080] px-4 text-sm hover:bg-[#008080]/90 text-white"
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
