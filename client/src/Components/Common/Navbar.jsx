import React, { useContext } from "react";
import { Utensils } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/auth.context";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
    <div className="h-[10vh] bg-[#131620] px-20">
      <div className="h-full w-full flex justify-between items-center px-4">
        <Link to={"/"}>
          <div className="flex gap-2 cursor-pointer">
            <Utensils className="h-8 w-8 text-[#DE8F25]" />
            <h1 className="text-white font-bold font-serif text-3xl tracking-wider">
              Hungry Chef
            </h1>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-10 text-[18px] text-white items-center">
            <Link to={"/home"}>
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link to={"/home"}>
              <li className="cursor-pointer">About</li>
            </Link>
            <Link to={"/home"}>
              <li className="cursor-pointer">Menu</li>
            </Link>
            <Link to={"/home"}>
              <li className="cursor-pointer">Contact</li>
            </Link>
            {!user ? (
              <Link to={"/auth"}>
                <Button className="rounded-sm text-white font-semibold hover:bg-white hover:text-black hover:drop-shadow-md bg-[#DE8f25]">
                  Log In
                </Button>
              </Link>
            ) : (
              <Link to={`/profile/${user.user}`}>
                <div className="rounded-full h-10 w-10 bg-black">
                <img className="rounded-full" src={`${user.profilePic}`} alt="" />
                </div>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
