const { Schema, model } = require("mongoose");

const dreamSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        },

        emotions: [String], // array of emotions ( “happy”, “anxious”)

        tags: [String], // Array of user-defined tags ( “flying”, “ocean”)

        isPublic: {
            type: Boolean,
            default: false
        }, // For anonymous sharing

        imageUrl: {
            type: String
        },
    }
);


const Dream = model("Dream", dreamSchema);

module.exports = Dream;