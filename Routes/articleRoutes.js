let mysql = require('mysql');
let express = require('express');
let router = express.Router();

let config = require('../config.js');
let pool = mysql.createPool(config);

//Sql Queries
let listSql = 'SELECT * FROM article';
let listSqlId = 'SELECT * FROM article WHERE articleId = ?';
let updateSqlId = 'UPDATE article SET Headline = ?, Description = ?, Author = ? WHERE articleId = ?';
let insertSqlId = 'INSERT INTO article (articleId, Headline, Description, Author) values (?,?,?,?)';
let deleteSqlId = 'DELETE FROM article WHERE articleId = ?';

//get all the list
router.get('/', (req, res) => {
    console.log('getAll');
    getArticle(req, res);
 });
 
 //get list by Id
 router.get('/:id', (req, res) => {
     console.log('get by Id' + req);
    getArticleById(req, res);
 });

  //update article
router.put('/update', (req, res) => {
    console.log("req -"+ req);
    updateArticleById(req, res);
 });

   //insert article
router.post('/insert', (req, res) => {
    console.log("req -"+ req);
    insertArticleById(req, res);
 });

//delete article by Id
router.delete('/delete/:id', (req, res) => {
    console.log('get by Id' + req);
   deleteArticleById(req, res);
});

// get all articles
function getArticle(req, res){
    pool.getConnection( (err, connection) => {
        if(err){
            res.json({ "code" : 100});
            return;
        }
        console.log("connection as id"+ connection.threadId);

        connection.query(listSql, (error, results, fields) => {
            connection.release();
            if (!error){
                res.json(results);
            }
        });

        connection.on('error', function(err) {      
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;    
      });
    });
}

//get by id
function getArticleById(req, res){
    pool.getConnection( (err, connection) => {
        if(err){
            res.json({ "code" : 100});
            return;
        }
        console.log("connection as id "+ connection.threadId);

        connection.query(listSqlId, [req.params.id], (error, results) => {
            connection.release();
            if (!error){
                res.send(results);
            }
        });

        connection.on('error', function(err) {      
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;    
      });
    });
 }

 //update by id
 function updateArticleById(req, res){
    pool.getConnection( (err, connection) => {
        if(err){
            res.json({ "code" : 100});
            return;
        }
        console.log("connection as id "+ connection.threadId);

        connection.query(updateSqlId, [req.body.headline, req.body.description, req.body.author, req.body.articleId], (error, results) => {
            connection.release();
            if (!error){
                res.send(results);
            }
        });

        connection.on('error', function(err) {      
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;    
      });
    });
 }
       
 //insert by id
 function insertArticleById(req, res){
        pool.getConnection( (err, connection) => {
            if(err){
                res.json({ "code" : 100});
                return;
            }
            console.log("connection as id "+ connection.threadId);

            connection.query(insertSqlId, [req.body.articleId, req.body.headline, req.body.description, req.body.author], (error, results) => {
                connection.release();
                if (!error){
                    res.send(results);
                }
            });

            connection.on('error', function(err) {      
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;    
            });
        });
    }

//delete article by id
function deleteArticleById(req, res){
    pool.getConnection( (err, connection) => {
        if(err){
            res.json({ "code" : 100});
            return;
        }
        console.log("connection as id "+ connection.threadId);

        connection.query(deleteSqlId, [req.params.id], (error, results) => {
            connection.release();
            if (!error){
                res.send(results);
            }
        });

        connection.on('error', function(err) {      
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;    
      });
    });
 }

module.exports = router;