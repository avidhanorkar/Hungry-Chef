import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { Button } from "../ui/button";

const Menu = () => {
  const [menu, setMenu] = useState(null);
  const getMenu = async () => {
    try {
      const response = await fetch(`https://hungry-chef.onrender.com/api/menu/getAllItems`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const newData = data.items.slice(0, 3);
        setMenu(newData);
      }
    } catch (error) {
      console.error("Error fetching menu data", error);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);
  return (
    <div className="h-[100vh] bg-[#131620] px-[30px] pt-[50px]">
      <p className="text-[#DE8F25] uppercase text-center tracking-widest text-[18px]">
        Culinary Execellence
      </p>
      <p className="text-white text-center text-4xl font-serif font-bold mt-5">
        Signature Creations
      </p>

      <div className=" mt-12 flex justify-around">
        {menu?.map((item, index) => {
          return (
          <MenuCard
            key={index}
            img={item.image}
            name={item.menuItem}
            desc={item.desc}
            price={item.price}
          />
        )
        })}
      </div>
      <div className="w-full flex justify-center items-center mt-12">
        <Button className="px-8 py-3 mx-auto bg-black hover:bg-[#DE8F25]">
          Explore More
        </Button>
      </div>
    </div>
  );
};

export default Menu;
