const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/authentication');

const {
    addtoCart,
    getSingleCart,
    removefromCart
} = require('../controllers/CartController');

router.route
    ('/')
    .get(authenticateUser,  getSingleCart)
    .post(authenticateUser ,addtoCart)
    
router.route('/:id')
    .delete(authenticateUser, removefromCart)

module.exports = router;
