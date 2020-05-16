/* #########################################################################
   ##					 Online Spectrum Planner V1.0					  ##
   ##			  Code & Design by Dynata (http://dynata.nl/)			  ##
   ##			Reuse of code is not permitted, unless you have 		  ##
   ##					Written permission from Dynata					  ##
   ##							info@dynata.nl							  ##
   ##							© Dynata 2015							  ##
   ######################################################################### */
$urlroot = window.location.protocol + "//" + window.location.host;

/* Agenda Functions */
function loadagenda() {
	/* Set Week Number in Toolbar */
	$(".weergegevenweeknragenda").html('Week ' + agendaweek);
	
	/* Set Up Table Headers */
	$(".maandagagendalabel").html('Maandag ' + calculateDate(agendamondaydatestring, 0, agendayear));
	$(".dinsdagagendalabel").html('Dinsdag ' + calculateDate(agendamondaydatestring, 1, agendayear));
	$(".woensdagagendalabel").html('Woensdag ' + calculateDate(agendamondaydatestring, 2, agendayear));
	$(".donderdagagendalabel").html('Donderdag ' + calculateDate(agendamondaydatestring, 3, agendayear));
	$(".vrijdagagendalabel").html('Vrijdag ' + calculateDate(agendamondaydatestring, 4, agendayear));
	$(".zaterdagagendalabel").html('Zaterdag ' + calculateDate(agendamondaydatestring, 5, agendayear));
	$(".zondagagendalabel").html('Zondag ' + calculateDate(agendamondaydatestring, 6, agendayear));
	
	/* Clear All Cells */
	$(".afspraaktext").html('');
	$(".pijltje").html('');
	$(".afspraak").css('background-color', '#FFF');
	
	/* Retrieve Data from Database */
	var loadagendahuiswerkarray;
	$.ajax({
		type: 'POST',
		url: $urlroot+ '/retrieve-homework.php',
		data: {
			"jaar"			: agendayear,
			"week"			: agendaweek
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij het laden van je agenda, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			loadagendahuiswerkarray = result;
		}		
	});
	loadagendahuiswerkarray = JSON.parse(loadagendahuiswerkarray);
	
	/* Process Data from Database */
	jQuery.each(loadagendahuiswerkarray, function(index, item) {
		var temparray = item;
		var dag = parseInt(temparray[0]);
		var uur = parseInt(temparray[1]);
		var type = parseInt(temparray[3]);
		var vak = temparray[4].toUpperCase();
		var hw = temparray[5];
		var planned = parseInt(temparray[6]);
		
		var loadagendadisplaystring;
		
		var loadagendacellstring;
		switch(dag) {
			case 0:
				loadagendacellstring = 'maandag';
				break;
			case 1:
				loadagendacellstring = 'dinsdag';
				break;
			case 2:
				loadagendacellstring = 'woensdag';
				break;
			case 3:
				loadagendacellstring = 'donderdag';
				break;
			case 4:
				loadagendacellstring = 'vrijdag';
				break;
			case 5:
				loadagendacellstring = 'zaterdag';
				break;
			case 6:
				loadagendacellstring = 'zondag';
				break;
		}
		switch(uur) {
			case 1:
				loadagendacellstring = loadagendacellstring + 'een';
				break;
			case 2:
				loadagendacellstring = loadagendacellstring + 'twee';
				break;
			case 3:
				loadagendacellstring = loadagendacellstring + 'drie';
				break;
			case 4:
				loadagendacellstring = loadagendacellstring + 'vier';
				break;
			case 5:
				loadagendacellstring = loadagendacellstring + 'vijf';
				break;
			case 6:
				loadagendacellstring = loadagendacellstring + 'zes';
				break;
			case 7:
				loadagendacellstring = loadagendacellstring + 'zeven';
				break;
			case 8:
				loadagendacellstring = loadagendacellstring + 'acht';
				break;
			case 9:
				loadagendacellstring = loadagendacellstring + 'negen';
				break;
		}
		switch(type) {
			case 0:
				loadagendadisplaystring = vak + '  ' + hw;
				break;
			case 1:
				loadagendadisplaystring = vak + ' HW: ' + hw;
				break;
			case 2:
				loadagendadisplaystring = vak + ' SO: ' + hw;
				$(".agenda" + loadagendacellstring).closest('td').css('background-color', '#FFFF00');
				break;
			case 3:
				loadagendadisplaystring = vak + ' PW: ' + hw;
				$(".agenda" + loadagendacellstring).closest('td').css('background-color', '#FD5F00');
				break;
			case 4:
				loadagendadisplaystring = vak + ' REP: ' + hw;
				$(".agenda" + loadagendacellstring).closest('td').css('background-color', '#7CFC00');
				break;
			case 5:
				loadagendadisplaystring = vak + ' MO: ' + hw;
				$(".agenda" + loadagendacellstring).closest('td').css('background-color', '#F433FF');
				break;
			case 6:
				loadagendadisplaystring = vak + ' PO: ' + hw;
				$(".agenda" + loadagendacellstring).closest('td').css('background-color', '#993CF3');
				break;
			case 7:
				loadagendadisplaystring = vak + ' SE: ' + hw;
				$(".agenda" + loadagendacellstring).closest('td').css('background-color', '#37FDFC');
				break;
			case 8:
				loadagendadisplaystring = vak + ' INFO: ' + hw;
				break;
			case 9:
				loadagendadisplaystring = vak + ' CSE: ' + hw;
				$(".agenda" + loadagendacellstring).closest('td').css('background-color', '#FE0001');
				break;
			case 10:
				loadagendadisplaystring = vak + ' AFSPR: ' + hw;
				break;
			case 11:
				loadagendadisplaystring = vak + ' MAKEN: ' + hw;
				break;
			case 12:
				loadagendadisplaystring = vak + ' LEREN: ' + hw;
				break;
			case 13:
				loadagendadisplaystring = vak + ' LEZEN: ' + hw;
				break;
			default:
				loadagendadisplaystring = vak + ' ' + hw;
				break;
		}
		$(".agenda" + loadagendacellstring).html(loadagendadisplaystring);
		if(planned == 1) {
			$(".pijltje" + loadagendacellstring).html('&larr;');
		}
	});
}

