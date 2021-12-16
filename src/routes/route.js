const express = require('express');
const router = express.Router();

const urlController= require("../controllers/urlControllers.js")



router.post("/url/shorten", urlController.creatShortedUrl)
router.get("/:urlCode",urlController.geturl)


module.exports = router;