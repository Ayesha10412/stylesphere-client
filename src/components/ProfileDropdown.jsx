import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Link } from "react-router-dom";
import {  Logout } from "../lib/Logout";

const ProfileDropdown = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
//   const handleLogOut = () => {
//     LogOut()
//       .then(() => {
//         toast.success("LogOut successfully!!");
//       })
//       .catch((e) => {
//         toast.error(e.message);
//       });
//   };
  return (
    <div className="relative">
      <img
        src={user?.photoURL}
        alt="Profile"
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#C084FC]"
      />

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-20">
          <div className="px-4 py-2 border-b">
            <p className="font-bold text-[#7C3AED]">
              {user?.displayName}
            </p>
            <p className="text-sm text-gray-500">
              {user?.email}
            </p>
          </div>

          <Link
            to="/dashboard/profile"
            className="block px-4 py-2 hover:bg-[#C084FC]/20"
          >
            Profile
          </Link>

          {/* <button
            onClick={handleLogOut}
            className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
          >
            Logout
          </button> */}
          <Logout className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600" />
        </div>
      )}
    </div>
  );
};
export default ProfileDropdown;
