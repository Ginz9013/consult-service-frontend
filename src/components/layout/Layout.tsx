import React, { ReactElement, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <header className="fixed z-20 top-0 w-full rounded-b-xl overflow-hidden">
        <Header />      
      </header>

      <main className="flex-1 pt-28 overflow-scroll">
        { children }
      </main>

      <footer className="rounded-t-xl overflow-hidden">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;