const mongoose = require("mongoose");
mongoose.Promise = global.Promise; //ES6 promise
const slug = require("slugs"); //Hi there! How are you! --> hi-there-how-are-you

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a store name!"
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [
      {
        type: Number,
        required: "You must supply longitude and latitude"
      }
    ],
    address: {
      type: String,
      required: "You must supply an address!"
    }
  },
  photo: String
});

storeSchema.pre("save", async function(next) {
  if (!this.isModified("name")) {
    next(); //skip generating new slug
    return; //stop function
  }

  this.slug = slug(this.name); //take name and run slug function

  //find if any other stores have the same slug and incriment number if there are any
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");
  try {
    const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
    console.log("after regex");
    if (storesWithSlug.length) {
      this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
    }
    next();
  } catch (err) {
    console.log(err);
    next({ message: err }, false);
  }

  next();
});

module.exports = mongoose.model("Store", storeSchema);
