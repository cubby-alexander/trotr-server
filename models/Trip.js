const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    travel_legs: [{type: Schema.Types.ObjectId, ref: 'Leg'}]
})

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
