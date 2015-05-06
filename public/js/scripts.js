function getMemcachedResponse(command) {
	//console.log("call method getMemcachedResponse");
	$("#memcachedresponse").load("/memcached?a=" + command);
}

function updataneo4jgraph() {
    if (document.URL.indexOf("localhost") > -1) {
        $("#neo4jupdatagraph").load("/updategraphneo4j");
    } else {
        alert("Oops, this function is only available to the administrator.");
    }
}
