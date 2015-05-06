var fs = require("fs");
var path = require("path");
var res;
var nodes=[], links=[];
var graph;

module.exports = {
    toGraphJSON: function () {
        readfile();
    }
};

/* reference from http://neo4j.com/developer/guide-data-visualization/
    get jsonfiles/allNodesEdges_raw.json by entering the following command
    :POST /db/data/transaction/commit {"statements":[{"statement":"MATCH path = (n)-[r]->(m) RETURN path","resultDataContents":["graph"]}]}
    on remote(Heroku) neo4j console
*/

function readfile() {
    fs.readFile(__dirname + '/jsonfiles/allNodesEdges_raw.json', "utf8", function(error, data) {
        if (error) throw error;
        res = JSON.parse(data);
        res.results[0].data.forEach(function (row) {
            row.graph.nodes.forEach(function (n) {
                if (idIndex(nodes,n.id) == null)
                nodes.push({id:n.id,label:n.labels[0],title:n.properties.name});
            });
            links = links.concat( row.graph.relationships.map(function(r) {
                return {start:idIndex(nodes,r.startNode),end:idIndex(nodes,r.endNode),type:r.type};
            }));
        });
        graph = {nodes:nodes, links:links};
        //console.log(graph);

        var newFile = path.resolve(__dirname, '../../public/assets/neo4jgraph.json'); 
        fs.writeFile ( newFile , JSON.stringify(graph), function(err) {
            if (err) throw err;
            console.log('new Neo4j Graph Json file was saved in '+ newFile);
        });
    });
}

function idIndex(a,id) {
    for (var i=0;i<a.length;i++) {
        if (a[i].id == id) return i;}
    return null;
}