function agendacreatechangeitemshowform(day, hour) {
	var day = parseInt(day);
	var hour = parseInt(hour);
	loadoverlay();
	$('#overlayagendaitemform').show();
	$('.overlayagendaitemformremove').hide();
	//alert(agendayear+" "+agendaweek+" "+day+" "+hour);
	
	/* Retrieve Information From Database */
	var agendaitemarray;
	$.ajax({
		type: 'POST',
		url: $urlroot + '/retrieve-homework-item.php',
		data: {
			"jaar"			: agendayear,
			"week"			: agendaweek,
			"dag"			: day,
			"uur"			: hour
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij het laden van dit agenda item, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			agendaitemarray = result;
		}		
	});
	agendaitemarray = JSON.parse(agendaitemarray);
	
	var $Jaar 	= parseInt(agendayear);
	var $Week 	= parseInt(agendaweek);
	var $Dag 	= parseInt(day);
	var $Uur 	= parseInt(hour);
	
	if(agendaitemarray != null) {
		if ( agendaitemarray[5].length ) var $Jaar = parseInt(agendaitemarray[5]);
		if ( agendaitemarray[6].length ) var $Week 	= parseInt(agendaitemarray[6]);
		if ( agendaitemarray[7].length ) var $Dag 	= parseInt(agendaitemarray[7]) - 1;
		if ( agendaitemarray[8].length ) var $Uur 	= parseInt(agendaitemarray[8]);
	}
	
	//alert($Jaar+" "+$Week+" "+$Dag+" "+$Uur);
	
	/* Process Database Information */
	if(agendaitemarray == null) {
		/* Set Title and Undertitle */
		$(".overlayagendaitemformtitle").text('Agenda Item Aanmaken');
		$(".overlayagendaitemformundertitle").text('Week ' + $Week + ', ' + dayname($Dag) + " " + calculateDate(agendamondaydatestring, $Dag, $Jaar).replace(/\s+/g, '') + ", Uur " + $Uur);
		/* (Re)Set Form Field Values */
		$('#overlayagendaitemformHID').val("new");
		
		$('#overlayagendaitemformyear').val($Jaar);
		$('#overlayagendaitemformweek').val($Week);
		$('#overlayagendaitemformday').val($Dag);		
		$('#overlayagendaitemformhour').val($Uur);
		
		$('#overlayagendaitemformvak').val('');
		$('#overlayagendaitemformtype').val('0');
		$('#overlayagendaitemformstof').val('');
		$('#overlayagendaitemformvak').focus();
	} else {
		$('.overlayagendaitemformremove').show();
		$(".overlayagendaitemformtitle").text('Agenda Item Aanpassen');
		$(".overlayagendaitemformundertitle").text('Week ' + $Week + ', ' + dayname($Dag) + " " + calculateDate(agendamondaydatestring, $Dag, $Jaar).replace(/\s+/g, '') + ", Uur " + $Uur);
		/* (Re)Set Form Field Values */
		$('#overlayagendaitemformHID').val(agendaitemarray[0]);
		
		$('#overlayagendaitemformyear').val($Jaar);
		$('#overlayagendaitemformweek').val($Week);
		$('#overlayagendaitemformday').val($Dag);
		$('#overlayagendaitemformhour').val($Uur);
		
		$('#overlayagendaitemformvak').val(agendaitemarray[2].toUpperCase());
		$('#overlayagendaitemformtype').val(agendaitemarray[1]);
		$('#overlayagendaitemformstof').val(agendaitemarray[3]);
		
		/* Planned Table */
		$('#overlayplannedtable').show();
		
		/* Clear table */
		$('#overlayplannedtableid tr.overlayplannedtabletrtoegevoegd').remove();
		
		/* Add Leermoment Button */
		$('.overlayplannedtableaddstudymoment').html('<a onclick="plannercreateitemshowform('+ agendaitemarray[0] +', '+ $Dag +', '+ $Uur +')">Leermoment Toevoegen</a><div style="clear: both; height: 10px;"></div><a onclick="plannerapplyrules('+ agendaitemarray[0] +', '+ $Dag +', '+ $Uur +')">Planregels Toepassen</a>');
		if(agendaitemarray[4] == 1) {
			/* Agenda Item wel gepland */
			$(".overlayplannedtableundertitle").html('Je hebt dit item op de volgende momenten ingepland:');
			$('#overlayplannedtableid').show();
			/* Retrieve data from database */
			var tabledataarray;
			$.ajax({
				type: 'POST',
				url: $urlroot + '/retrieve-homework-item-plannertable.php',
				data: {
					"HID"			: agendaitemarray[0]
				},
				cache: false,
				async: false,
				error: function() {
					alert("Er is iets misgegaan bij het laden van je agenda item planning, probeer het later opnieuw of neem contact met ons op!");
				},
				success: function(result) {
					tabledataarray = result;
				}		
			});
			tabledataarray = JSON.parse(tabledataarray);
			
			/* Process Data from Database */
			jQuery.each(tabledataarray, function(index, item) {
				var temparray = item;
				var dag = dayname(temparray[3]) +' '+ calculateDate(getDateOfMonday(temparray[2], temparray[1]), temparray[3], temparray[1]).replace(/\s+/g, '');
				if (parseInt(temparray[4]) == 1) {
					var stof = temparray[5];
				} else {
					var stof = agendaitemarray[3];
				}
				var tijd = temparray[6];
				if (parseInt(temparray[7]) == 1) {
					var afgemaakt = "&#10003;";
				} else {
					var afgemaakt = "";
				}
				
				var agendamondaydatestring = getDateOfMonday(agendaweek, agendayear);
				
				$('#overlayplannedtableid tr:last').after('<tr class="overlayplannedtabletrtoegevoegd"><td class="overlayplannedtabledag">'+ dag +'</td><td class="overlayplannedtablestof"><p class="overlayplannedtablestoftext">'+ stof +'</p></td><td class="overlayplannedtableblokje">'+ tijd +'</td><td class="overlayplannedtableblokje">'+ afgemaakt +'</td><td class="overlayplannedtableblokje"><a onclick="changeplanneritemshowform('+ temparray[0] +', '+ $Dag +', '+ $Uur +')">&#128295;</a></td><td class="overlayplannedtableblokje"><a onclick="removeplanneritemfromagendaitem('+ temparray[0] +', '+ $Dag +', '+ $Uur +')">&#10060;</a></td></tr>');
			});
		} else {
			/* Agenda Item niet gepland */
			$(".overlayplannedtableundertitle").html('Je hebt dit item nog niet ingepland.');
			$('#overlayplannedtableid').hide();
		}
		$(".overlayagendaitemformoverhorencontroleren").attr("onclick","overhorencontrolerenshowform('new')");
		/* Set Information For overlayplanneraddstudymoment */
		switch(parseInt(agendaitemarray[1])) {
			case 0:
				var type = '';
				break;
			case 1:
				var type = 'HW voor';
				break;
			case 2:
				var type = 'SO op';
				break;
			case 3:
				var type = 'PW op';
				break;
			case 4:
				var type = 'REP op';
				break;
			case 5:
				var type = 'MO op';
				break;
			case 6:
				var type = 'PO voor';
				break;
			case 7:
				var type = 'SE op';
				break;
			case 8:
				var type = 'INFO voor';
				break;
			case 9:
				var type = 'CSE op';
				break;
			case 10:
				var type = 'AFSPR op';
				break;
			case 11:
				var type = 'maakwerk voor';
				break;
			case 12:
				var type = 'leerwerk voor';
				break;
			case 13:
				var type = 'leeswerk voor';
				break;
			default:
				var type = '';
				break;
		}
		$(".overlayplanneraddstudymomentinformationvaktijdomschrijving").text(agendaitemarray[2].toUpperCase() +' '+ type +' '+ dayname(day) +' '+ calculateDate(agendamondaydatestring, day, agendayear).replace(/\s+/g, '') +' uur '+ hour +' (Week '+ agendaweek +')');
		$(".overlayplanneraddstudymomentinformationstof").text(agendaitemarray[3]);
		/* (Re)Set Values */
		$('#overlayplanneraddstudymomenttijd').val('');
		$('#overlayplanneraddstudymomentaangepastestofbool-false').prop('checked',true);
		$('#overlayplanneraddstudymomentaangepastestof').val('');
		chooseplanyear = agendayear;
		chooseplanweek = agendaweek;
		var chooseplanday = day - 1;
		if (chooseplanday < 0) {
			chooseplanday = 6;
			chooseplanweek = chooseplanweek - 1;
			if (chooseplanweek < 1) {
				chooseplanyear = chooseplanyear - 1;
				chooseplanweek = maxweeks(chooseplanyear);
			}
		}
		$('#overlayplanneraddstudymomentdag').val(chooseplanday);
		$('.chooseplanweekdisplay').text('Week ' + chooseplanweek + ' ' + chooseplanyear);
		$('.chooseplanthisweekdisplay').html('Deze Week &#40;Week ' + thisweeknumber + ' ' + thisyearnumber + '&#41;');
		/* Set Button Actions */
		$(".overlayplanneraddstudymomentcreate").val('Agenda Item Inplannen');
		$(".overlayplanneraddstudymomentcreate").attr("onclick","plannercreateitem("+ agendaitemarray[0] +", "+ day +", "+ hour +")");
		$(".overlayplanneraddstudymomentcancel").attr("onclick","returntoagendacreatechangeform("+ day +", "+ hour +")");
		$(".overlayplannerchangestudymomentagendaitem").hide();
		$(".overlayplannerchangestudymomentremove").hide();
	}
}

