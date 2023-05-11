const Cart = require('../models/Cart');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const addtoCart = async (req, res) => {
    const {listingId} = req.body;

    const cart = await Cart.findOne({user:req.user.userId});
    if (!cart) {
        Cart.create({
            items: [listingId],
            userId: req.user.userId
        })
    }
    cart.items = [...cart.items, listingId];
    await cart.save()
    res.status(StatusCodes.OK).json({cart})

}

const getSingleCart = async (req, res) => {
    const cart = await Cart.findOne({user:req.user.userId});
    if (!cart) {
        throw new CustomError.NotFoundError('No cart found for this user')
    }
    res.status(StatusCodes.OK).json({cart})
}





const removefromCart = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    const cart = await Cart.findOne({user:req.user.userId});
    if (!cart) {
        res.status(StatusCodes.BAD_REQUEST).json({msg: 'No cart found'})
    }
    console.log(cart.items)

    cart.items = cart.items.filter(item => item !== id);

    await cart.save()

    res.status(StatusCodes.OK).json({cart})
    

}

module.exports = {
    addtoCart,
    getSingleCart,
    removefromCart
}