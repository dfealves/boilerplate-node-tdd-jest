const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,

    trim: true,
  },
  slug: {
    type: String,

    trim: true,
    index: true,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  active: {
    type: Boolean,

    default: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Product", schema);