function agendacreatechangeitem() {
	var HID = $('#overlayagendaitemformHID').val();
	
	var jaar 	= $('#overlayagendaitemformyear').val();
	var week 	= $('#overlayagendaitemformweek').val();
	var dag 	= $('#overlayagendaitemformday').val();
	var uur 	= $('#overlayagendaitemformhour').val();
	
	var vak = $('#overlayagendaitemformvak').val();
	var type = $('#overlayagendaitemformtype').val();
	var stof = $('#overlayagendaitemformstof').val();
	
	//stof = encodeURIComponent(stof);
	
	var submitstatus;
	$.ajax({
		type: 'POST',
		url: $urlroot + '/create-update-homework-item.php',
		data: {
			"jaar"			: jaar,
			"week"			: week,
			"dag"			: dag,
			"uur"			: uur,			
			"HID"			: HID,
			"type"			: type,
			"vak"			: vak,
			"HW"			: stof
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij het opslaan van dit agenda item, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			submitstatus = result;
		}
	});
	submitstatus = JSON.parse(submitstatus);
	
	if (submitstatus == "exists") {
		alert("Er bestaat al een agenda item op die dag, op dat uur. Pas deze eerst aan a.u.b.");
	} else if (submitstatus != "success") {
		alert("Er is iets misgegaan bij het opslaan van dit agenda item, probeer het later opnieuw of neem contact met ons op!");
	}
	
	closeoverlay();
	loadagenda();
	loadplanner();
	agendacreatechangeitemshowform(dag, uur);
	if (submitstatus == "success") {
		$("#successbox").fadeIn().delay(3500).fadeOut();
	}
}

