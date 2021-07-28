const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domesticSchema = new Schema({
        lat: { type: Number, required: false },
        lng: { type: Number, required: false },
        radius: { type: Number, required: false },
        sleep_start: { type: Number, required: false },
        sleep_end: { type: Number, required: false },
        work_start: Number,
        work_end: Number,
        work_lat: Number,
        work_lng: Number,
});

const userSchema = new Schema({
        name: {type: String, required: true},
        avatar: {type: String, required: false},
        email: {type: String, required: true},
        password: {type: String, required: true},
        phone: {type: String, required: false},
        domestic: domesticSchema,
        trips: [{type: Schema.Types.ObjectId, ref: 'Trip'}],
        pending: [{type: Schema.Types.ObjectId, ref: 'User'}],
        requested: [{type: Schema.Types.ObjectId, ref: 'User'}],
        current: [{type: Schema.Types.ObjectId, ref: 'User'}],
        blocked: [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    { timestamps: true }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
