import { useState, useEffect } from "react";

const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      const sidebarWidth = 224; // your agent sidebar width
      const isMobile = window.innerWidth < 768; // breakpoint for mobile

      let width;
      if (isMobile) {
        // ✅ On mobile: use full screen width with small padding
        width = window.innerWidth - 14;

      } else {
        // ✅ On desktop: subtract sidebar width + margin
        width = window.innerWidth - sidebarWidth - 20;
      }

      setMaxWidth(width > 0 ? width : window.innerWidth * 0.9);
    };

    handleResize(); // initial calculation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="overflow-x-auto scrollbar-custom w-full">
      <div style={maxWidth ? { maxWidth: maxWidth } : { width: "100%" }}>{children}</div>
      <style jsx>{`
        /* Chrome, Edge, Safari */
        .scrollbar-custom::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: #1B5B34;
          border-radius: 4px;
          border: 2px solid #f1f1f1;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background-color: #006a48;
        }
        /* Firefox */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #1B5B34 #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default TableWrapper;