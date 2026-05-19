const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userId: {
        type: String
    },

    products: {
        type: Array
    },

    totalPrice: {
        type: Number
    },

    status: {
        type: String,
        default: "Pending"
    }

});

module.exports = mongoose.model("Order", orderSchema);