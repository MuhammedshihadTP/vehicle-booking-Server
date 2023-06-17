const Vehicle = require("../model/vehicles");

module.exports = {
  //add new vehicle
  addVehicle: async (req, res) => {
    const { type, model, wheel, name } = req.body;

    try {
      const existingVehicle = await Vehicle.findOne({ name });
      if (existingVehicle) {
        return res.status(400).json({ error: "Vehicle name already exists" });
      }
      const vehicle = new Vehicle({ type, model, wheel, name });
      await vehicle.save();
      res.status(201).json({ message: "Vehicle added successfully" });
    } catch (error) { 
      console.error("Failed to add vehicle:", error);
      res.status(500).json({ error: "Failed to add vehicle" });
    }
  },

  // Fetch all vehicles
  getAllVehicles: async (req, res) => {
    try {
      const vehicles = await Vehicle.find();
      res.status(200).json(vehicles);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
      res.status(500).json({ error: "Failed to fetch vehicles" });
    }
  },

  // Add a new booking
  addBooking: async (req, res) => {
    console.log(req.body);
    const { name, type, model, startDate, endDate } = req.body;
  
    try {
      // Check if the vehicle of the specified type is available for the given dates
      const vehicle = await Vehicle.findOne({
        type,
        bookedDates: {
          $elemMatch: {
            $or: [
              { startDate: { $lt: endDate }, endDate: { $gt: startDate } },
              { startDate: { $lte: startDate }, endDate: { $gte: endDate } },
              { startDate: { $gte: startDate }, endDate: { $lte: endDate } },
            ],
          },
        },
      });
  
      if (vehicle) {
        return res.status(400).json({
          error: "The vehicle is already booked for the specified dates",
        });
      }
  
      // Validate name, type, and model
     
  
      // Update the vehicle's bookedDates array with the new booking
      const updatedVehicle = await Vehicle.findOneAndUpdate(
        { type, model,name },
        { $push: { bookedDates: { startDate, endDate } } },
        { new: true }
      );
  
      if (!updatedVehicle) {
        return res
          .status(404)
          .json({ error: "No vehicle found for the specified type and model" });
      }
  
      // Booking added successfully
      res.status(201).json({ message: "Booking added successfully", booking: updatedVehicle });
    } catch (error) {
      console.error("Failed to add booking:", error);
      res.status(500).json({ error: "Failed to add booking" });
    }
  }
  
};
