"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import steps from "../../utils/Why.js";
import Button from "../helpers/Button";
import Link from "next/link";

export default function WhyUs() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  // calculate scroll progress for the timeline line
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const start = rect.top - winH / 2;
      const end = rect.bottom - winH / 2;
      const prog = Math.min(Math.max((0 - start) / (end - start), 0), 1);
      setScrollProgress(prog);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 lg:px-16 pb-30 pt-30 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-12 text-white">
          So funktioniert der Autoankauf bei Autogalerie Jülich
        </h2>

        {/* Static Gray Line */}
        <div className="hidden md:block absolute top-[220px] bottom-[250px] left-1/2 transform -translate-x-1/2 w-[2px] bg-gray-300 z-0" />

        {/* Dynamic Red Line */}
        <div
          className="hidden md:block absolute top-[220px] left-1/2 transform -translate-x-1/2 w-[2px] bg-red-600 z-10 transition-all duration-300"
          style={{
            height: `calc(${scrollProgress} * (90% - 350px))`,
          }}
        />

        {/* Timeline Items */}
        <div className="relative flex flex-col gap-20 md:gap-32 z-20">
          {steps.map((step, i) => {
            const reached = scrollProgress >= i / steps.length;
            return (
              <div
                key={step.id}
                className={`relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <Image
                    src={step.image}
                    alt={`Schritt ${step.id}`}
                    width={300}
                    height={200}
                    className="rounded-xl shadow-lg max-w-full h-auto"
                  />
                </div>

                {/* Text */}
                <div className="bg-gradient-to-br from-black to-red-950 rounded-xl shadow-md p-6 sm:p-8 max-w-md w-full md:w-1/2 relative z-10 text-center md:text-left">
                  <h3 className="font-bold text-lg sm:text-xl mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>

                {/* Step Number */}
                <div
                  className={`hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 items-center justify-center font-bold z-30 transition-all duration-300 ${
                    reached
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                >
                  {step.id}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <div className="flex justify-center mb-3">
            <Link href="/gebrauchtwagen" passHref>
              <Button className="px-6 py-2 text-sm">
                Kostenlose Fahrzeugbewertung
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
    </section>
  );
}
