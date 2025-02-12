import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";

const Reservation = ({ userDet }) => {
  const [reservation, setReservation] = useState(null);
  const getReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `https://hungry-chef.onrender.com/api/reservation/getReservationById/${reservationId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setReservation(data.reservation);
      // console.log(data);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  useEffect(() => {
    if (userDet?.reservations?.[0]) {
      getReservation(userDet.reservations[userDet.reservations.length - 1]);
    }
  }, [userDet]);

  return (
    <div className="mt-3">
      {reservation ? (
        <div className="bg-[#131620] h-32 w-full rounded-lg flex flex-col justify-center px-5">
          <div className="flex justify-between w-full">
            <p className="text-white">Table No.: </p>
            <p className="text-white">{reservation.tableNo}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-white">Date: </p>
            <p className="text-white">{reservation.date}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-white">Start Time: </p>
            <p className="text-white">{reservation.startTime}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-white">Guests: </p>
            <p className="text-white">{reservation.guestCount}</p>
          </div>
        </div>
      ) : (
        <div className="bg-[#131620] h-32 w-full rounded-lg flex flex-col justify-center px-5 gap-2">
          <p className="text-white text-lg text-center">
            Please make a reservation.
          </p>
          <div className="w-full flex justify-center">
            <Link to={'/reserveTable'}>
              <Button className="text-sm tracking-wider uppercase px-12 py-6 bg-primary hover:bg-[#DE8F25] bg-[#e9a343] ">
                Make Reservation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
