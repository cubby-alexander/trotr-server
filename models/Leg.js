const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const legSchema = new Schema({
    start: String,
    end: String,
    lat: Number,
    lng: Number,
    radius: Number,
    trip: {type: Schema.Types.ObjectId, ref: 'Trip'}
})

const Leg = mongoose.model('Leg', legSchema);

module.exports = Leg;
