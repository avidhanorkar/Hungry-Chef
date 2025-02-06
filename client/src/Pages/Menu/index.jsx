import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Category from "@/Components/Menu/Category";
import { useEffect, useState } from "react";
import Card from "@/Components/Menu/Card";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState(null);
  const [categoryName, setCategoryName] = useState(null);

  const getMenu = async (categoryId) => {
    const response = await fetch(
      `http://localhost:8000/api/menu/getMenuFromCategory/${categoryId}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.items);
      setMenu(data.items);
    }
  };

  useEffect(() => {
    if (category) {
      getMenu(category);
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-[#131620] w-full flex flex-col px-20 py-5">
      {/* Search Bar */}
      <div className="flex gap-5 justify-center">
        <Input
          className="w-[500px]"
          placeholder="Search Functionality is yet to be added"
        />
        <Button className="bg-[#DE8F25] hover:bg-white hover:text-black tracking-wide">
          Search
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-row gap-5 justify-center">
        <Category
          onCategorySelect={setCategory}
          categoryName={setCategoryName}
        />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col mt-10 gap-5">
        <p className="text-center text-white font-serif text-5xl tracking-wider font-semibold">
          {categoryName}
        </p>
        <div className="flex flex-row flex-wrap gap-5 justify-center">
            {/* ToDo: To create a menu card component with add to card button as same as the MenuCard */}
          {menu.map((item, index) => (
            <Card
              key={index}
              img={item.image}
              name={item.menuItem}
              desc={item.desc}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
