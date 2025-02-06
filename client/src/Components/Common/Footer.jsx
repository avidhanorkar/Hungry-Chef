import React, { useContext } from "react";
import { Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/auth.context";

const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="h-[40vh] bg-[#171B26] pt-12">
      <div className="h-[80%] flex flex-row justify-around">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 items-center">
            <Utensils className="h-[20px] w-[20px] text-[#DE8F25]" />
            <h1 className="text-white font-bold font-serif text-xl tracking-wider">
              Hungry Chef
            </h1>
          </div>
          <p className="text-gray-500">
            Elevating Dinning to an art form since 1990.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-white text-xl tracking-tight uppercase">
            Navigation
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">About</p>
            <Link to={"/browseMenu"}>
              <p className="text-gray-500">Menu</p>
            </Link>
            {user ? (
              <Link to={"/reserveTable"}>
                <p className="text-gray-500">Reservations</p>
              </Link>
            ) : (
              <Link to={"/auth"}>
                <p className="text-gray-500">Reservations</p>
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-white text-xl tracking-tight uppercase">
            Contact Us
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">123 Gourmet Avenue</p>
            <p className="text-gray-500">New York, NY 10013</p>
            <p className="text-gray-500">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-white text-xl tracking-tight uppercase">
            Follow Us
          </p>
          <div className="flex flex-row gap-2">
            <a href="https://www.instagram.com/this.avishkar">
              <img
                src="/insta.svg"
                className="h-[30px] w-[30px] text-white"
                alt=""
              />
            </a>

            <a href="https://x.com/avidhanorkar23">
              <img src="/twitter.svg" alt="" />
            </a>

            <a href="https://github.com/avidhanorkar/Hungry-Chef">
              <img src="/git.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 h-[20%] flex justify-center items-center flex-col">
        <p className="text-gray-500 text-center">
          Hungry Chef 2025. All rights reserved{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
