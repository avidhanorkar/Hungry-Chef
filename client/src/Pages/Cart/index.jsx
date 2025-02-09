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
        <p className="font-bold font-serif text-center m-5 text-3xl text-white">
          Cart Items
        </p>
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
      <div className="h-[100vh] w-1/4 bg-[#171B26] rounded-md px-5">
        <p className="font-bold font-serif text-center m-5 text-3xl text-white">
          Billings and Payment
        </p>
        <hr className="text-white w-full px-5" />
        <div className="flex flex-col justify-center  gap-5 py-5 w-full">
          <p className="text-white text-xl font-serif text-center">
            Cart Items
          </p>
          <div className="flex flex-col gap-1">
            {cart?.menuItems?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row justify-between w-full px-5"
                >
                  <p className="text-gray-400 text-[16px]">
                    {item.menu.menuItem}
                  </p>
                  <p className="text-gray-400 text-[16px]">{item.menu.price}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row justify-between items-center w-full px-5">
            <p className="text-white text-[18px] font-serif">Total</p>
            <p className="text-white text-[18px] font-serif">
              $ {cart?.totalPrice}
            </p>
          </div>
          <hr className="text-white w-full px-5" />
          <div className="flex flex-col justify-center items-center px-5">
            <p className="text-center text-xl text-white font-serif">Address</p>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
