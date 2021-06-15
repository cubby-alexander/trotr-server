const mongoose = require('mongoose');

const domesticSchema = new mongoose.Schema({
    lat: { type: mongoose.Decimal128, required: true },
    lng: { type: mongoose.Decimal128, required: true },
    social_fence: { type: Number, required: true },
    sleep_start: { type: Number, required: true },
    sleep_end: { type: Number, required: true },
    work_start: Number,
    work_end: Number,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Domestic = mongoose.model("Domestic", domesticSchema);

module.exports = Domestic;