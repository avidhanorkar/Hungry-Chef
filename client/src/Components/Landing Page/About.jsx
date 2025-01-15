import React from "react";
const About = () => {
  return (
    <div className="h-[100vh] bg-[#171B26]">
      <div className="flex ">
        <div className="flex w-1/2 h-full items-center px-8 md:px-16 lg:px-24 py-32">
          <div className="">
            <p className="text-[#DE8F25] font-sans text-sm tracking-[0.3em] uppercase mb-6">
              Our legacy{" "}
            </p>
            <h1 className="text-5xl font-serif font-bold text-white mb-8 leading-tight">
              A Tradition of Excellence Since 1990
            </h1>
            <p className="text-[18px] text-[#818DA2] font-sans mb-12 ">
              For over three decades, Hungry Chef has been crafting
              extraordinary culinary experiences that blend timeless traditions
              with contemporary innovation. Our commitment to excellence is
              reflected in every detail, from our carefully sourced ingredients
              to our masterfully prepared dishes.
            </p>

            <div className="flex justify-between">
                <div className="flex flex-col"> 
                    <p className="text-3xl font-serif text-[#DE8F25]">30+</p>
                    <p className="text-xl text-gray-200 tracking-tighter leading-tight uppercase">Years Of Execellence</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-3xl font-serif text-[#DE8F25]">50+</p>
                    <p className="text-xl text-gray-200 tracking-tighter leading-tight uppercase">Signature Dishes</p>
                </div>
            </div>
          </div>
        </div>
        <div className="h-[92vh] w-1/2 flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
            alt="Fine dining experience"
            className=" w-[85%] h-[85%] object-cover "
          />
          <div className="border-[#DE8F25] border-2 absolute w-[44%] h-[77%] z-5">

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
