import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Category from "@/Components/Menu/Category";
import { useEffect, useState } from "react";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [category, setCategory] = useState(null);

    const getMenu = async (categoryId) => {
        const response = await fetch(`http://localhost:8000/api/menu/getMenuFromCategory/${categoryId}`);

        if (response.ok) {
            const data = await response.json();
            console.log(data.items);
            setMenu(data.items);
        }

    }

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
        <Category onCategorySelect={setCategory}/>
      </div>
    </div>
  );
};

export default Menu;
