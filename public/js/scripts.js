function getMemcachedResponse(command) {
	//console.log("call method getMemcachedResponse");
	$("#memcachedresponse").load("/memcached?a=" + command);
}
