const mongoose = require("mongoose");
const AppsSchema = mongoose.Schema({
  creator : {
    type:String
  },
  createAt : {
    type : Date,
    default: Date.now()
  },
  title : {
    type : String
  }
});
// export model app with AppSchema
module.exports = mongoose.model("apps", AppsSchema);
