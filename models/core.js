const mongoose = require('mongoose');
const { stringify } = require('qs');

// Create a schema

const coreSchema = new mongoose.Schema({
    block: Number,
    reuse_count: Number,
    rtls_attempts: Number,
    rtls_landings: Number,
    asds_attempts: Number,
    asds_landings: Number,
    last_update: String,
    launches: [String],
    serial: String,
    status: String,
    id: String
});

coreSchema.methods.intro = function() {
    console.log(`The core has been used ${this.reuse_count} times`);
}

const Core = mongoose.model('core', coreSchema);

module.exports = Core;