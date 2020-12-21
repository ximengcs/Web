var express = require('express');
var router = express.Router();
var MainContentHelper = require("../component/MainContentHelper");
var DetailHelper = require("../component/DetailHelper");
const Utility = require('../component/Utility');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/content', async function(req, res, next) {
    let namespace = Utility.HTMLLableToChar(req.body.namespace);
    let class_name = Utility.HTMLLableToChar(req.body.class_name);
    let type = Utility.HTMLLableToChar(req.body.type);
    await MainContentHelper.createContentHTML(namespace, class_name, type);
    res.render('content');
});

router.post('/property-detail', async function(req, res, next) {
    let namespace = Utility.HTMLLableToChar(req.body.namespace);
    let class_name = Utility.HTMLLableToChar(req.body.class_name);
    let type = Utility.HTMLLableToChar(req.body.type);
    let property_name = Utility.HTMLLableToChar(req.body.property_name);
    let property_type = Utility.HTMLLableToChar(req.body.property_type);
    await DetailHelper.createPropertyHTML(namespace, class_name, type, property_name, property_type);
    res.render('property-detail');
});

router.post('/construct-detail', async function(req, res, next) {
    let namespace = Utility.HTMLLableToChar(req.body.namespace);
    let class_name = Utility.HTMLLableToChar(req.body.class_name);
    let type = Utility.HTMLLableToChar(req.body.type);
    let param_amount = Utility.HTMLLableToChar(req.body.param_amount);
    let param = Utility.HTMLLableToChar(req.body.param);
    await DetailHelper.createConstructHTML(namespace, class_name, type, param_amount, param);
    res.render('construct-detail');
});

router.post('/method-detail', async function(req, res, next) {
    let namespace = Utility.HTMLLableToChar(req.body.namespace);
    let class_name = Utility.HTMLLableToChar(req.body.class_name);
    let type = Utility.HTMLLableToChar(req.body.type);
    let method_name = Utility.HTMLLableToChar(req.body.method_name);
    let param_amount = Utility.HTMLLableToChar(req.body.param_amount);
    let param = Utility.HTMLLableToChar(req.body.param);
    await DetailHelper.createMethodHTML(namespace, class_name, type, method_name, param_amount, param);
    res.render('method-detail');
});

module.exports = router;