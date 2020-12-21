var express = require('express');
var router = express.Router();
var Response = require("../../../core/lib/Response");
var DBConnection = require("../../../core/lib/DBConnection");

router.get('/basic', async function (req, res, next) {
    let sql = "SELECT 1 + 1 AS solution";
    let data = await DBConnection.query(sql);
    Response.success(res, data);
});

module.exports = router;