import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/auth.context";
const ReserveTable = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="h-[80vh] flex justify-center items-center flex-col">
      <p className="text-[#DE8F25] uppercase text-center tracking-widest text-[18px] ">
        Your Experience Awaits
      </p>
      <p className="text-white text-center text-6xl font-serif font-bold pt-5">
        Reserve A Table For You
      </p>
      <div className="max-w-[700px] mx-auto">
        <p className="text-gray-500 text-center text-[18px]  pt-3">
          For Exceptional Dinning Experience, we invite you to make a
          reservation. For parties of 6 or more, please contact us directly
        </p>
      </div>
      <div className="flex justify-center items-center h-[20vh]">
        {user ? (
          <Link to={"/reserveTable"}>
            <Button className="text-sm tracking-wider uppercase px-12 py-6 bg-primary hover:bg-[#DE8F25] bg-[#e9a343] ">
              Book Your Table
            </Button>
          </Link>
        ) : (
          <Link to={"/auth"}>
            <Button className="text-sm tracking-wider uppercase px-12 py-6 bg-primary hover:bg-[#DE8F25] bg-[#e9a343] ">
              Book Your Table
            </Button>
          </Link>
        )}
      </div>

      <p className="text-white text-[18px] text-center font-semibold">
        Opening Hours
      </p>
      <p className="text-gray-500 text-[14px] text-center mt-5 ">
        Dinner: Tuesday - Sunday, 5:30 PM - 10:30 PM
      </p>
      <p className="text-gray-500 text-[14px] text-center mt-2 ">
        Wednesday Brunch: 11:00 AM - 2:30 PM
      </p>
    </div>
  );
};

export default ReserveTable;
