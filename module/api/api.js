<<<<<<< Updated upstream
var express = require('express');
var api = express();

api.use('/API',function(req,res,next){
=======
var express = require("express");
var router = express.Router();
router.use("/getuserDetails", function (req, res, next) {
>>>>>>> Stashed changes

});


<<<<<<< Updated upstream
module.exports = api;
=======





module.exports = router;
>>>>>>> Stashed changes
