import Footer from "@/components/component/Footer";
import Navbar from "@/components/component/Navbar";

export const metadata = {
  title: "StyleSphere Web Layout",
  description: "This is the web layout for the application.",
};
const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" w-full mx-auto px-4 lg:px-4">
        <Navbar />
      </div>
      <main className="min-h-screen w-full mx-auto px-4 lg:px-4">
        {children}
      </main>
      <div className="w-full mx-auto px-4 lg:px-4">
        <Footer />
      </div>
    </>
  );
};

export default WebLayout;
