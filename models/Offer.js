const mongoose = require('mongoose');


// offerDetails will look like :
// {
//     offerPic: xxx,
//     offerLinkL xxx,
//     itemPic: xxx,
//     itemLinkL xxx,

// }

const OfferSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'pending'
    },

    offerListingId: {
        type: mongoose.Types.ObjectId,
        ref: 'Listing',
        required: true,
    },


    sellerListingId: {
        type: mongoose.Types.ObjectId,
        ref: 'Listing',
        required: true,
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    chat: {
        type: [],
        default: []
    }
    
},
{timestamps: true})

module.exports = mongoose.model('Offer', OfferSchema);
