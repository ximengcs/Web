var express = require('express');
var router = express.Router();
var Response = require("../../core/lib/Response");
var Utility = require("../../core/lib/Utility");
var RelationInfoFinder = require("../components/RelationInfoFinder");

router.post('/simple', async function(req, res, next) {
    let namespace = req.body.namespace;
    let classname = req.body.class_name;
    let type = req.body.type;
    let classObj = Utility.createClassObject(namespace, classname, type);
    let data = await RelationInfoFinder.getRelationInfo(classObj);
    Response.success(res, data);
});

module.exports = router;