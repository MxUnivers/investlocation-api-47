const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  title: {
    type: String,
    required: false
  },
  coverPicture: {
    type: String, // URL de l'image associée à la publication
    required: false
  },
  description: {
    type: String
  },
  content: {
    type: String,
    required: false
  },
  category: {
    type: Object
  },
  
  datePublished: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    coverPicture:{
      type:String
    },
    comment: {
      type: String,
      required: false
    },
    dateCommented: {
      type: Date,
      default: Date.now
    }
  }]
},{
  timestamps: true
});

module.exports = mongoose.model('Publication', PublicationSchema);
