import { AuthContext } from "../../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Order from "../../Components/Profile/order.jsx";
import { Button } from "@/Components/ui/button";
import Reservation from "@/Components/Profile/reservation";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [userDet, setUserDet] = useState(null);
  const id = user?.user;

  const getUser = async (id) => {
    if (!id) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/getUser/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserDet(data.user);
      console.log(data.user);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  if (!user) {
    return <p className="text-white text-xl">Loading...</p>;
  }

  return (
    <div className="h-[80vh] bg-[#131620] flex items-center gap- justify-center ">
      <div className="h-full flex justify-center flex-col items-center w-[25%] ">
        <div className="w-[300px] h-[300px] bg-black rounded-full">
          <img
            src={user.profilePic}
            className="w-[300px] h-[300px] rounded-full"
            alt="Profile"
          />
        </div>
        <Button
          onClick={logout}
          className="text-sm tracking-wider uppercase px-12 py-6 text-red-600 border-red-600 border-2 bg-transparent hover:bg-red-600 hover:text-white mt-5"
        >
          Log Out
        </Button>
      </div>
      <div className="w-[75%] rounded-xl h-full flex justify-start flex-col pt-10 px-[120px] gap-10">
        <div className="bg-[#171B26] p-[30px] rounded-lg">
          <p className="text-2xl tracking-wide text-white font-semibold">
            User Details
          </p>{" "}
          <br />
          <div className="flex flex-col gap-5">
            <div className="flex justify-between w-full">
              <p className="text-white font-serif text-[18px]">Name</p>
              <p className="text-white font-semibold text-xl">
                {userDet?.name || "Fetching..."}
              </p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-white font-serif text-[18px]">Email</p>
              <p className="text-white font-semibold text-xl">
                {userDet?.email || "Fetching..."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full gap-5">
          <div className="w-1/2 bg-[#171B26] rounded-lg h-52 p-[25px] ">
            <h1 className="text-white text-xl font-semibold tracking-wide">
              Reservations
            </h1>
            <div>
              <Reservation userDet={userDet} />
            </div>
          </div>
          <div className="w-1/2 bg-[#171B26] rounded-lg h-52 p-[25px]">
            <h1 className="text-white text-xl font-semibold tracking-wide">
              Orders
            </h1>
            <div>
              {/* Map the Previous Order if Present */}
              <Order userDet={userDet} />
              {/* <div className="mt-3">
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
                      <p className="text-white">{order?.menuItem.menuItem}</p>
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
                  <Link>
                    <Button className="text-sm tracking-wider uppercase px-12 py-6 bg-primary hover:bg-[#DE8F25] bg-[#e9a343] ">
                      Order Food
                    </Button>
                  </Link>
                  </div>
                </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
