var http = require("http");
var https = require("https");
var URL = require("url");

function postShortly(url, text) {
  setTimeout(() => {
    var options = URL.parse(url);
    options.method = "POST";
    options.headers = { "Content-Type": "application/json; charset=utf-8" };
    var o_req = https.request(options, res => {});
    o_req.write(JSON.stringify({
	    "response_type": "in_channel",
	    "text": text
    }));
    o_req.end();
  }, 5000);
}

http.createServer((req,res) => {
  var data = [];
  req.on("data", d => data.push(d));
  req.on("end", () => {
    var params = {};
    data.join("")
      .split("&").map(k => k.split("="))
      .map(k => params[decodeURIComponent(k[0])] = decodeURIComponent(k[1].replace(/\+/g, " ")));
    postShortly(params.response_url, params.text);
    res.end("Ok, will post shortly");
  });
}).listen(12345);


