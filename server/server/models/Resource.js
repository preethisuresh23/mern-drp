const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category: String,

 filePath: {
  type: String,
  required: true,
},

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Resource", resourceSchema);
