import React from "react";
import { Utensils } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

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
          <ul className="flex space-x-10 text-[18px] text-white items-center">
            <Link to={'/home'}><li className="cursor-pointer">Home</li></Link>
            <Link to={'/home'}><li className="cursor-pointer">About</li></Link>
            <Link to={'/home'}><li className="cursor-pointer">Menu</li></Link>
            <Link to={'/home'}><li className="cursor-pointer">Contact</li></Link>
            <Link to={'/auth/login'}><Button className="rounded-sm text-white font-semibold hover:bg-white hover:text-black hover:drop-shadow-md bg-[#DE8f25]">Sign In</Button></Link>
            <Link to={'/auth/register'}><Button className="rounded-sm text-black font-semibold bg-white hover:bg-[#DE8F25] hover:text-white hover:drop-shadow-lg">Register</Button></Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
