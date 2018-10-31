var express = require('express');
var db = require('../db');
var router = express.Router();

// member/:phone
router.get(':phone', function(req, res, next) {
    var phone = req.params.phone;
    
    var sql = "SELECT * " + "FROM bestfood_member " + "WHERE PHONE = ? LIMIT 1;";
    console.log("sql : " + sql);
    
    db.get().query(sql, phone, function (err, rows) {
        console.log("rows : " + JSON.stringify(rows));
        console.log("row.length : " + rows.length);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.sendStatus(400);
        }
    });
});

module.exports = router;