function agendaremoveitem() {
	var HID = $('#overlayagendaitemformHID').val();
	if(confirm("Weet je zeker dat je dit agenda item wil verwijderen?")){
		var submitstatus;
		$.ajax({
			type: 'POST',
			url: $urlroot + '/remove-homework-item.php',
			data: {	
				"HID" : HID
			},
			cache: false,
			async: false,
			error: function() {
				alert("Er is iets misgegaan bij het verwijderen van dit agenda item, probeer het later opnieuw of neem contact met ons op!");
			},
			success: function(result) {
				submitstatus = result;
			}		
		});
		submitstatus = JSON.parse(submitstatus);
		if (submitstatus != "success") {
			alert("Er is iets misgegaan bij het verwijderen van dit agenda item, probeer het later opnieuw of neem contact met ons op!");
		}
		closeoverlay();
		loadagenda();
		loadplanner();
	} else {
		return false;
	}
}

/* Planner Functions */
function loadplanner() {
	/* Set Week Number in Toolbar */
	$(".weergegevenweeknrplanner").html('Week ' + plannerweek);
	
	/* Set Up Table Headers */
	$(".maandagplannerlabel").html('Maandag<br>' + calculateDate(plannermondaydatestring, 0, planneryear));
	$(".dinsdagplannerlabel").html('Dinsdag<br>' + calculateDate(plannermondaydatestring, 1, planneryear));
	$(".woensdagplannerlabel").html('Woensdag<br>' + calculateDate(plannermondaydatestring, 2, planneryear));
	$(".donderdagplannerlabel").html('Donderdag<br>' + calculateDate(plannermondaydatestring, 3, planneryear));
	$(".vrijdagplannerlabel").html('Vrijdag<br>' + calculateDate(plannermondaydatestring, 4, planneryear));
	$(".zaterdagplannerlabel").html('Zaterdag<br>' + calculateDate(plannermondaydatestring, 5, planneryear));
	$(".zondagplannerlabel").html('Zondag<br>' + calculateDate(plannermondaydatestring, 6, planneryear));	
	
	/* Clear All Cells */
	$(".planitem").html('');
	$(".blokje").html('');
	$(".blokje").attr("onclick","");
	
	/* Retrieve Data from Database */
	var loadplannerarray;
	$.ajax({
		type: 'POST',
		url: $urlroot + '/retrieve-planner.php',
		data: {
			"jaar"			: planneryear,
			"week"			: plannerweek
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij het laden van je planner, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			loadplannerarray = result;
		}		
	});
	loadplannerarray = JSON.parse(loadplannerarray);
	
	/* Process Data from Database */
	var maandagplannerarray = new Array();
	var dinsdagplannerarray = new Array();
	var woensdagplannerarray = new Array();
	var donderdagplannerarray = new Array();
	var vrijdagplannerarray = new Array();
	var zaterdagplannerarray = new Array();
	var zondagplannerarray = new Array();
	
	jQuery.each(loadplannerarray, function(index, item) {
		var dag = parseInt(item[2]);
		switch (dag) {
			case 0:
				maandagplannerarray.push(item);
				break;
			case 1:
				dinsdagplannerarray.push(item);
				break;
			case 2:
				woensdagplannerarray.push(item);
				break;
			case 3:
				donderdagplannerarray.push(item);
				break;
			case 4:
				vrijdagplannerarray.push(item);
				break;
			case 5:
				zaterdagplannerarray.push(item);
				break;
			case 6:
				zondagplannerarray.push(item);
				break;
		}
	});
	writedayarraytoplanner(maandagplannerarray, 0);
	writedayarraytoplanner(dinsdagplannerarray, 1);
	writedayarraytoplanner(woensdagplannerarray, 2);
	writedayarraytoplanner(donderdagplannerarray, 3);
	writedayarraytoplanner(vrijdagplannerarray, 4);
	writedayarraytoplanner(zaterdagplannerarray, 5);
	writedayarraytoplanner(zondagplannerarray, 6);
}

