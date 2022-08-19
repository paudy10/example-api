const mongoose = require("mongoose");
const PriceSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    option: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// export model price with priceSchema
module.exports = mongoose.model("price", PriceSchema);
