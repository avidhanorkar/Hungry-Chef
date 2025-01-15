import React from "react";

const MenuCard = ({ img, name, desc, price }) => {
  return (
    <div className="bg-[#171B26] h-[450px] w-[400px] rounded-md">
      <img src={img} alt="" className="w-full h-[50%] bg-[red] rounded-t-md object-cover" />
      <div className="p-6 flex flex-col justify-evenly h-[50%]"> 
        <p className="font-serif text-white text-2xl">{name}</p>
        <p className="text-gray-500 text-[15px]">{desc}</p>
        <p className="text-[#DE8F25] text-xl font-serif font-semibold">{price}</p>
      </div>
    </div>
  );
};

export default MenuCard;
