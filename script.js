var selectedText = "";

function updateSelect($select, dates) {
  $select.empty();
  $.each(dates, function(index, date) {
    $select.append($('<option>').val(date).text(date));
  });
};

$.getJSON('https://earthquake-detection-default-rtdb.firebaseio.com/X-Axis.json', function(data) {
  var $sel = $("#arr"), dates = [];
  $.each(data, function(key, value) {
    if (!dates.includes(value.date)) {
      dates.push(value.date);
    }
  });
  console.log(dates);
  updateSelect($sel, dates);
  
});




function ChartDisp() {
 
selectedText = $("#arr").find("option:selected").text();

var Xread = [];
var Yread = [];
var Zread = [];

$.getJSON("https://earthquake-detection-default-rtdb.firebaseio.com/X-Axis.json", function(data){
	$.each(data, function(key, value){
		if(value.date == selectedText){
       			Xread.push({x: new Date(value.date+"T"+value.time+"Z"), y: value.reading})
		}
 	})
console.log(Xread);
});

$.getJSON("https://earthquake-detection-default-rtdb.firebaseio.com/Y-Axis.json", function(data){
	$.each(data, function(key, value){
		if(value.date == selectedText){
         		Yread.push({x: new Date(value.date+"T"+value.time+"Z"), y: value.reading})
		}
	 })
console.log(Yread);
});

$.getJSON("https://earthquake-detection-default-rtdb.firebaseio.com/Z-Axis.json", function(data){
	 $.each(data, function(key, value){
		if(value.date == selectedText){
	         	Zread.push({x: new Date(value.date+"T"+value.time+"Z"), y: value.reading})
		}
	 })
console.log(Zread);
});


var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "dark1",
	title:{
		text: "Accelerometer Data"
	},
	axisX:{
		title: "Time",
		valueFormatString: "HH:mm",
		crosshair: {
			enabled: true,
			snapToDataPoint: true
		}
	},
	axisY: {
		title: "Acceleration (g)",
		includeZero: true,
		crosshair: {
			enabled: true,
			snapToDataPoint: true
		}
	},
	toolTip:{
		shared:true
	},  
	legend:{
		cursor:"pointer",
		verticalAlign: "bottom",
		horizontalAlign: "left",
		dockInsidePlotArea: false,
		itemclick: toogleDataSeries
	},
	data: [{
		type: "line",
		showInLegend: true,
		name: "X Axis",
		xValueFormatString: "hh:mm",
		color: "#FF0000",
		dataPoints: Xread
	},
	{
		type: "line",
		showInLegend: true,
		name: "Y Axis",
		color: "#00FF00",
		dataPoints: Yread
	},
	{
		type: "line",
		showInLegend: true,
		name: "Z Axis",
		color: "#0000FF",
		dataPoints: Zread
	}]

});

chart.render();

function toogleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
	chart.render();
}

}
