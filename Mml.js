// Mmb.js, Mauricio Diaz Mai 2016
//
//
// History:
//  09.05.2016: first Version

////////////////////////////////////
// MmlRect

function MmbRect( x, y, w, h ) {
  this.Set( x, y, w, h );
}

MmbRect.prototype.SetPos = function( x, y ) {
  this.x = x;
  this.y = y;
}

MmbRect.prototype.SetSize = function( w, h ) {
  this.w = w;
  this.h = h;
}

MmbRect.prototype.Set = function( x, y, w, h ) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

MmbRect.Ok = function( obj ) {
  return xDef(obj) && xDef(obj.x) && xDef(obj.w);
}

MmbRect.prototype.CalcArea = function(){
	var CalcArea = this.w*this.h;
	return CalcArea;
}

//Objekt MmbRoofArea - verlegugnsflaeche

function MmbRoofArea ( x, y, w, h ) {
  MmbRect.call(this, x, y, w, h);
};

MmbRoofArea.prototype = new MmbRect();

MmbRoofArea.prototype.constructor = MmbRoofArea;
MmbRoofArea.prototype.PrintCalcArea = function (){
	console.log(this.CalcArea());
}

MmbRoofArea.prototype.CalcAreaPanels = function (widhtPanel){
	var Panels = this.PlacementPanels(widhtPanel);
	var AreaPanels = 0;
	for (var i=0; i<Panels.length; i++){
		AreaPanels += Panels[i].CalcArea();
		console.log(AreaPanels);
	}
	return AreaPanels;	
}

MmbRoofArea.prototype.PlacementPanels = function (widhtPanel) {
	var Panels = new Array();
	var numberPanels = Math.round(this.w/widhtPanel);
	console.log(this.w);
	console.log(widhtPanel);
	console.log(numberPanels);
	for (var i=0; i<numberPanels; i++){
		Panels[i]= new MmbPanel (this.x,this.y + i*widhtPanel,widhtPanel,this.h);
	}
	console.log(Panels.length);
	return Panels;
}


// Objekt MmbPanel - Tafel/Element

function MmbPanel (x, y, w, h){
	MmbRect.call(this, x, y, w, h);
}
MmbPanel.prototype = new MmbRect();

MmbPanel.prototype.constructor = MmbPanel;

MmbPanel.prototype.PrintCalcArea = function (){
	console.log(this.CalcArea());
}


// Dummy RoofArea

var roof1 = new MmbRoofArea(0,0,200,500);
roof1.PrintCalcArea();

// Dummy Panel
var panel1 = new MmbPanel (0,0,17.54,500);
panel1.PrintCalcArea();


// Einstellung Canvas


function initCanvas(){
	//var ctx = document.getElementById("canvasmetall").getContext('2d');
	var canvas = document.getElementById('canvasmetall');
	var kontext = canvas.getContext('2d');
	kontext.canvas.addEventListener('mousemove', function(event){
		var mouseX = event.clientX - kontext.canvas.offsetLeft;
		var mouseY = event.clientY - kontext.canvas.offsetTop + 72;
		var status = document.getElementById("status");
		status.innerHTML = mouseX+" | "+mouseY;
	});
	var viewCanvas = new MmbViewCanvas(canvas,kontext);
	//viewCanvas.drawLinie(100,300);
	colorRoof = "black";
	lineWidthRoof = 2;
	colorPanel = "orange";
	lineWidthPanel = "1";
	viewCanvas.drawMmbRect(roof1,colorRoof,lineWidthRoof);
	var panelsRoof1 = roof1.PlacementPanels(panel1.w);
	for (var i=0; i<panelsRoof1.length; i++){
		viewCanvas.drawMmbRect(panelsRoof1[i],colorPanel,lineWidthPanel);
	}
	console.log(roof1.CalcAreaPanels(panel1.w));
}

	

window.addEventListener('load', function(event){
	initCanvas();
});

window.onload = function(){
	
	 var button = document.getElementById("ButtonChapas");
	 button.onclick = zeichnenHandler;
	 var button1 = document.getElementById("Buttonloeschen");
	 button1.onclick = loeschenHandler;
}


// Objekt View für Canvas


function MmbViewCanvas(canvas,kontext) {
	this.canvas = canvas;
	this.kontext = kontext;
}

MmbViewCanvas.prototype.drawLinie = function( x1, x2) {
	this.kontext.beginPath();
	this.kontext.moveTo(x1,200);
	this.kontext.lineTo(x2,200);
	this.kontext.lineWidth = 10;
	this.kontext.strokeStyle = "orange";
	this.kontext.stroke();
}
		
 MmbViewCanvas.prototype.drawMmbRect = function(MmbRect, color, lineWidthStarke){
	this.kontext.beginPath();
	this.kontext.moveTo(MmbRect.x,MmbRect.y);
	this.kontext.lineTo(MmbRect.x,MmbRect.y+MmbRect.w);
	this.kontext.lineTo(MmbRect.x+MmbRect.h,MmbRect.y+MmbRect.w);
	this.kontext.lineTo(MmbRect.x+MmbRect.h,MmbRect.y);
	this.kontext.lineTo(MmbRect.x,MmbRect.y);
	this.kontext.lineWidth = lineWidthStarke
	this.kontext.strokeStyle = color;
	this.kontext.stroke();
}
 

function zeichnenHandler (){
	MmbViewCanvas(100,300);
}
	
	
	
	
	
	