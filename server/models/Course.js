const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
    },
    courseDescription: {
        type: String,

    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    whatyouwilllearn: {
        type: String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ],

    ratingandreviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }
    ],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"Tag",
        type: [String],
        required: true,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",

    },

    studentsEnrolled: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },

    status: {
        type: String,
        enum: ["draft", "published"],
    }

});

module.exports = mongoose.model("Course", CourseSchema);