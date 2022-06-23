const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Review Schema
const reviewSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        // Individual rating
        rating: {type: Number, required: true},
        comment: {type: String, required: true},
        user: {
            type: mongoose.Schema.Types.ObjectId, // Gets id of User
            required: true,
            ref: 'User', // Adds relationship between Review and User
        },
    },
    {
        timestamps: true,
    }
)

// Create Product Schema
const productSchema = new Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId, // Gets id of User
            required: false,
            ref: 'User', // Adds relationship between Product and User
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        discountPercentage: {
            type: Number,
            required: true,
            default: 0,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema);
