const mongoose = require('mongoose')
const validator = require('validator')

const { Schema } = mongoose
const pgSchema = new Schema({
    pgName: {
        type: String,
        //required: true
    },
    pgRent: {
        type: Number,
        //required: true
    },
    deposit: {
        type: Number,
        //required: true
    },
    roomTypes: [
        {
            type: String
        }
    ],
    amenities: [
        {
            type: String
            // type: Schema.Types.ObjectId,
            // ref: 'Amenities'
        }
    ],
    address: {
        type: String,
        //required: true
    },
    image: [
        {
            type: String,
            //required: true
        }
    ],
    foods: {
        type: String
    },
    pgTypes: {
        type: String
    },
    description: {
        type: String,
        //required: true
    },
    rules: {
        type: String,
        //required: true
    },
    review: [
        {
            rating: {
                type: Number
            },
            // foodRating: {    
            //     type: Number
            // },
            // locationRating: {
            //     type: Number
            // },
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// pgSchema.post("save", function (next) {

// })

const Pg = mongoose.model('Pg', pgSchema)

module.exports = {
    Pg
}