const mongoose = require("mongoose");
const validator = require("validator");

const clothingItem = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },

    weather: {
        type: String,
        required: true,
        enum: ["hot", "warm", "cold"],
        minlength: 2,
        maxlength: 30,
    
    
    },

    imageURL: {
        type: String,
        required: true,
        validate: {
            validator (value) {
                return validator.isURL(value)
            },
            message: "You must enter a valid URL"
       
        }
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: mongoose.Schema.Types.Number,
        ref: "user",
    }
})

module.exports = mongoose.model("clothingItem", clothingItem)