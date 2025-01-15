import React from "react";
import ReviewCard from "./ReviewCard";

const Testimonials = () => {
  return (
    <div className="h-[100vh] bg-[#171B26] p-[30px]">
      <p className="text-[#DE8F25] uppercase text-center tracking-widest text-[18px]">
        Guest Experience
      </p>
      <p className="capitalize text-white text-center text-5xl font-serif font-bold mt-5  ">
        What our Patrons Say
      </p>
      <div className="flex flex-row justify-around mt-20">
        <ReviewCard
          review={`An extraordinary dining experience that sets new standards for culinary excellence. Each dish is a masterpiece of flavor and presentation.`}
          name={`James Montgomery`}
          title={`Food Critic`}
        />
        <ReviewCard
          review={`An extraordinary dining experience that sets new standards for culinary excellence. Each dish is a masterpiece of flavor and presentation.`}
          name={`James Montgomery`}
          title={`Food Critic`}
        />
        <ReviewCard
          review={`An extraordinary dining experience that sets new standards for culinary excellence. Each dish is a masterpiece of flavor and presentation.`}
          name={`James Montgomery`}
          title={`Food Critic`}
        />
      </div>
    </div>
  );
};

export default Testimonials;
