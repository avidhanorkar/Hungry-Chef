import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/auth.context";

const Card = ({ id, img, name, desc, price, handleClick, btnText }) => {



  return (
    <div
      id={id}
      className="h-[400px] w-[300px] bg-[#171B26] rounded-md flex flex-col"
    >
      <img
        src={`${img}`}
        className="h-1/2 w-full object-cover rounded-t-md"
        alt=""
      />
      <div className="flex flex-col gap-5 p-5">
        <div>
          <p className="text-white text-xl font-semibold font-serif">{name}</p>
          <p className="text-gray-500 text-[14px]">{desc}</p>
        </div>
        <div>
          <p className="text-[#DE8F25] text-xl font-serif">$ {price}</p>
        </div>
        <Button
          className="bg-[#DE8F25] hover:bg-white hover:text-black font-semibold "
          onClick={handleClick}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default Card;
