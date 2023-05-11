const Offer = require('../models/Offer');
const Listing = require('../models/Listing')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const createOffer = async (req, res) => {
    const {offerListingId, sellerListingId,  chat} = req.body;

    const existingOffer = await Offer.findOne({offerListingId: offerListingId,sellerListingId: sellerListingId });
    if (existingOffer) {
        res.status(StatusCodes.OK).json({existingOffer})
    }

    const newOffer = await Offer.create({
        offerListingId,
        sellerListingId,
        userId: req.user.userId,
        chat
    })

    console.log(newOffer)
    res.status(StatusCodes.OK).json({newOffer})


}

const getAllOffers = async (req, res) => {
    const offers = await Offer.find({})
        if (!offers) {
            throw new CustomError.NotFoundError('No offers found')
        }
        res.status(StatusCodes.OK).json({offers})

}


const getSellerOffers = async (req, res) => {
    const offers = await Offer.find({})
    const listings = await Listing.find({sellerId:req.user.userId})
        if (!offers) {
            throw new CustomError.NotFoundError('No active recived offers')
        }

        let userListingsId = []
        for (let i = 0 ; i< listings.length ; i ++) {
            userListingsId.push(listings[i]._id)
        }

        const sellerOffers = offers.filter((offer) => userListingsId.toString().includes(offer.sellerListingId))

        res.status(StatusCodes.OK).json({sellerOffers})

}

const getUserOffers = async (req, res) => {
    const offers = await Offer.find({userId: req.user.userId})
        if (!offers) {
            throw new CustomError.NotFoundError('No active recived offers')
        }
        res.status(StatusCodes.OK).json({offers})

}


const getSingleOffer = async (req, res) =>{ 
    const {offerId} = req.body;
    const offer = await Offer.findById(offerId);
    if (!offer) {
        throw new CustomError.NotFoundError('No offer found')

    }
    res.status(StatusCodes.OK).json({offer})

}


const getListingOffers = async (req, res) =>{ 
    const {listingId} = req.body;
    const offers = await Offer.find({sellerListingId: listingId});
    if (!offers) {
        throw new CustomError.NotFoundError('No offer found')

    }
    res.status(StatusCodes.OK).json({offers})

}


const changeStatus = async (req, res) => {
    const {offerId, updatedStatus} = req.body; 
    console.log(updatedStatus)
    const offer = await Offer.findOne({_id: offerId})
    if (!offer) {
        throw new CustomError.NotFoundError('No offer found')
    }
    offer.status = updatedStatus
    await offer.save()
    res.status(StatusCodes.OK).json({offer})

}

const chatSubmission = async (req, res) => {
    const {offerId, message} = req.body;
    const offer = await Offer.findOne({_id: offerId})
    console.log(offer.userId.toString())

    if (!offer) {
        throw new CustomError.NotFoundError('No offer found')
    }

    let sender ;

    console.log(req.user.userId)


    if (req.user.userId === offer.userId.toString() ) {
        sender = 'buyer'
    } else {
        sender = 'seller'
    }

    const NewMessage = {
        message: message,
        sender: sender
    }

    offer.chat = [...offer.chat, NewMessage];
    await offer.save()
    res.status(StatusCodes.OK).json({offer})

}

module.exports = {
    createOffer,
    getUserOffers,
    getSellerOffers,
    getAllOffers,
    changeStatus,
    getSingleOffer,
    chatSubmission,
    getListingOffers

}