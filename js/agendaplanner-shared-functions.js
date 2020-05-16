/* #########################################################################
   ##					 Online Spectrum Planner V1.0					  ##
   ##			  Code & Design by Dynata (http://dynata.nl/)			  ##
   ##			Reuse of code is not permitted, unless you have 		  ##
   ##					Written permission from Dynata					  ##
   ##							info@dynata.nl							  ##
   ##							© Dynata 2015							  ##
   ######################################################################### */


$urlroot = window.location.protocol + "//" + window.location.host;

// Check Session Validity
function check_session_valid()
{
	console.log("$urlroot: "+$urlroot);
	$.ajax({
		type: 'POST',
		url: $urlroot + '/session-check.php',
		data: "jaar="+ agendayear +"&week="+ agendaweek,
		cache: false,
		async: false,
		error: function() {
			alert("Je bent om veiligheidsredenen uitgelogd omdat je te lang inactief was! Klik op OK om opnieuw in te loggen!");
            location.reload();
		},
		success: function(result) {
			if(result == "invalid") {
				alert("Je bent om veiligheidsredenen uitgelogd omdat je te lang inactief was! Klik op OK om opnieuw in te loggen!");
				location.reload();
			}
		}		
	});
}
var session_still_valid = setInterval(check_session_valid, 3600000);

// Add Week Functionality to Date();
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
   date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

Date.prototype.getWeekYear = function() {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}

// Functions to calculate things about dates
function maxweeks(year) {
	var testweekdatemaxyears = new Date(year, 11, 28);
	var maxweeksvar = testweekdatemaxyears.getWeek();
	return maxweeksvar;
}

function getDateOfMonday(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4) {
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
	} else {
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
	}
	return ISOweekStart;
}

function calculateDate(monday, nday, year) {
	var day = monday.getTime() + 1000 * 60 * 60 * 24 * nday;
	day = new Date(day);
	year = day.getFullYear();
	var month = day.getMonth() + 1;
	day = day.getDate();
	if (month < 10) { month = "0" + month; }
	if (day < 10) { day = "0" + day; }
	var returnstring = day + " - " + month + " - " + year;
	return returnstring;
}

function dayname(nday) {
	switch(nday) {
		case 0:
			var dayname = "Maandag";
			break;
		case 1:
			var dayname = "Dinsdag";
			break;
		case 2:
			var dayname = "Woensdag";
			break;
		case 3:
			var dayname = "Donderdag";
			break;
		case 4:
			var dayname = "Vrijdag";
			break;
		case 5:
			var dayname = "Zaterdag";
			break;
		case 6:
			var dayname = "Zondag";
			break;
	}
	return dayname;
}

// Load planner-home tables on document ready
var thisweeknumber = (new Date()).getWeek();
var thisyearnumber = (new Date()).getWeekYear();

var agendaweek = thisweeknumber;
var agendayear = thisyearnumber;
var agendamondaydatestring = getDateOfMonday(agendaweek, agendayear);
var plannerweek = thisweeknumber;
var planneryear = thisyearnumber;
var plannermondaydatestring = getDateOfMonday(plannerweek, planneryear);

$(document).ready(function() {
	console.log("Agenda & Planner & JQuery successfully loaded!")
	loadagenda();
	loadplanner();
	
	// Disable Form Submit on Enter //
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
});

/* Week Shifters Agenda */
function agendanextweek() {
	var maxweeksagenda = maxweeks(agendayear);
	var nextagendaweek = agendaweek + 1;
	var nextagendayear = agendayear;
	if (nextagendaweek > maxweeksagenda) {
		nextagendaweek = 1;
		nextagendayear = agendayear + 1;
	}
	agendaweek = nextagendaweek;
	agendayear = nextagendayear;
	agendamondaydatestring = getDateOfMonday(agendaweek, agendayear);
	loadagenda();
	$("#agendatable").scrollLeft(0);
}

function agendathisweek() {
	agendaweek = thisweeknumber;
	agendayear = thisyearnumber;
	agendamondaydatestring = getDateOfMonday(agendaweek, agendayear);
	loadagenda();
	$("#agendatable").scrollLeft(0);
}

function agendapreviousweek() {
	var previousagendaweek = agendaweek - 1;
	var previousagendayear = agendayear;
	if (previousagendaweek < 1) {
		previousagendayear = agendayear - 1;
		previousagendaweek = maxweeks(previousagendayear);
	}
	agendaweek = previousagendaweek;
	agendayear = previousagendayear;
	agendamondaydatestring = getDateOfMonday(agendaweek, agendayear);
	loadagenda();
	$("#agendatable").scrollLeft(0);
}

/* Week Shifters Planner */
function plannernextweek() {
	var maxweeksplanner = maxweeks(planneryear);
	var nextplannerweek = plannerweek + 1;
	var nextplanneryear = planneryear;
	if (nextplannerweek > maxweeksplanner) {
		nextplannerweek = 1;
		nextplanneryear = planneryear + 1;
	}
	plannerweek = nextplannerweek;
	planneryear = nextplanneryear;
	plannermondaydatestring = getDateOfMonday(plannerweek, planneryear);
	loadplanner();
	$("#plannertable").scrollLeft(0);
}

function plannerthisweek() {
	plannerweek = thisweeknumber;
	planneryear = thisyearnumber;
	plannermondaydatestring = getDateOfMonday(plannerweek, planneryear);
	loadplanner();
	$("#plannertable").scrollLeft(0);
}

function plannerpreviousweek() {
	var previousplannerweek = plannerweek - 1;
	var previousplanneryear = planneryear;
	if (previousplannerweek < 1) {
		previousplanneryear = planneryear - 1;
		previousplannerweek = maxweeks(previousplanneryear);
	}
	plannerweek = previousplannerweek;
	planneryear = previousplanneryear;
	plannermondaydatestring = getDateOfMonday(plannerweek, planneryear);
	loadplanner();
	$("#plannertable").scrollLeft(0);
}


