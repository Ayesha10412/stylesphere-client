import logo from "@/assets/logo.png";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-[#2E8B57] fixed top-0 left-0 w-full z-10 shadow-lg mb-14">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a
            href="/"
            className="flex items-center text-[#F5F5DC] text-2xl font-bold space-x-2"
          >
            <img src={logo} alt="Logo" className="w-14 h-14 rounded-full" />
            <span className="text-[#F5F5DC]">StyleSphere</span>
          </a>

          <div className="hidden lg:flex items-center space-x-8 text-[#F5F5DC] text-sm">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Categories</a>
            <a href="#">Contact</a>
            <a href="#">Dashboard</a>

            <div className="relative">
              <img
                src="user-photo.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-yellow-400"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-20">
                <div className="px-4 py-2 border-b">
                  <p className="font-bold text-[#2E8B57]">John Doe</p>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-yellow-400 transition"
                >
                  Dashboard
                </a>
                <button className="block w-full text-left px-4 py-2 hover:bg-red-500 transition">
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button className="flex items-center focus:outline-none text-[#F5F5DC]">
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
            <ul className="absolute right-0 mt-96 w-52 bg-white text-black rounded-lg shadow-lg z-30">
              <li>
                <img
                  src="user-photo.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-yellow-400"
                />
              </li>
              <li className="border-t px-4 py-2 text-[#2E8B57]">
                <p className="font-bold">John Doe</p>
                <p className="text-sm text-gray-500">john@example.com</p>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-yellow-400 transition"
                >
                  Home{" "}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-yellow-400 transition"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-yellow-400 transition"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-yellow-400 transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-yellow-400 transition"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <button className="block w-full text-left px-4 py-2 hover:bg-red-500 transition">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
