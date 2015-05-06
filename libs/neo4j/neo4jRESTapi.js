module.exports = {
	setNeo4jAuthToken: function () {
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var http = new XMLHttpRequest();
		var url = process.env.GRAPHENEDB_URL+"/user/neo4j/authorization_token";
		var data = {"password": "neo4j", "new_authorization_token" : "4287e44985b04c7536c523ca6ea8e67c"}; 
		console.log("setNeo4jAuthToken() res: " + url);
		var res;
		http.open("POST", url, true);
		http.onreadystatechange = function() { 
			res = http.responseText;
			console.log("setNeo4jAuthToken() res: "+ res);
		}
		var postData = JSON.stringify(data);
		http.setRequestHeader("Accept","application/json; charset=UTF-8");
		http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		http.send(postData);
	},
	
	getGraphAllNodesEdges: function() {
		// :POST /db/data/transaction/commit {"statements":[{"statement":"MATCH path = (n)-[r]->(m) RETURN path","resultDataContents":["graph"]}]}
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var http = new XMLHttpRequest();
		var url = process.env.GRAPHENEDB_URL+"/db/data/transaction/commit";
		var res;
		console.log("------"+url);
		var data = {
			"statements": [
			{
				"statement": "MATCH path = (n)-[r]->(m) RETURN path",
				"resultDataContents": ["graph"]
			}
			]
		};
		http.open("POST", url, true);
		http.onreadystatechange = function() { 
			res = http.responseText;
			console.log("res: "+ res);
		}
		var postData = JSON.stringify(data);
		http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		http.setRequestHeader("Accept","application/json; charset=UTF-8");
		http.send(postData);
	}
};

var foo = function () {
}