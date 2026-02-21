import logo from "@/assets/logo.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import useAdmin from "../../../Hooks/Admin/useAdmin";
import useSellerRole from "../../../Hooks/Seller/useSellerRole";
import ProfileDropdown from "../../../components/ProfileDropdown";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const { isSeller, isLoading } = useSellerRole();
  const [dropDown, setDropDown] = useState(false);
  console.log(user, isAdmin, isSeller);
  const navLinks = (
    <>
      <Link to="/" className="text-white text-sm font-bold">
        Home
      </Link>
      {user && isAdmin && (
        <Link
          to="/dashboard/"
          className="text-white text-sm font-bold"
        >
          Dashboard
        </Link>
      )}
      {user && !isAdmin && isSeller && (
        <Link
          to="/dashboard/sellerProfile"
          className="text-white text-sm font-bold"
        >
          Dashboard
        </Link>
      )}
      {!user && (
        <Link to="/signup" className="text-white text-sm font-bold">
          Login/Register
        </Link>
      )}
    </>
  );
  return (
    <div>
      <nav className="bg-[#6D28D9] fixed top-0 left-0 w-full z-10 shadow-lg mb-14">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-white text-sm font-bold space-x-2"
          >
            <img src={logo} alt="Logo" className="w-14 h-14 rounded-full" />
            <span className="text-white text-xl">StyleSphere</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8 text-white text-sm">
            {" "}
            {navLinks}
            {user && <ProfileDropdown />}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setDropDown(dropDown)}
              className="flex items-center focus:outline-none text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {dropDown && (
              <ul className="absolute right-0 mt-96 w-52 bg-white text-black rounded-lg shadow-lg z-30">
                <li>
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#C084FC]"
                  />
                </li>
                <li className="border-t px-4 py-2 text-[#7C3AED]">
                  <p className="font-bold">{user?.displayName}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </li>
                <li>
                  <a
                    href="/"
                    className="block text-black text-sm font-bold px-4 py-2 hover:bg-[#C084FC]/20 transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-[#C084FC]/20 transition"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-[#C084FC]/20 transition"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-[#C084FC]/20 transition"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-[#C084FC]/20 transition"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
