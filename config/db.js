const mongoose  = require('mongoose');

const MONGOURI = "mongodb+srv://Jvdpd:jvdpd1021@cluster.fh4ra.mongodb.net/appsaz";
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;
