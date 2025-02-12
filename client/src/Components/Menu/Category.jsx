import { useEffect, useState } from "react";

const Category = ({ onCategorySelect, categoryName }) => {
  const [category, setCategory] = useState([]); // Initialize as empty array

  const getCategories = async () => {
    try {
      const response = await fetch(
        `https://hungry-chef.onrender.com/api/categories/getAll`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.data);
        setCategory(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-row gap-16 pt-10">
      {category.map((cat, index) => (
        <div
          key={index}
          className="w-[150px] flex flex-col gap-5 text-center justify-center items-center bg-[#171B26] p-5 rounded-md cursor-pointer"
          onClick={() => {onCategorySelect(cat._id); categoryName(cat.name)}}
        >
          <img className="h-[75px] w-[75px]" src={cat.image} alt={cat.name} />
          <p className="text-white font-serif text-xl">{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
