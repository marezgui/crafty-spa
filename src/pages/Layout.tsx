import { Navbar } from "@/components/layout/NavBar";
import { Sidebar } from "@/components/layout/SideBar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export const Layout = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
    
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  return (
    <section className="flex flex-col lg:flex-row h-screen bg-[var(--bg-canvas)] overflow-y-auto">
      {isDesktop ? <Sidebar /> : <Navbar />}
      <div className="bg-[var(--bg-accent)] pt-0 lg:pt-3 flex-1">
        <div
          className="bg-[var(--bg-canvas)] lg:rounded-tl-[2rem] h-full"
        >
          <div className="py-8 h-full max-w-full container mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};