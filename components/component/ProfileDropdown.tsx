"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "@/context/SessionProvider";
import LogoutButton from "./auth/Logout";

export default function ProfileDropdown() {
  const { session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = session
  console.log("user:",user?.email)
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Avatar Button */}
      <button onClick={() => setOpen(!open)}>
        <img
          src={
            user?.image ||
            "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
          }
          alt="user"
          className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-lg border p-4 z-50">
          
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={
                user?.image ||
                "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
              }
              className="w-12 h-12 rounded-full"
              alt="avatar"
            />

            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {user?.name || "Guest User"}
              </h3>
              <p className="text-xs text-gray-500">
                {user?.email || "no-email@example.com"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t my-2"></div>

          {/* Profile */}
          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700 transition"
            onClick={() => {
              window.location.href = "/profile";
            }}
          >
            👤 Profile
          </button>

          {/* Logout */}
          <div className="mt-2">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}