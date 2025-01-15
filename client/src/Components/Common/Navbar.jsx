import React from "react";
import { Utensils } from "lucide-react";
const Navbar = () => {
  return (
    <div className="h-[10vh] bg-[#131620] px-20">
      <div className="h-full w-full flex justify-between items-center px-4">
        <div className="flex gap-2">
          <Utensils className="h-8 w-8 text-[#DE8F25]" />
          <h1 className="text-white font-bold font-serif text-3xl tracking-wider">
            Hungry Chef
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-10 text-[18px] text-white">
            <li>Home</li>
            <li>About</li>
            <li>Menu</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
