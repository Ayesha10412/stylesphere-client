"use client";

import { useState } from "react";
import { useSession } from "@/context/SessionProvider";
import { LogOut, LogOutIcon, LucideLogOut } from "lucide-react";

export default function LogoutButton() {
  const { signout } = useSession();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    // simulate delay for better UX (optional)
    setTimeout(async () => {
      await signout();
    }, 800);
  };

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 flex items-center gap-2  hover:bg-gray-200 text-red-500 rounded-lg transition"
      >
        <LucideLogOut /> Logout
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-[90%] max-w-md flex flex-col rounded-2xl shadow-xl p-6 space-y-2">
         <div className="flex flex-col items-center">
               {/* Icon */}
            <div className="bg-gray-100 p-4 rounded-full w-fit mb-3">
              <LogOut size={24} className="text-red-500 -rotate-90" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Confirm Logout
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-6 text-center">
              If you log out, you’ll need to sign in again to access your
              account.{" "}
            </p>
         </div>

            {/* Actions */}
            <div className="flex justify-end items-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="px-4 py-2 rounded-lg border text-gray-500 hover:bg-gray-100"
              >
                Stay logged in
              </button>

              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                    Logging out...
                  </>
                ) : (
                  "Log out"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
