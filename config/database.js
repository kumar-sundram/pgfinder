const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/pg-finder', { useNewUrlParser: true })
    .then(() => {
        console.log('connected to DB')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })
module.exports = {
    mongoose
}