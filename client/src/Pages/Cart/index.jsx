import { AuthContext } from "@/context/auth.context";
import { useContext, useEffect, useState } from "react";
import Card from "@/Components/Menu/Card";
const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);

  const getCart = async () => {
    if (!user?.user) return; // Check if user is available before making the API call

    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/getCart/${user.user}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCart(data.cart); // Store the cart data in state
      } else {
        console.error("Failed to fetch cart data");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (user?.user) {
      getCart(); // Call getCart only if user is available
    }
  }, [user]); // Run the effect when user changes

  return (
    <div className="min-h-[100vh] bg-[#131620] flex flex-row gap-5 py-10 px-20">
      <div className="w-3/4 h-full flex flex-col gap-5 flex-wrap  justify-center p-5">
      <p className="font-bold font-serif text-center m-5 text-3xl text-white">Cart Items</p>
      <div className="flex flex-wrap flex-row gap-5">
        {cart?.menuItems?.map((item, index) => {
          return (
            <Card
              key={index}
              id={item.menu.id}
              img={item.menu.image}
              name={item.menu.menuItem}
              desc={item.menu.desc}
              price={item.menu.price}
              //   handleClick={() => addToCart(item.menu._id)}
              btnText={"Remove Cart"}
            />
          );
        })}
        </div>
      </div>
      <div className="h-[100vh] w-1/4 bg-[#171B26] rounded-md">
        <p className="font-bold font-serif text-center m-5 text-3xl text-white">Billings and Payment</p>
      </div>
    </div>
  );
};

export default Cart;