function writedayarraytoplanner(array, daynumber) {
	var loadplannercellstring;
	switch(daynumber) {
		case 0:
			loadplannercellstring = 'maandag';
			break;
		case 1:
			loadplannercellstring = 'dinsdag';
			break;
		case 2:
			loadplannercellstring = 'woensdag';
			break;
		case 3:
			loadplannercellstring = 'donderdag';
			break;
		case 4:
			loadplannercellstring = 'vrijdag';
			break;
		case 5:
			loadplannercellstring = 'zaterdag';
			break;
		case 6:
			loadplannercellstring = 'zondag';
			break;
	}
	if(array.length > 9) {
		alert("Je hebt op " + loadplannercellstring + " meer dan 9 vakken ingepland! Helaas ondersteunen wij op dit moment slechts 9 ingeplande items per dag. Daarom worden niet alle ingeplande afspraken voor maandag weergegeven!");
	}
	jQuery.each(array, function(index, item) {
		switch(index) {
			case 0:
				loadplannercellstringuur = loadplannercellstring + 'een';
				break;
			case 1:
				loadplannercellstringuur = loadplannercellstring + 'twee';
				break;
			case 2:
				loadplannercellstringuur = loadplannercellstring + 'drie';
				break;
			case 3:
				loadplannercellstringuur = loadplannercellstring + 'vier';
				break;
			case 4:
				loadplannercellstringuur = loadplannercellstring + 'vijf';
				break;
			case 5:
				loadplannercellstringuur = loadplannercellstring + 'zes';
				break;
			case 6:
				loadplannercellstringuur = loadplannercellstring + 'zeven';
				break;
			case 7:
				loadplannercellstringuur = loadplannercellstring + 'acht';
				break;
			case 8:
				loadplannercellstringuur = loadplannercellstring + 'negen';
				break;
		}
		if (parseInt(item[3]) == 1) {
			var stof = item[4];
		} else {
			var stof = item[10];
		}
		
		if (parseInt(item[7]) == 1) {
			var afgemaaktsymbol = "&#10003;";
		} else {
			var afgemaaktsymbol = "";
		}
		
		if (parseInt(item[8]) == 11) {
			var typetextmwlrsw = "ma";
		} else if (parseInt(item[8]) == 12) {
			var typetextmwlrsw = "leren:";
		} else if (parseInt(item[8]) == 13) {
			var typetextmwlrsw = "lezen";
		} else {
			var typetextmwlrsw = "";
		}
		
		$(".planitem" + loadplannercellstringuur).html('<a onclick="changeplanneritemshowform('+ item[0] +')">'+ item[9].toUpperCase() +' '+ typetextmwlrsw +' '+ stof +'</a>');
		$(".planitemvolgorde" + loadplannercellstringuur).text(item[5]);
		$(".planitemvolgorde" + loadplannercellstringuur).attr("onclick","plannerchangevolgordeshowform('"+ item[0] +"', '"+ item[5] +"')");
		$(".planitemtijd" + loadplannercellstringuur).text(item[6]);
		$(".planitemtijd" + loadplannercellstringuur).attr("onclick","plannerchangetijdshowform('"+ item[0] +"', '"+ item[6] +"')");
		$(".planitemvink" + loadplannercellstringuur).html(afgemaaktsymbol);
		$(".planitemvink" + loadplannercellstringuur).attr("onclick","plannerchangeafgemaakt('"+ item[0] +"')");
	});
}

