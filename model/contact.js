const mongoose = require("mongoose");
const ContactSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        required: true

    }
});

// export model Contact with ContactSchema
module.exports = mongoose.model("Contact", ContactSchema);
