const validUrl=require('valid-url')
const shortid= require('shortid')

const urlModal=require("../modal/urlModel")

const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
  19572,
  "redis-19572.c84.us-east-1-2.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("qPG3bfLuvWpUUEF5ITzcFy87MZfguR7E", function (err) {
  if (err) throw err;
});
redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});
const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

const isValid = function (value) {
  if (typeof value === 'undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;
}

const isValidRequestBody = function (college) {
  return Object.keys(college).length > 0
}

const baseUrl="http://localhost:3000";
const creatShortedUrl=async function (req, res){
  try {

    if (!isValidRequestBody(req.body)) {
        res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide URL details' })
        return
    }
    if (!isValid(req.body.longUrl)) {
        return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide URL' })
    }

    const longUrl = req.body.longUrl.trim()
    
    if(!(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(longUrl))){
      res.status(400).send({staus:false,message:"longUrl is not valid"})
    
    //generating random string
    let urlCode = shortid.generate().match(/[a-z\A-Z]/g).join("")     //this will give only Alphabet
    urlCode=urlCode.toLowerCase()

    let url = await urlModal.find({ longUrl })
    if (url>0) {
       return res.status(200).send({ status: true, data: url }) //if already exist
    }
    //if new longUrl is there
    const shortUrl = baseUrl + '/' + urlCode
    const urlData = { urlCode, longUrl, shortUrl }
    const newurl = await urlModal.create(urlData);
    await SET_ASYNC(shortCode.toLowerCase(), longUrl);
    return res.status(201).send({ status: true, msg: `URL created successfully`, data: newurl });
  }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}

const geturl = async function (req, res) {
  try {
    const urlCode = req.params.urlCode.trim().toLowerCase()
    
   if (!isValid(urlCode)) {
        res.status(400).send({ status: false, message: 'Please provide valid urlCode' })
    }

    let checkforUrl= await GET_ASYNC(`${urlCode}`)
    if(checkforUrl){
        return res.redirect(302, JSON.parse(checkforUrl).longUrl)
    }

    const url = await urlModal.findOne({ urlCode: urlCode })

    await SET_ASYNC(`${urlCode}`, JSON.stringify(url))

    if (url) {
        return res.redirect(302, url.longUrl)
    }
    return res.status(404).send({ status: false, message: 'No URL Found' })

  } catch (err) {
      console.error(err)
      res.status(500).send({status:false,message:err.message})
  }
}

module.exports.creatShortedUrl=creatShortedUrl;
module.exports.geturl = geturl