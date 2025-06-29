"use client";

import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const NavigationCard = ({ href, icon, title, description, accentColor }) => {
  const colorMap = {
    red: "bg-red-100 text-red-700",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    orange: "bg-orange-100 text-orange-700",
    indigo: "bg-indigo-100 text-indigo-700",
    purple: "bg-purple-100 text-purple-700",
    pink: "bg-pink-100 text-pink-700",
    teal: "bg-lime-100 text-lime-700",
    cyan: "bg-cyan-100 text-cyan-700",
    lime: "bg-lime-100 text-lime-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
    sky: "bg-sky-100 text-sky-700",
    slate: "bg-slate-100 text-slate-700",
    gray: "bg-gray-100 text-gray-700",
    zinc: "bg-zinc-100 text-zinc-700",
    neutral: "bg-neutral-100 text-neutral-700",
    stone: "bg-stone-100 text-stone-700",
  };

  const gradientMap = {
    red: "from-red-400 to-red-300",
    green: "from-green-400 to-green-300",
    blue: "from-blue-400 to-blue-300",
    yellow: "from-yellow-400 to-yellow-300",
    orange: "from-orange-400 to-orange-300",
    indigo: "from-indigo-400 to-indigo-300",
    purple: "from-purple-400 to-purple-300",
    pink: "from-pink-400 to-pink-300",
    teal: "from-lime-500 to-lime-700",
    cyan: "from-cyan-400 to-cyan-300",
    lime: "from-lime-400 to-lime-300",
    amber: "from-amber-400 to-amber-300",
    rose: "from-rose-400 to-rose-300",
    sky: "from-sky-400 to-sky-300",
    slate: "from-slate-400 to-slate-300",
    gray: "from-gray-400 to-gray-300",
    zinc: "from-zinc-400 to-zinc-300",
    neutral: "from-neutral-400 to-neutral-300",
    stone: "from-stone-400 to-stone-300",
  };

  return (
    <Link href={href} passHref>
      <div
        className={`group relative h-full overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br ${gradientMap[accentColor]} p-4 md:p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 md:hover:-translate-y-1`}
      >
        <div className="relative z-10 flex items-start">
          <div
            className={`mr-3 md:mr-4 rounded-lg md:rounded-xl p-2 md:p-3 ${colorMap[accentColor]} transition-all group-hover:scale-105 md:group-hover:scale-110`}
          >
            {React.cloneElement(icon, { className: "text-sm md:text-base" })}
          </div>
          <div className="flex-1">
            <h3 className="text-sm md:text-lg font-semibold text-gray-800">
              {title}
            </h3>
            <p className="mt-1 text-xs md:text-sm text-gray-600 line-clamp-2">
              {description}
            </p>
            <div className="mt-2 md:mt-3 flex items-center text-xs md:text-sm font-medium text-gray-500 transition-colors group-hover:text-gray-700">
              <span>Modul öffnen</span>
              <FiChevronRight className="ml-0.5 md:ml-1 transition-transform group-hover:translate-x-0.5 md:group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NavigationCard;
