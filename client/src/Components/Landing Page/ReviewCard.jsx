import React from "react";
import { Star } from "lucide-react";
const ReviewCard = ({review, name, title}) => {
  return (
    <div className="h-[400px] w-[450px] bg-[#131620] rounded flex flex-col justify-between p-[30px]">
      <p className="flex">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#DE8F25] text-[#DE8f25]" />
          ))}
      </p>
      <p className="font-serif font-bold text-xl text-white">{review}</p>
      <div>
      <p className="font-bold text-white text-[18px]">{name}</p>
      <p className="text-gray-500 text-[14px]">{title}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
