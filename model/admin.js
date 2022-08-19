const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
});
// export model Admin with AdminSchema
module.exports = mongoose.model("admins", AdminSchema);
