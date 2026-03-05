import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { PageTransition } from "./components/animations/PageTransition";
import { AnimatePresence } from "framer-motion";
import { useShouldReduceMotion } from "./hooks/useShouldReduceMotion";

export const Layout = () => {
  const location = useLocation();
  const shouldReduceMotion = useShouldReduceMotion();

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        {shouldReduceMotion ? (
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        ) : (
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        )}
      </main>
      <Footer />
    </div>
  );
};
