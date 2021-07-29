const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    owner: {type: Schema.types.ObjectId, ref: 'User'},
    openness: String,
    in_person: Boolean,
    location: String,
    lat: Number,
    lng: Number,
    compare_start_date: String,
    compare_end_date: String,
    selected_date: String,
    start_time: Number,
    hard_end_time: Number,
    attendants_invited: [{type:Schema.types.ObjectId, ref: 'User'}],
    attendants_confirmed: [{type:Schema.types.ObjectId, ref: 'User'}],
    attendants_declined: [{type:Schema.types.ObjectId, ref: 'User'}],
    attendants_maybe: [{type:Schema.types.ObjectId, ref: 'User'}],
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
