var express = require('express');
var router = express.Router();
var Response = require("../../core/lib/Response");
var Utility = require("../../core/lib/Utility");
var ClassInfoFinder = require("../components/ClassInfoFinder");

router.get('/all-class', async function(req, res, next) {
    let data = await ClassInfoFinder.getAllClassInfomation();
    Response.success(res, data);
});

router.post('/basic', async function(req, res, next) {
    let namespace = req.body.namespace;
    let classname = req.body.class_name;
    let type = req.body.type;
    let classObj = Utility.createClassObject(namespace, classname, type);
    let data = await ClassInfoFinder.getClassInfo(classObj);
    Response.success(res, data);
});

module.exports = router;