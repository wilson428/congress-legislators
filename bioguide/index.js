const fs = require('fs');
const async = require('async');
const yaml = require('js-yaml');
const d3 = require('d3');
const downcache = require('downcache');
const cheerio = require('cheerio');

//var parseTime = d3.timeParse("%B %d, %Y")

const BIOGUIDE = "http://bioguide.congress.gov/scripts/biodisplay.pl?index=";


var members = yaml.safeLoad(fs.readFileSync('./legislators-historical.yaml', 'utf8'));

var CUTOFF = 1900;



var members_recent = members.filter(d => {
	var start = +d.terms[0].start.split("-")[0];
	return start >= CUTOFF; 
});


var bios = [];

function getBio(member, callback) {
	console.log("Getting", member.name.first, member.name.last);
	downcache(BIOGUIDE + member.id.bioguide, (err, resp, body) => {
		var $ = cheerio.load(body);
		var text = $("p").text().replace(/\s+/g, " ");
		fs.writeFileSync("./bios/" + member.id.bioguide + ".txt", text);
		member.bio.text = text;
		bios.push(member);
		callback();
	});
}

var test = members_recent.slice(0, 10);

async.eachLimit(members_recent, 5, function(member, callback) {
	getBio(member, callback);
}, function() {
	fs.writeFileSync("./member_bios.json", JSON.stringify(bios, null, 2))
});




