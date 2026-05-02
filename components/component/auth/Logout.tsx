"use client";

import { useState } from "react";
import { useSession } from "@/context/SessionProvider";

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
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
      >
        Logout
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6">
            
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Confirm Logout
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
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
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}