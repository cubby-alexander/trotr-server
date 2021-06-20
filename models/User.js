const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelSchema = new Schema({
        start: String,
        end: String,
        lat: mongoose.Decimal128,
        lng: mongoose.Decimal128,
        social_fence: Number,
})

const tripSchema = new Schema({
        travel_legs: [travelSchema]
})

const domesticSchema = new Schema({
        lat: { type: mongoose.Decimal128, required: false },
        lng: { type: mongoose.Decimal128, required: false },
        social_fence: { type: Number, required: false },
        sleep_start: { type: Number, required: false },
        sleep_end: { type: Number, required: false },
        work_start: Number,
        work_end: Number,
        work_lat: mongoose.Decimal128,
        work_lng: mongoose.Decimal128,
});

const userSchema = new Schema({
        name: {type: String, required: true},
        avatar: {type: String, required: false},
        email: {type: String, required: true},
        password: {type: String, required: true},
        phone: {type: String, required: false},
        domestic: domesticSchema,
        trips: [tripSchema],
        pending: [{type: Schema.Types.ObjectId, ref: 'User'}],
        requested: [{type: Schema.Types.ObjectId, ref: 'User'}],
        current: [{type: Schema.Types.ObjectId, ref: 'User'}],
        blocked: [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    { timestamps: true }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;