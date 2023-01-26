const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    proId: {
        type: Number,
        required: true
    }
});

// export model cart with cartSchema
module.exports = mongoose.model("cart", CartSchema);
