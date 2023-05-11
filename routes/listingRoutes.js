const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createListing,
  getAllListings,
  getSingleListing,
  updateListing,
  deleteListing,
  uploadImage,
  getUserListings,
} = require('../controllers/listingController');


router
  .route('/')
  .post(authenticateUser, createListing)
  .get(getAllListings);

router
  .route('/userListings')
  .get(authenticateUser, getUserListings)

router
  .route('/uploadImage')
  .post([authenticateUser, authorizePermissions('user')], uploadImage);

router
  .route('/:id')
  .get(getSingleListing)
  .patch(authenticateUser, updateListing)
  .delete(authenticateUser, deleteListing);


module.exports = router;
