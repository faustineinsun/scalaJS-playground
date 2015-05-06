var express = require('express')
var cool = require('cool-ascii-faces');
var fs = require("fs");
var neo4jRESTapi = require('../libs/neo4j/neo4jRESTapi');
var neo4jQueryResults2D3JSON = require('../libs/neo4j/neo4jQueryResults2D3JSON');

// ClearDB MySQL
var mysql = require('mysql');
var mysqlconnection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

// Memcached Cloud
var memjs = require('memjs');
var memjsclient = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
    username: process.env.MEMCACHEDCLOUD_USERNAME,
    password: process.env.MEMCACHEDCLOUD_PASSWORD
});

// Neo4j graphenedb
var neo4j = require('node-neo4j');
var neo4jdb = new neo4j(process.env.GRAPHENEDB_URL);
var neo4jres;
var nodes=[], links=[];
var neo4jgraph;

// find static files in ./public
var app = express();
app.set('views', __dirname + '/../views');
app.use(express.static(__dirname + '/../public'));
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html');
});

///////////////////
// ClearDB MySQL//
app.get('/mysql', function(request, response) {
    // mysql connection
    // http://stackoverflow.com/questions/5818312/mysql-with-node-js
    // https://www.npmjs.com/package/mysql
    mysqlconnection.connect(function(err) {
        if (err) {
            console.error('ClearDB MySQL: error connecting: ' + err.stack);
            return;
        }

        console.log('ClearDB MySQL: connected as id ' + mysqlconnection.threadId);
    });

    // for cool-ascii-faces, print two ascii faces
    var faces = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
    faces += cool();

    // mysql query 
    mysqlconnection.query('SELECT * from book',function(err,rows,fields) {
        if (err) {
            console.error('ClearDB MySQL: error querying: ' + err.stack);
            return;
        }
        console.log('ClearDB MySQL: query result: ' + ['mysql book', rows]);
        response.send(['mysql book > '+ faces, rows]);
    });

    // teminate the connection to ClearDB MySQL
    mysqlconnection.end();
});

////////////////////
// memcachedcloud//
// https://github.com/RedisLabs/memcachedcloud-node-sample
app.get('/memcached', function(req, res) {
    switch (req.query.a) {
        case "set":
            memjsclient.set("memcached_set", "Saved memcached_set into memcached cloud", function(err, success) {
                res.send(success);
                console.log("MemcachedCloud: set key memcached_set"); 
            });
            break;
        case "get":
            memjsclient.get("memcached_set", function (err, value, key) {
                if (value != null) {
                    res.send(value);
                    console.log("MemcachedCloud: get key and it's value is "+value); 
                } else {
                    res.send("No value cached of the key: "+key);
                    console.log("MemcachedCloud: No value cached of the key: "+key); 
                }
            });
            break;
        case "stats":
            memjsclient.stats(function (err, server, stats) {
                if (stats != null) {
                    var stats_res = "";
                    for (var key in stats) {
                        stats_res += key + ": " + stats[key] + "<br/>";
                    }
                    res.send(stats_res);
                    console.log("MemcachedCloud: status: "+stats_res); 
                } else {
                    res.send("stats error!");
                    console.log("MemcachedCloud: stats error!");
                }
            });
            break;
        case "delete":
            memjsclient.delete("memcached_set", function (err, success) {
                res.send(success); 
                console.log("MemcachedCloud: delete the key memcached_set");
            });
            break;
        default:
            res.send("");
    }
});

/////////////////////
// Neo4jGraphenedb//
// https://github.com/philippkueng/node-neo4j
// http://neo4j.com/developer/guide-data-visualization/
// http://neo4j.com/docs/2.1/cypher-refcard/   cypher cheatsheet
// http://neo4j.com/docs/stable/cypher-query-lang.html
// To do: id - name mapping 
app.get('/nodeneo4j', function(request, response) {

    // GET Neo4j Cypher query from front-end 
    var querystr=request.query.q;
    console.log("Neo4jGraphenedb querystr: " + querystr);
    neo4jdb.cypherQuery(querystr, function(err, result){
        if(err) throw err; // modify this later: if the query string is wrong, we do not terminate this program, instead a notification will be shown to the user
        console.log("Neo4jGraphenedb data: " + JSON.stringify(result.data)); // delivers an array of query results
        console.log("Neo4jGraphenedb names of objects: " + JSON.stringify(result.columns)); // delivers an array of names of objects getting returned
    });

    /*
     * the following 3 neo2jdb manipulations doesn't run in order  
     * therefore they should be put into 3 different app.get(...) APIs
    neo4jdb.cypherQuery("MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r;", function(err, result){
        if(err) throw err;
        console.log("\nNeo4jGraphenedb remove all nodes and neo4jRESTapirelationships");
        console.log(result.data); // delivers an array of query results
        console.log(result.columns); // delivers an array of names of objects getting returned
    });

    neo4jdb.insertNode({
        name: 'Darth Vader',
        sex: 'male'
    },function(err, node){
        if(err) throw err;
        console.log("\nNeo4jGraphenedb insertNode: node properties: " + node.name + " " + node.sex);
        console.log("Neo4jGraphenedb insertNode: node id: " + node._id);
    });

    neo4jdb.cypherQuery("MATCH (n) RETURN n;", function(err, result){
        if(err) throw err;

        console.log(result.data); // delivers an array of query results
        console.log(result.columns); // delivers an array of names of objects getting returned
    });
    */
});

app.get('/updategraphneo4j', function(req, res) {
    //neo4jRESTapi.setNeo4jAuthToken();
    //neo4jRESTapi.getGraphAllNodesEdges();
    neo4jQueryResults2D3JSON.toGraphJSON();
});

////////////////////
app.set('port', (process.env.PORT || 5000))
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})

