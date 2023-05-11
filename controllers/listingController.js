const Listing = require('../models/Listing');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const fileupload = require('express-fileupload'); 
const cloudinary = require('../utils/cloudinary')




const createListing = async (req, res) => {
  const {
    Brand,
    Category,
    Subcategory,
    Style,
    title,
    size,
    Condition,
    Color,
    description,
    swapDetails
  } = req.body;

  let image1Url = "";
  let image2Url = "";
  let image3Url = "";
  let image4Url = "" ;

  // console.log(productImg1)

  console.log('body')
  console.log(req.body)

  console.log('files')
  console.log(req.files)
  // console.log(imageFile)

  if (req.files.productImg1) {
    if ( req.files.productImg1.mimetype.startsWith('image')) {
      const uploadResponse = await cloudinary.uploader.upload(req.files.productImg1.tempFilePath, {
        upload_preset: 'vinpop'
      })
      image1Url = uploadResponse.secure_url ;
    }
  }

  if (req.files.productImg2) {
    if (req.files.productImg2 && req.files.productImg2.mimetype.startsWith('image')) {
      const uploadResponse = await cloudinary.uploader.upload(req.files.productImg2.tempFilePath, {
        upload_preset: 'vinpop'
      })
      image2Url = uploadResponse.secure_url ;
    }
    
  }

  if (req.files.productImg3) {
    if (req.files.productImg3 && req.files.productImg3.mimetype.startsWith('image')) {
      const uploadResponse = await cloudinary.uploader.upload(req.files.productImg3.tempFilePath, {
        upload_preset: 'vinpop'
      })
      image3Url = uploadResponse.secure_url ;
    }
    
  }

  if (req.files.productImg4) {
    if (req.files.productImg1 && req.files.productImg4.mimetype.startsWith('image')) {
      const uploadResponse = await cloudinary.uploader.upload(req.files.productImg4.tempFilePath, {
        upload_preset: 'vinpop'
      })
      image4Url = uploadResponse.secure_url ;
    }
    
  }


  // res.send([image1Url, image2Url, image3Url, image4Url]);

  const NewListing = await Listing.create({
    Brand,
    Category,
    Subcategory,
    Style,
    title,
    size,
    Condition,
    Color,
    description,
    swapDetails,
    image1: image1Url,
    image2: image2Url,
    image3: image3Url,
    image4: image4Url,
    sellerId: req.user.userId
  })

  res.status(StatusCodes.CREATED).json({ NewListing });

};

// const editListing = async (req, res) => {
//   const { id: ListingId } = req.params;
//   const SingleListing = await Listing.findOne({ _id: ListingId });

//   if (!SingleListing) {
//     throw new CustomError.NotFoundError(`No Listing with id : ${ListingId}`);
//   }
//   SingleListing = req.body;
//   await Listing.Save;
//   res.status(StatusCodes.CREATED).json({ SingleListing });

// }


const getAllListings = async (req, res) => {
  const Listings = await Listing.find({});

  res.status(StatusCodes.OK).json({ Listings, count: Listings.length });
};


const getSingleListing = async (req, res) => {
  const { id: ListingId } = req.params;
  const SingleListing = await Listing.findOne({ _id: ListingId });

  if (!SingleListing) {
    throw new CustomError.NotFoundError(`No Listing with id : ${ListingId}`);
  }

  res.status(StatusCodes.OK).json({ SingleListing });
};


const getUserListings = async (req, res) => {

  const UserListings = await Listing.find({sellerId: req.user.userId })

  if (!UserListings) {
    throw new CustomError.NotFoundError(`No Listings for user with id : ${req.user.userId}`);

  }

  res.status(StatusCodes.OK).json({ UserListings });
};

const updateListing = async (req, res) => {
  const { id: ListingId } = req.params;
  const updatedList = await Listing.findOneAndUpdate({ _id: ListingId }, req.body, {
    new: true,
    runValidators: true,
  });

  // if (!Listing) {
  //   throw new CustomError.NotFoundError(`No Listing with id : ${ListingId}`);
  // }

  res.status(StatusCodes.OK).json(updatedList);
};


const deleteListing = async (req, res) => {
  const { id: ListingId } = req.params;

  const listing = await Listing.deleteOne({ _id: ListingId });

  if (!listing) {
    throw new CustomError.NotFoundError(`No Listing with id : ${ListingId}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Success! Listing removed.' });
};
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const ListingImage = req.files.image;

  if (!ListingImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;

  if (ListingImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${ListingImage.name}`
  );
  await ListingImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${ListingImage.name}` });
};

module.exports = {
  createListing,
  getAllListings,
  getUserListings,
  getSingleListing,
  updateListing,
  deleteListing,
  uploadImage
};
