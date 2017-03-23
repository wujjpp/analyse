require("./style.css");
require("jquery");
require("bootstrap/dist/css/bootstrap.css")
require("bootstrap/dist/js/bootstrap.min")

var app = require("./app");

var lastHash = "";
window.addEventListener("hashchange", function() {
	if(location.hash !== lastHash) {
		lastHash = location.hash;
		loadPageFromHash();
	}
}, false);
loadPageFromHash();

function loadPageFromHash() {
	loadPage.apply(null, location.hash.replace(/^#/, "").split("/"));
}


var lastPage;

function loadPage(name) {
	if(!name) name = "home";
	var pageBundle;
	var args = Array.prototype.slice.call(arguments, 1);
	if(!app.stats && name != "select") {
		args.unshift(name);
		name = "upload";
	}
	try {
		pageBundle = require("bundle!./pages/" + name + "/page.js");
	} catch(err) {
		pageBundle = function(cb) {
			cb(require("./pages/error/page.js"));
		};
		args.unshift(err, name);
	}
	pageBundle(function(page) {
		$(function() {
			if(lastPage) lastPage();
			lastPage = page.apply(null, args);
			window.scrollTo(0, 0);			
		});
	});
}
app.loadPage = loadPage;

require.include("sigma.js");
require.include("./percentageToColor");
require.include("./findById");
require.include("./graphs/modules");
