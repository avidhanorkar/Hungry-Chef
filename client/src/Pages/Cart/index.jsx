import { AuthContext } from "@/context/auth.context";
import { useContext, useEffect, useState } from "react";
import Card from "@/Components/Menu/Card";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [userDet, setUserDet] = useState(null);
  // console.log(user);

  const getUser = async () => {
    if (!user?.user) return;

    try {
      const response = await fetch(
        `https://hungry-chef.onrender.com/api/auth/getUser/${user.user}`
      );

      if (response.ok) {
        const data = await response.json();

        console.log("User data", data.user);
        setUserDet(data.user);
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  const getCart = async () => {
    if (!user?.user) return;
    try {
      const response = await fetch(
        `https://hungry-chef.onrender.com/api/cart/getCart/${user.user}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCart(data.cart);
      } else {
        console.error("Failed to fetch cart data");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (user?.user) {
      getUser();
      getCart();
    }
  }, [user]);

  const handlePayment = async () => {
    if (!user?.user) return;

    const response = await fetch(
      `https://hungry-chef.onrender.com/api/payment/createOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1,
        }),
      }
    );

    const data = await response.json();
    console.log("Create Order: ", data);
    if (response.ok) {
      const options = {
        key: import.meta.env.VITE_RZRPY_API_KEY,
        amount: data.amount,
        currency: "INR",
        order_id: data.id,  // ✅ Corrected key
        handler: async (response) => {
          console.log("Payment Success: ", response);  // Debugging
          try {
            const verifyRes = await fetch(
              `https://hungry-chef.onrender.com/api/payment/verifyPayment`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              }
            );
            const verifyData = await verifyRes.json();
            console.log("Verification Response: ", verifyData);
            alert(verifyData.message);
          } catch (error) {
            console.error("Error verifying payment: ", error);
          }
        },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  return (
    <div className="min-h-[100vh] bg-[#131620] flex flex-row gap-5 py-10 px-20">
      <div className="w-3/4 h-full flex flex-col gap-5 flex-wrap min-h-[80vh] overflow-auto justify-center p-5">
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
      <div className="h-[95vh] w-1/4 bg-[#171B26] rounded-md px-5">
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
          <div className="flex flex-col  px-5">
            <p className="text-center text-xl text-white font-serif">Address</p>
            <div>
              <p className="text-white font-[550] text-left">Your Address</p>
              <p className="text-gray-500 font-[400] text-left">
                {userDet?.address}
              </p>
              <Link to={`/profile/update/${user?.user}`}>
                <Button className="bg-[#DE8F25] mt-5 hover:bg-white hover:text-black">
                  Update Address
                </Button>
              </Link>
            </div>
          </div>
          <hr className="text-white w-full px-5" />
          <div className="flex flex-col">
            <p className="font-serif text-white text-xl text-center">
              Confirm Order
            </p>
            <p className="text-gray-500 text-left">
              Order will be delivered in 30 min to 1 hr
            </p>

            <Button
              onClick={handlePayment}
              className="bg-[#DE8F25] mt-8 hover:bg-white hover:text-black"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
