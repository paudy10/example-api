const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
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
    author: {
        type: String,
        required: true

    },
    img: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// export model blog with BlogSchema
module.exports = mongoose.model("blog", BlogSchema);
