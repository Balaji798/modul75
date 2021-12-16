const mongoose = require('mongoose');


const UrlSchema = new mongoose.Schema({
urlCode: { type: String, required: true, unique: true, lowercase:true },
longUrl: { type: String, required: true, trim: true},  //check in db if longurl exists or not
shortUrl: { type: String, required: true,unique:true},
}, { timestamps: true })
module.exports = mongoose.model('urls', UrlSchema)