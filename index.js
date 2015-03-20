var express = require('express')
var app = express();
var cool = require('cool-ascii-faces');

var mysql      = require('mysql');
var mysqlconnection = mysql.createConnection({
      host     : process.env.MYSQL_HOST,
      user     : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
      database : process.env.MYSQL_DATABASE
});

// mysql connection
// http://stackoverflow.com/questions/5818312/mysql-with-node-js
// https://www.npmjs.com/package/mysql
mysqlconnection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + mysqlconnection.threadId);
});

app.set('port', (process.env.PORT || 5000))

app.get('/', function(request, response) {
    // for cool-ascii-faces, print two ascii faces
    var faces = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
        faces += cool();

    // mysql query 
    mysqlconnection.query('SELECT * from book',function(err,rows,fields) {
          if (err) {
              console.error('error querying: ' + err.stack);
              return;
          }
          console.log('query result: ' + ['mysql book', rows]);
          response.send(['mysql book > '+ faces, rows]);
    });
    mysqlconnection.end();
});

app.listen(app.get('port'), function() {
      console.log("Node app is running at localhost:" + app.get('port'))
})