function removeplanneritemfromagendaitem(PID, day, hour) {
	removeplanneritem(PID);
	agendacreatechangeitemshowform(day, hour);
}

function removeplanneritem(PID) {
	if(confirm("Weet je zeker dat je dit leermoment wil verwijderen?")){
		var submitstatus;
		$.ajax({
			type: 'POST',
			url: $urlroot + '/remove-plan-item.php',
			data: {
				"PID" : PID
			},
			cache: false,
			async: false,
			error: function() {
				alert("Er is iets misgegaan bij het verwijderen van dit leermoment, probeer het later opnieuw of neem contact met ons op!");
			},
			success: function(result) {
				submitstatus = result;
			}		
		});
		submitstatus = JSON.parse(submitstatus);
		if (submitstatus != "success") {
			alert("Er is iets misgegaan bij het verwijderen van dit leermoment, probeer het later opnieuw of neem contact met ons op!");
		}
		closeoverlay();
		loadplanner();
		loadagenda();
	} else {
		return false;
	}
}

function plannercreateitemshowform(HID, day, hour) {
	HID = parseInt(HID);
	closeoverlay();
	loadoverlay();
	$('#overlayplanneraddstudymoment').show();
}

function plannercreateitem(HID, day, hour) {
	HID = parseInt(HID);
	/* Retrieve Data */
	var dag = $('#overlayplanneraddstudymomentdag').val();
	var aangepastestofbool = $("input[name=overlayplanneraddstudymomentaangepastestofbool]:checked").val();
	var aangepastestof = $('#overlayplanneraddstudymomentaangepastestof').val();
	var tijd = $('#overlayplanneraddstudymomenttijd').val();
	
	//aangepastestof = encodeURIComponent(aangepastestof);
	
	/* Submit Data */
	var submitstatus;
	$.ajax({
		type: 'POST',
		url: $urlroot + '/create-plan-item.php',
		data: {
			"HID"			: HID,
			"jaar"			: chooseplanyear,
			"week"			: chooseplanweek,
			"dag"			: dag,
			"aangepastbool"	: aangepastestofbool,
			"aangepastestof": aangepastestof,
			"tijd"			: tijd
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij het aanmaken van dit leermoment, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			submitstatus = result;
		}
	});
	submitstatus = JSON.parse(submitstatus);
	if (submitstatus != "success") {
		alert("Er is iets misgegaan bij het aanmaken van dit leermoment, probeer het later opnieuw of neem contact met ons op!");
	}	
	closeoverlay();
	loadplanner();
	loadagenda();
	agendacreatechangeitemshowform(day, hour);
}

function changeplanneritemshowform(PID) {
	closeoverlay();
	loadoverlay();
	$('#overlayplanneraddstudymoment').show();
	/* Retrieve Data From Database */
	var changeplannerarray;
	$.ajax({
		type: 'POST',
		url: $urlroot + '/retrieve-planner-item-change.php',
		data: {
			"PID" : PID
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij het laden van dit leermoment, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			changeplannerarray = result;
		}		
	});
	changeplannerarray = JSON.parse(changeplannerarray);
	/* Process Data From Database */
	switch(parseInt(changeplannerarray[9])) {
		case 1:
			var type = 'HW voor';
			break;
		case 2:
			var type = 'SO op';
			break;
		case 3:
			var type = 'PW op';
			break;
		case 4:
			var type = 'REP op';
			break;
		case 5:
			var type = 'MO op';
			break;
		case 6:
			var type = 'PO voor';
			break;
		case 7:
			var type = 'SE op';
			break;
		case 8:
			var type = 'INFO voor';
			break;
		case 9:
			var type = 'CSE op';
			break;
		case 10:
			var type = 'AFSPR op';
			break;
		case 11:
			var type = 'maakwerk voor';
			break;
		case 12:
			var type = 'leerwerk voor';
			break;
		case 13:
			var type = 'leeswerk voor';
			break;
	}
	$(".overlayplanneraddstudymomentinformationvaktijdomschrijving").text(changeplannerarray[10].toUpperCase() +' '+ type +' '+ dayname(parseInt(changeplannerarray[14])) +' '+ calculateDate(getDateOfMonday(parseInt(changeplannerarray[13]),parseInt(changeplannerarray[12])), parseInt(changeplannerarray[14]), parseInt(changeplannerarray[12])).replace(/\s+/g, '') +' uur '+ changeplannerarray[15] +' (Week '+ changeplannerarray[13] +')');
	$(".overlayplanneraddstudymomentinformationstof").text(changeplannerarray[11]);
	/* (Re)Set Values */
	$('#overlayplanneraddstudymomentdag').val(changeplannerarray[3]);
	if(changeplannerarray[7] != '') {
		$('#overlayplanneraddstudymomenttijd').val(parseInt(changeplannerarray[7]));
	}
	if (parseInt(changeplannerarray[4]) == 1) {
		$('#overlayplanneraddstudymomentaangepastestofbool-true').prop('checked',true);
	} else {
		$('#overlayplanneraddstudymomentaangepastestofbool-false').prop('checked',true);
	}
	$('#overlayplanneraddstudymomentaangepastestof').val(changeplannerarray[5]);
	chooseplanyear = parseInt(changeplannerarray[1]);
	chooseplanweek = parseInt(changeplannerarray[2]);
	$('.chooseplanweekdisplay').text('Week ' + chooseplanweek + ' ' + chooseplanyear);
	$('.chooseplanthisweekdisplay').html('Deze Week &#40;Week ' + thisweeknumber + ' ' + thisyearnumber + '&#41;');
	/* Set Button Actions */
	$(".overlayplanneraddstudymomentcreate").attr("onclick","plannerchangeitem("+ PID +")");
	$(".overlayplanneraddstudymomentcreate").val('Planner Item Aanpassen');
	$(".overlayplannerchangestudymomentremove").attr("onclick","removeplanneritem("+ PID +")");
	$(".overlayplannerchangestudymomentremove").show();
	$(".overlayplannerchangestudymomentagendaitem").attr("onclick","plannerchangeitemopenagendaitem("+ parseInt(changeplannerarray[12]) +", "+ parseInt(changeplannerarray[13]) +", "+ parseInt(changeplannerarray[14]) +", "+ parseInt(changeplannerarray[15]) +")");
	$(".overlayplannerchangestudymomentagendaitem").show();
	$(".overlayplanneraddstudymomentcancel").attr("onclick","plannerchangeitemopenagendaitem("+ parseInt(changeplannerarray[12]) +", "+ parseInt(changeplannerarray[13]) +", "+ parseInt(changeplannerarray[14]) +", "+ parseInt(changeplannerarray[15]) +")");
}

