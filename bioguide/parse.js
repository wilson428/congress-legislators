const fs = require('fs');
const d3 = require('d3');

var retirements = {};
var csv = [];

function parseBio(member) {
	var phrases = member.bio.text.split(";");
	phrases.forEach(d => {
		d = d.toLowerCase();
		if (d.indexOf("was not a candidate for reelection") != -1) {
			if (d.indexOf("but was") != -1 || d.indexOf("having become") != -1 || d.indexOf("but ran") != -1 || d.indexOf("unsuccessful candidate") != -1) {
				return;
			}

			console.log(member.name.first, member.name.last, member.id.bioguide, ":", d);

			var last_term = member.terms.slice(-1)[0];

			var date = last_term.end;

			retirements[date] = retirements[date] || { count: 0, members: {} };
			// retirements[date].count += 1;
			var obj = {
				id: member.id.bioguide,
				name: member.name.first + " " + member.name.last,
				party: last_term.party,
				chamber: last_term.type,
				state: last_term.state,
				district: last_term.district || "N/A",
				start: last_term.start,
				end: last_term.end
			};

			retirements[date].members[member.id.bioguide] = obj;
			csv.push(obj);
		}
	});
}


var members = require("./member_bios.json");

members.forEach(member => {
	parseBio(member);
});

Object.keys(retirements).forEach(d => {
	retirements[d].count = Object.keys(retirements[d].members).length
});


fs.writeFileSync("retirements.json", JSON.stringify(retirements, null, 2));
fs.writeFileSync("retirements.csv", d3.csvFormat(csv));