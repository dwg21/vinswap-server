const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/authentication');

const {
    createOffer,
    getUserOffers,
    getSellerOffers,
    getAllOffers,
    changeStatus,
    getSingleOffer,
    chatSubmission,
    getListingOffers
} = require('../controllers/OfferController');

router.route
    ('/')
    .get(authenticateUser, getAllOffers)
    .post(authenticateUser ,createOffer)

    router.route
    ('/userOffers')
    .get(authenticateUser, getUserOffers)

    router.route
    ('/userOffer')
    .post(getSingleOffer)

    router.route('/listingOffer')
    .post(authenticateUser,getListingOffers )

    router.route
    ('/sellerOffers')
    .get(authenticateUser, getSellerOffers)

    router.route('/changeStatus')
    .post(authenticateUser, changeStatus)

    router.route('/addMessage')
    .post(authenticateUser, chatSubmission)


// router.route('/:id')
//     .delete(authenticateUser, removefromCart)

module.exports = router;
