var express = require('express');
var router = express.Router();
var Response = require("../../core/lib/Response");
var Utility = require("../../core/lib/Utility");
var PropertyInfoFinder = require("../components/PropertyInfoFinder");

router.post('/basic', async function(req, res, next) {
    let namespace = req.body.namespace;
    let classname = req.body.class_name;
    let type = req.body.type;
    let classObj = Utility.createClassObject(namespace, classname, type);
    let data = await PropertyInfoFinder.getPropertyInfo(classObj);
    Response.success(res, data);
});

router.post('/detail', async function(req, res, next) {
    let namespace = req.body.namespace;
    let classname = req.body.class_name;
    let type = req.body.type;
    let property_name = req.body.property_name;
    let property_type = req.body.property_type;
    let classObj = Utility.createClassObject(namespace, classname, type);
    let data = await PropertyInfoFinder.getPropertyDetail(classObj, property_name, property_type);
    Response.success(res, data);
});

module.exports = router;