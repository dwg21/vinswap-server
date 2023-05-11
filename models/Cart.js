const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    items: {
        type: [],
        default: []
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
},
{timestamps: true})

module.exports = mongoose.model('Cart', CartSchema);