function plannerchangeitem(PID) {
	PID = parseInt(PID);
	/* Retrieve Data */
	var dag = $('#overlayplanneraddstudymomentdag').val();
	var aangepastestofbool = $("input[name=overlayplanneraddstudymomentaangepastestofbool]:checked").val();
	var aangepastestof = $('#overlayplanneraddstudymomentaangepastestof').val();
	var tijd = $('#overlayplanneraddstudymomenttijd').val();
	
	//aangepastestof = encodeURIComponent(aangepastestof);
	
	/* Submit Data */
	var submitstatus;
	$.ajax({
		type: 'POST',
		url: $urlroot + '/change-plan-item.php',
		data: {
			"PID"			: PID,
			"jaar"			: chooseplanyear,
			"week"			: chooseplanweek,
			"dag"			: dag,
			"aangepastbool"	: aangepastestofbool,
			"aangepastestof": aangepastestof,
			"tijd"			: tijd
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij het bijwerken van dit leermoment, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			submitstatus = result;
		}
	});
	submitstatus = JSON.parse(submitstatus);
	if (submitstatus[0] != "success") {
		alert("Er is iets misgegaan bij het bijwerken van dit leermoment, probeer het later opnieuw of neem contact met ons op!");
	}											  
	closeoverlay();
	loadplanner();
	loadagenda();
	plannerchangeitemopenagendaitem(submitstatus[1], submitstatus[2], submitstatus[3], submitstatus[4]);
}

var chooseplanyear = thisyearnumber;
var chooseplanweek = thisweeknumber;

function chooseplanweeknext() {
	var maxweekschooseplan = maxweeks(chooseplanyear);
	chooseplanweek = chooseplanweek + 1;
	chooseplanyear = chooseplanyear;
	if (chooseplanweek > maxweekschooseplan) {
		chooseplanweek = 1;
		chooseplanyear = chooseplanyear + 1;
	}
	$('.chooseplanweekdisplay').text('Week ' + chooseplanweek + ' ' + chooseplanyear);
}

function chooseplanweekcurrent() {
	chooseplanyear = thisyearnumber;
	chooseplanweek = thisweeknumber;
	$('.chooseplanweekdisplay').text('Week ' + chooseplanweek + ' ' + chooseplanyear);
}

function chooseplanweekprevious() {
	chooseplanweek = chooseplanweek - 1;
	chooseplanyear = chooseplanyear;
	if (chooseplanweek < 1) {
		chooseplanyear = chooseplanyear - 1;
		chooseplanweek = maxweeks(chooseplanyear);
	}
	$('.chooseplanweekdisplay').text('Week ' + chooseplanweek + ' ' + chooseplanyear);
}

function showplannerchangeform() {
	$('#plannerchangeform').show();
}

function closeplannerchangeform() {
	$('#plannerchangeform').hide();
	$('#plannerchangetijdform').hide();
	$('#plannerchangevolgordeform').hide();
	$('#plannerchangetijdform').unbind("keyup");
	$('#plannerchangevolgordeform').unbind("keyup");
}

function plannerchangetijdshowform(PID, tijd) {
	showplannerchangeform();
	$('#plannerchangetijdform').show();
	$('#plannerchangetijdformPID').val(PID);
	$('#plannerchangetijdformtijd').val(tijd);
	$('#plannerchangetijdformtijd').focus();
	
	$("#plannerchangetijdform").keyup(function(event){
		if(event.keyCode == 13){
			$("#plannerchangetijdformtijdbutton").unbind("click").click();
		}
	});
}

