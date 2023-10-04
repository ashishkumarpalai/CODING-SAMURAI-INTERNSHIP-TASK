// models/article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {type: String,required: true},
    content: {type: String,required: true},
    author: {type: String,required: true},
    image: {type: String,required: true},
    publicationDate: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },
});

const ArticleModel = mongoose.model('article', articleSchema)

module.exports = { ArticleModel }


