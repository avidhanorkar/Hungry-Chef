import User from "../models/user.model.js";
import Reservation from "../models/reservation.model.js";

const makeReservation = async (req, res) => {
  try {
    const { userId, date, start, end, guestCount } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const tableNo = Math.floor(Math.random() * 20) + 1;

    const existingReservation = await Reservation.findOne({
      tableNo: tableNo,
      date: date,
      $or: [
        { startTime: { $lte: start }, endTime: { $gte: start } },
        { startTime: { $lte: end }, endTime: { $gte: end } },
        { startTime: { $gte: start }, endTime: { $lte: end } },
      ],
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "Table is already booked for this time slot",
      });
    }

    const newReservation = new Reservation({
      user: userId,
      tableNo: tableNo,
      date: date,
      startTime: start,
      endTime: end,
      guestCount: guestCount,
    });
    await newReservation.save();

    user.reservations.push(newReservation._id);
    await user.save();

    return res.status(200).json({
      message: "Reservation is made",
      reservation: newReservation,
    });
  } catch (error) {
    console.log("Error in making a table reservation: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id).populate(
      "user"
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }
    return res.status(200).json({
      message: "Reservation found",
      reservation: reservation,
    });
  } catch (error) {
    console.log("Error in getting a reservation by id: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getReservationForUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const reservations = await Reservation.find({ user: userId });

    return res.status(200).json({
      message: "Reservations found",
      reservations: reservations,
    });
  } catch (error) {
    console.log("Error in getting reservations for a user: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateReservation = async (req, res) => {
    try {
        const { id, tableNo, date, start, end, guestCount } = req.body;

        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found",
            });
        }

        // Check if the table at updated time is already booked or not
        const existingReservation = await Reservation.findOne({
            tableNo: tableNo,
            date: date,
            $or: [
                { startTime: { $lte: start }, endTime: { $gte: start } },
                { startTime: { $lte: end }, endTime: { $gte: end } },
                { startTime: { $gte: start }, endTime: { $lte: end } }
            ],
            _id: { $ne: id } 
        });

        if (existingReservation) {
            return res.status(400).json({
                message: "Table is already booked for this time slot",
            });
        }

        reservation.date = date || reservation.date;
        reservation.tableNo = tableNo || reservation.tableNo;
        reservation.startTime = start || reservation.startTime;
        reservation.endTime = end || reservation.endTime;
        reservation.guestCount = guestCount || reservation.guestCount;

        await reservation.save();

        return res.status(200).json({
            message: "Reservation updated",
            updatedReservation: reservation,
        });
    } catch (error) {
        console.log("Error in updating a reservation: ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const reservationController = {
  makeReservation,
  getReservationById,
  getReservationForUser,
  updateReservation
};

export default reservationController;
