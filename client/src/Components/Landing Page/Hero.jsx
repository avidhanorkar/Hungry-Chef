import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/auth.context";

const Hero = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="h-[92vh]">
      <div className="flex ">
        <div className="flex w-1/2 h-full items-center px-8 md:px-16 lg:px-24 py-32">
          <div className="">
            <p className="text-[#DE8F25] font-sans text-sm tracking-[0.3em] uppercase mb-6">
              Welcome to Hungry Chef
            </p>
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
              A Culinary Journey of Excellence
            </h1>
            <p className="text-xl text-[#818DA2] font-sans mb-12 ">
              Experience the epitome of fine dining where every dish tells a
              story of passion and artistry
            </p>
            {user ? (
              <Link to={"/reserveTable"}>
                <Button
                  size="lg"
                  className="text-sm tracking-wider uppercase px-12 py-6 bg-primary hover:bg-[#DE8F25] bg-[#e9a343] "
                >
                  Reserve Your Experience
                </Button>
              </Link>
            ) : (
              <Link to={"/auth"}>
                <Button
                  size="lg"
                  className="text-sm tracking-wider uppercase px-12 py-6 bg-primary hover:bg-[#DE8F25] bg-[#e9a343] "
                >
                  Reserve Your Experience
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="h-[92vh] w-1/2 flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
            alt="Fine dining experience"
            className=" w-[80%] h-[80%] object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
