const mongoose = require('mongoose')

const { Schema } = mongoose
const amenitiesSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    pg: {
        type: Schema.Types.ObjectId,
        ref: 'Pg'
    }
})

const Amenities = mongoose.model('Amenities', amenitiesSchema)

module.exports = {
    Amenities
}