function plannerchangevolgordeshowform(PID, volgorde) {
	showplannerchangeform();
	$('#plannerchangevolgordeform').show();
	$('#plannerchangevolgordeformPID').val(PID);
	$('#plannerchangevolgordeformvolgorde').val(volgorde);
	$('#plannerchangevolgordeformvolgorde').focus();
	
	$("#plannerchangevolgordeform").keyup(function(event){
		if(event.keyCode == 13){
			$("#plannerchangevolgordeformvolgordebutton").unbind("click").click();
		}
	});
}

function plannerchangetijd() {
	closeplannerchangeform();
	var PID = $('#plannerchangetijdformPID').val();
	var tijd = $('#plannerchangetijdformtijd').val();
	var submitstatus;
	$.ajax({
		type: 'POST',
		url: $urlroot + '/planner-update-tijd.php',
		data: {
			"PID"			: PID,
			"tijd"			: tijd
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij het bijwerken van de tijd die je wou instellen voor deze taak, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			submitstatus = result;
		}		
	});
	submitstatus = JSON.parse(submitstatus);
	if (submitstatus != "success") {
		alert("Er is iets misgegaan bij het bijwerken van de tijd die je wou instellen voor deze taak, probeer het later opnieuw of neem contact met ons op!");
	}
	loadplanner();
}

function plannerchangevolgorde() {
	closeplannerchangeform();
	var PID = $('#plannerchangevolgordeformPID').val();
	var volgorde = $('#plannerchangevolgordeformvolgorde').val();
	var submitstatus;
	$.ajax({
		type: 'POST',
		url: $urlroot + '/planner-update-volgorde.php',
		data: {
			"PID"		: PID,
			"volgorde"	: volgorde
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij het bijwerken van de volgorde die je wou instellen voor deze taak, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			submitstatus = result;
		}		
	});
	submitstatus = JSON.parse(submitstatus);
	if (submitstatus != "success") {
		alert("Er is iets misgegaan bij het bijwerken van de volgorde die je wou instellen voor deze taak, probeer het later opnieuw of neem contact met ons op!");
	}
	loadplanner();
}

function plannerchangeafgemaakt(PID) {
	var submitstatus;
	$.ajax({
		type: 'POST',
		url: $urlroot + '/planner-update-afgemaakt.php',
		data: {
			"PID"			: PID
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij het afvinken van deze taak, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			submitstatus = result;
		}		
	});
	submitstatus = JSON.parse(submitstatus);
	if (submitstatus != "success") {
		alert("Er is iets misgegaan bij het afvinken van deze taak, probeer het later opnieuw of neem contact met ons op!");
	}
	loadplanner();
}

function plannerchangeitemopenagendaitem(jaar, week, dag, uur) {
	agendayear = parseInt(jaar);
	agendaweek = parseInt(week);
	agendamondaydatestring = getDateOfMonday(agendaweek, agendayear);
	loadagenda();
	$("#agendatable").scrollLeft(0);
	dag = parseInt(dag);
	uur = parseInt(uur);
	closeoverlay();
	agendacreatechangeitemshowform(dag, uur);
}

/* Overlay Functions */
function closeoverlay() {
	$('#overlay').hide();	
	$('#overlayagendaitemform').hide();
	$('#overlayplannedtable').hide();
	$('#overlayplanneraddstudymoment').hide();
	$("#successbox").hide();
}

function loadoverlay() {
	$('#overlay').show();
	$('#inneroverlay').show();
	$('#overlay').click(function() {
		closeoverlay();
	});
	$("#inneroverlay").click(function( event ) {
		event.stopPropagation();
	});
}


function returntoagendacreatechangeform(day, hour) {
	closeoverlay();
	agendacreatechangeitemshowform(day, hour);
}

$(document).keyup(function(e) { /* Capture Escape to close overlay */
     if (e.keyCode == 27) { /* Escape key maps to keycode 27 */
        closeoverlay();
		closeplannerchangeform();
    }
});

function plannerapplyrules(HID, day, hour) {
	var submitstatus;
	$.ajax({
		type: 'POST',
		url: $urlroot + '/planner-apply-rules.php',
		data: {
			"HID" : HID
		},
		cache: false,
		async: false,
		error: function() {
			alert("Er is iets misgegaan bij toepassen van de planregels, probeer het later opnieuw of neem contact met ons op!");
		},
		success: function(result) {
			submitstatus = result;
		}		
	});
	submitstatus = JSON.parse(submitstatus);
	if (submitstatus == "impossible") {
		alert("Voor dit type huiswerk zijn geen planregels!");
	} else if (submitstatus != "success") {
		alert("Er is iets misgegaan bij toepassen van de planregels, probeer het later opnieuw of neem contact met ons op!");
	}
	loadagenda();
	loadplanner();
	closeoverlay();
	agendacreatechangeitemshowform(day, hour);
}