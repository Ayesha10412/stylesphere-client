"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { useState } from "react";

export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="bg-[#008080] fixed top-0 left-0 w-full z-10 shadow-lg ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Logo"
            width={45}
            height={45}
            className="rounded-full"
          />
          <span className="text-black text-xl font-semibold">StyleSphere</span>
        </Link>

        {/* ===== DESKTOP NAV ===== */}
        <div className="hidden lg:flex items-center space-x-6 text-black text-sm">
          {/* 🔥 YOUR NAV ITEMS HERE */}
          <div className="flex space-x-6">{/* Add your links here */}</div>

          {/* Auth Buttons */}
          <Link href="/auth/signin" className="font-bold">
            SignIn
          </Link>

          <button className="font-bold">Logout</button>

          {/* Profile */}
          <div className="relative">
            <button onClick={() => setOpenProfile(!openProfile)}>
              <Image
                src="/default.png"
                alt="Profile"
                width={35}
                height={35}
                className="rounded-full border"
              />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-3 w-56 bg-white text-black rounded-lg shadow-lg">
                <div className="p-4 border-b">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>

                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <div className="lg:hidden">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-white text-2xl"
          >
            ☰
          </button>

          {openMenu && (
            <div className="absolute right-4 top-16 w-60 bg-white text-black rounded-lg shadow-lg">
              {/* 🔥 YOUR NAV ITEMS HERE */}
              <div className="p-3 border-b">{/* Add mobile links here */}</div>

              <Link
                href="/auth/signin"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                SignIn
              </Link>

              <button className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">
                Logout
              </button>

              <div className="border-t mt-2 p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src="/default.png"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  className="block py-2 hover:text-purple-600"
                >
                  Profile
                </Link>

                <button className="block w-full text-left py-2 text-red-600">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
