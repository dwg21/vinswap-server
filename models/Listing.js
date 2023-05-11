const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide product title'],
      maxlength: [100, 'Name can not be more than 200 characters'],
    },
    Category: {
      type: String,
      required: [true, 'Please provide category of product'],
      maxlength: [100, 'Category can not be more than 100 characters'],
    },

    Subcategory: {
      type: String,
      required: [true, 'Please provide Subcategory of product'],
      maxlength: [100, 'Subcategory can not be more than 100 characters'],
    },

    Brand: {
      type: String,
      required: [true, 'Please provide brand of product'],
      maxlength: [100, 'brand can not be more than 100 characters'],
    },
    

    size: {
      type: String,
      required: [true, 'Please provide product size'],
      maxlength: [50, 'Size can not be more than 50 characters'],
    },
    Condition: {
      type: String,
      required: [true, 'Please provide condition of product'],
      maxlength: [100, 'Condition can not be more than 100 characters'],
    },
    Style: {
      type: String,
      required: [true, 'Please provide style of product'],
      maxlength: [50, 'style can not be more than 100 characters'],
    },
    Color: {
      type: String,
      required: [true, 'Please provide product color'],
      maxlength: [20, 'Color can not be more than 20 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [2000, 'Description can not be more than 2000 characters'],
    },
    swapDetails: {
      type: String,
      required: [true, 'Please provide swap details '],
      maxlength: [2000, 'Can not be more than 2000 characters'],
    },
    image1: {
      type: String,
      requried: [true, `You need to upload at least 1 image`]
    },
    image2: {
      type: String,
      requried: [true, `You need to upload at least 1 image`]
    },
    image3: {
      type: String,
      requried: [true, `You need to upload at least 1 image`]
    },
    image4: {
      type: String,
      requried: [true, `You need to upload at least 1 image`]
    },

    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// ProductSchema.virtual('reviews', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'product',
//   justOne: false,
// });

// ProductSchema.pre('remove', async function (next) {
//   await this.model('Review').deleteMany({ product: this._id });
// });

module.exports = mongoose.model('Listing', ListingSchema);
