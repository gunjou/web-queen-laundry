import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Tracking from "./sections/Tracking";
import Services from "./sections/Services";
import Benefit from "./sections/Benefit";
import Area from "./sections/Area";
import Footer from "./sections/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fc] dark:bg-[#070A12] text-slate-900 dark:text-white transition-colors relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.12),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.12),transparent_50%)]" />

      <Navbar />

      <main className="pt-10 space-y-20 md:space-y-28">
        <Hero />
        {/* <Tracking /> */}
        <Services />
        <Benefit />
        <Area />
        <Footer />
      </main>
    </div>
  );
}
