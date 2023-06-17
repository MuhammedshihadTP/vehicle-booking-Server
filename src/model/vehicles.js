const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true, 
  },
  wheel:String,
  type: String,
  model: String,
  bookedDates: [
    {
      startDate: Date,
      endDate: Date,
    },
  ],
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
