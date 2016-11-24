function getStory(id, callback) {
	var XMLHttp = new XMLHttpRequest();
	XMLHttp.open("GET", "http://cdn.newsapi.com.au/content/v2/" + id + "?api_key=gqz7h5zs6b9f5bxrwhpgfhhb");
	XMLHttp.onreadystatechange = handlerFunction;
	XMLHttp.send(null);

	function handlerFunction() {
	    if (XMLHttp.readyState == 4) {
	        var jsonResponse = JSON.parse(XMLHttp.responseText);
	        callback(jsonResponse);
	    }
	}
}