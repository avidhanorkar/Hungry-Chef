import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Order = ({ userDet }) => {
  const [order, setOrder] = useState(null);
  const getOrder = async (orderId) => {
    try {
      const response = await fetch(
        `https://hungry-chef.onrender.com/api/order/getOrderById/${orderId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log("Order Data ", data.order);
      setOrder(data.order);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    if (userDet?.prevOrder?.[userDet.prevOrder.length - 1]) {
      getOrder(userDet?.prevOrder?.[userDet.prevOrder.length -1]);
    }
  }, [userDet]);

  return (
    <>
      <div className="mt-3">
        {order ? (
          <div className="bg-[#131620] h-32 w-full rounded-lg flex flex-col justify-center px-5">
            <div className="flex justify-between w-full">
              <p className="text-white">Order Id: </p>
              <p className="text-white">{order._id}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-white">Delivery Address: </p>
              <p className="text-white">{order.deliveryAddress}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-white">Menu Item: </p>
              <p className="text-white">{order?.menuItem}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-white">Total Price: </p>
              <p className="text-white">{order.totalPrice}</p>
            </div>
          </div>
        ) : (
          <div className="bg-[#131620] h-32 w-full rounded-lg flex flex-col justify-center px-5 gap-2">
            <p className="text-white text-lg text-center">
              There is no order history!
            </p>
            <div className="w-full flex justify-center">
              <Link to={'/browseMenu'}>
                <Button className="text-sm tracking-wider uppercase px-12 py-6 bg-primary hover:bg-[#DE8F25] bg-[#e9a343] ">
                  Order Food
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
