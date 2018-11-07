var express = require('express');
var db = require('../db');
var router = express.Router();

// member/:phone
router.get(':phone', function(req, res, next) {
    var phone = req.params.phone;
    
    var sql = "SELECT * FROM bestfood_member WHERE PHONE = ? LIMIT 1;";
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

// member/info
router.post('/phone', function(req, res) {
    var phone = req.body.phone;
    var name = req.body.name;
    var sextype = req.body.sextype;
    var birthday = req.body.birthday;
    
    console.log({name, sextype, birthday, phone});
    
    var sql_count = "SELECT COUNT(*) AS CNT FROM bestfood_member WHERE PHONE = ?;";
    
    var sql_insert = "INSERT INTO bestfood_member (phone, name, sextype, birthday) VALUES(?, ?, ?, ?);";
    
    var sql_update = "UPDATE bestfood_member SET name = ?, sextype = ?, birthday = ? WHERE phone = ?;";
    
    var sql_select = "SELECT seq FROM bestfood_member WHERE phone = ?;";
    
    db.get().query(sql_count, phone, function (err, rows) {
        if (rows[0].cnt > 0) {
            console.log("sql_update : " + sql_update);
            
            db.get().query(sql_update, [name, sextype, birthday, phone], function (err, result) {
                if (err) {
                    return res.sendStatus(400);
                }
                console.log(result);
                
                db.get().query(sql_select, phone, function (err, rows) {
                    if (err) {
                        return res.sendStatus(400);
                        
                        res.status(200).send('' + rows[0].seq);
                    };
                });
            });
        } else {
            console.log("sql_insert : " + sql_insert);
            
            db.get().query(sql_insert, [phone, name, sextype, birthday], function (err, result) {
                if (err) {
                    return res.sendStatus(400);
                }
                
                res.sendStatus(200).send('' + result.insertId);
            });
        }
    });
});

module.exports = router;
