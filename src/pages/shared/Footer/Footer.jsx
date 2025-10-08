import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import logo from "@/assets/logo.png";
export default function Footer() {
  return (
    <div className="mt-40 bottom-0 relative  bg-[url('/image/footer.jpg')] shadow-xl bg-cover bg-center py-2.5">
      <div className="absolute inset-0 bg-black/60"></div>
      <footer
        className=" relative z-10 footer footer-horizontal
       footer-center text-primary-content p-10"
      >
        <aside
          className="flex flex-col items-center py-1.5 
        text-center  "
        >
          <div className="w-[5%] ">
            <img className="w-[100%]" src={logo} alt="" />
          </div>
          <p className="font-bold text-2xl text-white">
            StyleSphere
            <br />
            <span className="text-sm text-[#ffffffb1]">
              Providing reliable Services since 2023
            </span>
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          <div className="w-[20%] mx-auto text-white text-3xl flex flex-row justify-between ">
            <a>
              <FaFacebook />
            </a>
            <a>
              <FaInstagram></FaInstagram>
            </a>
            <a>
              <FaTwitter></FaTwitter>
            </a>
            <a>
              <FaWhatsapp></FaWhatsapp>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
}
