const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
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
  isUser: {
    type: Boolean,
    default: true
  },
  plan: {
    type: String,
    default: 'PlanFree'
  }
});
// export model user with UserSchema
module.exports = mongoose.model("users", UserSchema);
