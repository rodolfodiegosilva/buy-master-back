const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // Gets id of User
            required: false,
            ref: 'User', // Adds relationship between Product and User
        },
        products: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false,
            ref: "Product",
        },
        total: {
            type: Number,
            required: true,
            default: 0,
        },
        discountedTotal: {
            type: Number,
            required: true,
            default: 0,
        },
        totalProducts: {
            type: Number,
            required: true,
            default: 0,
        },
        totalQuantity: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
