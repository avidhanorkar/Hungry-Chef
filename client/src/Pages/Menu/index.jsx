import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Category from "@/Components/Menu/Category";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import Card from "@/Components/Menu/Card";

const Menu = () => {
  const { user } = useContext(AuthContext);
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [buttonText, setButtonText] = useState("Add To Cart");
  const [isAdded, setIsAdded] = useState(false);

  const getMenu = async (categoryId) => {
    const response = await fetch(
      `https://hungry-chef.onrender.com/api/menu/getMenuFromCategory/${categoryId}`
    );

    if (response.ok) {
      const data = await response.json();
      setMenu(data.items);
    }
  };

  const allMenu = async () => {
    const response = await fetch(`https://hungry-chef.onrender.com/api/menu/getAllItems`);

    if (response.ok) {
      const data = await response.json();
      setMenu(data.items);
    }
  };

  const addToCart = async (id) => {
    try {
      if (isAdded[id]) return;
      const response = await fetch(
        `https://hungry-chef.onrender.com/api/cart/addToCart/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.user,
            quantity: 2,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      console.log("Item added to cart successfully");
      setButtonText((prev) => ({ ...prev, [id]: "Added" }));
      setIsAdded((prev) => ({ ...prev, [id]: true }));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  useEffect(() => {
    if (category) {
      getMenu(category);
    }
  }, [category]);

  useEffect(() => {
    if (!category) {
      allMenu();
    }
  }, []);

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
          {categoryName || "All Menu Items"}
        </p>

        <div className="flex flex-row flex-wrap gap-5 justify-center">
          {/* ToDo: To create a menu card component with add to card button as same as the MenuCard */}
          {menu.map((item, index) => (
            <Card
              key={index}
              id={item.id}
              img={item.image}
              name={item.menuItem}
              desc={item.desc}
              price={item.price}
              handleClick={() => addToCart(item._id)}
              btnText={buttonText[item._id] || "Add To Cart"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
