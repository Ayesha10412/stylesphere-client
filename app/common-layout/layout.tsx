import Footer from "@/components/component/Footer";

export const metadata = {
  title: "StyleSphere Web Layout",
  description: "This is the web layout for the application.",
};
const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-screen w-full mx-auto px-4 lg:px-8">
        {children}
      </main>
      <div className="w-full mx-auto px-4 lg:px-8">
        <Footer />
      </div>
    </>
  );
};

export default WebLayout;
