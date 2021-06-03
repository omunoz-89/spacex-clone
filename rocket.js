const mongoose = require('mongoose');

const rocketSchema = new mongoose.Schema({
    name: String,
    type: String,
    active: Boolean,
    stages: Number,
    boosters: Number,
    cost_per_launch: Number,
    success_rate_pct: Number,
    first_flight: String,
    country: String,
    company: String,
    engines: Number,
    fuel_amount_tons: Number,
    burn_time_sec: Number,

});

rocketSchema.methods.intro = function() {
    console.log(`The rocket name is ${this.name}`)
}

const Rocket = mongoose.model('Rocket', rocketSchema);

module.exports = Rocket;