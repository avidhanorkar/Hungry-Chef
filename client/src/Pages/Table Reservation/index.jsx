import { useContext, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { AuthContext } from "@/context/auth.context";
import { useNavigate } from "react-router-dom";

const TableReservation = () => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(null);
  const [guest, setGuest] = useState(0);
  const [start, setStart] = useState("00:00");
  const [end, setEnd] = useState("00:00");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "guest") {
      setGuest(value < 1 ? "" : value);
    } else if (name === "start") {
      setStart(value);
    } else if (name === "end") {
      setEnd(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`https://hungry-chef.onrender.com/api/reservation/makeReservation`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: user.user,
              date: date,
              guestCount: guest,
              start: start,
              end: end
            })
          })
          

        if (response.ok) {
            const data = await response.json();

            console.log(data.reservation);
            setDate(null);
            setEnd("00:00")
            setStart("00:00")
            setGuest(0);
            navigate(`/profile/${user.user}`)
        }
    } catch (error) {
        
    }
  };
  return (
    <div className="bg-[#131620] h-[80vh] w-[100vw] px-20 py-5">
      <p className="text-3xl text-center font-serif font-bold text-white mb-8 leading-tight">
        Book Your Feast at Hungry Chef! 🍽️🔥
      </p>
      <div className="h-[70%] w-full bg-[#171B26] rounded-lg p-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-around flex-wrap">
            <div className="flex flex-col gap-5 w-[45%] items-center m-5">
              <label
                htmlFor="date"
                className="text-white font-medium text-center"
              >
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      "w-[80%] justify-start text-left font-normal bg-[#131620]",
                      !date && "text-white"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 " />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span className="w-full text-center">Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none shadow-none rounded-md">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="bg-[#131620] text-white border-none shadow-none rounded-md"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-5 w-[45%] items-center m-5">
              <label
                htmlFor="guest"
                className="text-white font-medium text-center"
              >
                Guest Count
              </label>
              <input
                type="number"
                name="guest"
                id=""
                onChange={handleChange}
                placeholder="Guest Count"
                className="bg-[#131620] w-[80%] text-white outline-none h-10 text-center placeholder:text-gray-400 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-5 w-[45%] items-center m-5">
              <label htmlFor="" className="text-white font-medium text-center">
                From (24hrs Clock)
              </label>
              <input
                type="time"
                name="start"
                id=""
                onChange={handleChange}
                value={start}
                className="bg-[#131620] w-[80%] text-white outline-none h-10 text-center placeholder:text-gray-400 rounded-md [&::-webkit-calendar-picker-indicator]:invert "
              />
            </div>

            <div className="flex flex-col gap-5 w-[45%] items-center m-5">
              <label htmlFor="" className="text-white font-medium text-center">
                Till (24hrs Clock)
              </label>
              <input
                type="time"
                name="end"
                id=""
                onChange={handleChange}
                value={end}
                className="bg-[#131620] w-[80%] text-white outline-none h-10 text-center placeholder:text-gray-400 rounded-md [&::-webkit-calendar-picker-indicator]:invert "
              />
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <Button
              type="submit"
              size="lg"
              className="text-sm tracking-wider uppercase px-12 py-6 bg-primary hover:bg-[#DE8F25] bg-[#e9a343] "
            >
              Book The Table
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableReservation;
