var express = require('express');
var router = express.Router();
var ClassInfo = require("../api/apis/ClassInfo");
var RelationInfo = require("../api/apis/RelationInfo");
var PropertyInfo = require("../api/apis/PropertyInfo");
var ConstructInfo = require("../api/apis/ConstructInfo");
var MethodInfo = require("../api/apis/MethodInfo");
var Response = require("../core/lib/Response");

router.use('/class-info', ClassInfo); // Class Infomation
router.use('/relation-info', RelationInfo); // RelationInfo Infomation
router.use('/property-info', PropertyInfo); // PropertyInfo Infomation
router.use('/construct-info', ConstructInfo); // ConstructInfo Infomation
router.use('/method-info', MethodInfo); // MethodInfo Infomation

router.use(function(req, res, next){ // 404
  Response.notFound(res);
});

router.use(function(err, req, res, next) { // 500
  Response.notFound(res);
});

module.exports = router;
