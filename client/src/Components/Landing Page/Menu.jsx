import React from "react";
import MenuCard from "./MenuCard";
import { Button } from "../ui/button";

const Menu = () => {
  return (
    <div className="h-[100vh] bg-[#131620] px-[30px] pt-[50px]">
      <p className="text-[#DE8F25] uppercase text-center tracking-widest text-[18px]">
        Culinary Execellence
      </p>
      <p className="text-white text-center text-4xl font-serif font-bold mt-5">
        Signature Creations
      </p>

      <div className=" mt-12 flex justify-around">
        <MenuCard
          img={`https://images.unsplash.com/photo-1504674900247-0877df9cc836`}
          name={`Pan-Seared Duck Breast`}
          desc={`With cherry gastrique and wild mushroom risotto`}
          price={`$42`}
        />
        <MenuCard
          img={`https://images.unsplash.com/photo-1504674900247-0877df9cc836`}
          name={`Pan-Seared Duck Breast`}
          desc={`With cherry gastrique and wild mushroom risotto`}
          price={`$42`}
        />
        <MenuCard
          img={`https://images.unsplash.com/photo-1504674900247-0877df9cc836`}
          name={`Pan-Seared Duck Breast`}
          desc={`With cherry gastrique and wild mushroom risotto`}
          price={`$42`}
        />
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
