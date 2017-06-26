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
    coordinates: {
      longitude: { type: Number, required: "You must supply store longitude" },
      latitude: { type: Number, required: "You must supply store latitude!" }
    },
    address: {
      type: String,
      required: "You must supply an address!"
    }
  }
});

//TODO make more terse so slugs are unique
storeSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    next(); //skip generating new slug
    return; //stop function
  }
  this.slug = slug(this.name); //take name and run slug function
  next();
});

module.exports = mongoose.model("Store", storeSchema);
