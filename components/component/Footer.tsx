"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <div className="mt-40 relative bg-[url('/image/footer.jpg')] shadow-xl bg-cover bg-center py-4 pb-1">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <footer className="relative z-10 footer footer-center text-primary-content p-10">
        
        <aside className="flex flex-col items-center py-4 text-center">
          
          {/* Logo */}
          <div className="w-20">
            <Image src={logo} alt="Logo" className="w-full" />
          </div>

          <p className="font-bold text-2xl text-white">
            StyleSphere
            <br />
            <span className="text-sm text-[#ffffffb1]">
              Providing reliable Services since 2023
            </span>
          </p>

          <p className="text-white">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </aside>

        <nav>
          <div className="w-40 mx-auto text-white text-3xl flex justify-between">
            
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>

            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>

          </div>
        </nav>

      </footer>
    </div>
  );
}