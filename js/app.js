// initial var
var formats = ['0.0a', '0,0'];
var positive = 0;
var recovered = 0;
var death = 0;
var format = 0;

$(document).ready(function(){
	consumeApi();

	$("#btn-format").on("click", function(){
		format = (format+1) % 2;
		printCount();
	});

	$("#btn-reload").on("click", function(){
		loading();
		consumeApi();
	});
});

function consumeApi(){
	loading();
	$.get("https://covid19.mathdro.id/api/countries/ID", function(data, status){
		if(status == 'success'){
			positive = data.confirmed.value;
			recovered = data.recovered.value;
			death = data.deaths.value;

			moment.locale('id');
			$("#update").text(moment(data.lastUpdate).format('dddd, DD MMMM YYYY HH:mm')+' WIB');
			printCount();
			showPage();
		}else{
			alert("Failed");
		}
	}).catch(function(error){
		alert("error");
	});
}

function showPage(){
	$(".loading").fadeOut(2000);
	$("#particles").fadeIn(3000);
	$("section").delay(2000).fadeIn(2000);
	loadParticle();
}

function printCount(){
	$("#positive").text(numeral(positive).format(formats[format]));
	$("#recovered").text(numeral(recovered).format(formats[format]));
	$("#death").text(numeral(death).format(formats[format]));
}

function loading(){
	$("body").css('display', 'block');
	$(".loading").show();
	$("#particles").hide();
	$("section").hide();
}