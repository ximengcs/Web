var express = require('express');
var router = express.Router();
var Response = require("../../core/lib/Response");
var Utility = require("../../core/lib/Utility");
var MethodInfoFinder = require("../components/MethodInfoFinder");

router.post('/basic', async function(req, res, next) {
    let namespace = req.body.namespace;
    let classname = req.body.class_name;
    let type = req.body.type;
    let classObj = Utility.createClassObject(namespace, classname, type);
    let data = await MethodInfoFinder.getMethodInfo(classObj);
    Response.success(res, data);
});

router.post('/detail', async function(req, res, next) {
    let namespace = req.body.namespace;
    let classname = req.body.class_name;
    let type = req.body.type;
    let method_name = req.body.method_name;
    let param_amount = req.body.param_amount;
    let param = req.body.param;
    let paramArray = param.split("*");
    paramArray.pop();
    let classObj = Utility.createClassObject(namespace, classname, type);
    let data = await MethodInfoFinder.getMethodDetail(classObj, method_name, param_amount, paramArray);
    Response.success(res, data);
});

module.exports = router;