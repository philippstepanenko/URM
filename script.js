var n = 0; // number of registers
var registers = [];
var regs;
var program; 
var command; // command
var args; // arguments
var step = 1;
var f = 0; // flag

function init(){
var b1 = document.getElementById("load");
var b2 = document.getElementById("step");
var b3 = document.getElementById("start");
var b4 = document.getElementById("add");
var reg = document.getElementById("registers");

b1.addEventListener("click", load, true);
b2.addEventListener("click", current_step, true);
b3.addEventListener("click", start, true);
b4.addEventListener("click", add, false);
for (var i=0; i<5; i++){
		add();
		}
}

function load(){
	// load registers
	regs = document.getElementsByTagName('input');
	for (var i=0; i<n; i++){
		if (regs[i].value == ""){
			regs[i].value=0;
			document.getElementById('r'+(i+1)).value=regs[i].value;
		}
		registers[i]=parseInt(regs[i].value);
	}
	// load program
	program = document.getElementById('program').value.split("\n");
	step = 1;
	// show step
	con("loaded");
	f=1;
}

function current_step(){
	if (f==1){
		if (program.length<=step-1){
			con("stopped");
			return false;
		}
		else{
			con(step);
			step++;
		}
		command = program[step-2].split(' ')[0].toUpperCase();
		args = program[step-2].substr(program[step-2].search(' ')+1).split(' ');
		if(command=="Z" && args.length==1 && args[0] != ""){
			registers[args[0]-1] = 0;
		}
		else if (command=="S" && args.length==1 && args[0] != ""){
					registers[args[0]-1] ++;
		}
		else if (command=="T" && args.length==2 && (args[0] != "" || args[1] != "")){
					registers[args[1]-1] = registers[args[0]-1];
		}
		else if (command=="J" && args.length==3 && (args[0] != "" || args[1] != "" || args[2] != "")) {
						if (registers[args[0]-1] == registers[args[1]-1]) step = parseInt(args[2]);
					}
		else {
			error();
			return false;
		}
		show_regs();
	}
}

function error(){
	f=0;
	con("error in line " + parseInt(step-1));
	step = program.length+2;
}

function start(){
	if (f==1){
		while (program.length>step-1){
			if (current_step() == false) return false;
		}
		current_step();
	}
}

function show_regs(){
	regs = document.getElementsByTagName('input');
	for (var i=0; i<n; i++){
		regs[i].value=registers[i];
	}
}

function con(str){
	str = typeof str == "number" ? "line " + str : str;
	document.getElementById('console').innerHTML="<b>status:</b> "+str;
	//console.log(str);
}

function add(){
	n++;
	var reg = document.getElementById('registers');
	// add line
	var tr = document.createElement("tr");
	reg.appendChild(tr);
	// add label
	var td = document.createElement("td"),
			label = document.createTextNode("R"+n+" ");
	td.setAttribute("class","label");
	td.appendChild(label);
	tr.appendChild(td);
	// add input
	var td = document.createElement("td"),
			value = document.createElement("input");
	td.setAttribute("class","value");
	value.setAttribute("id","r"+ n);
	value.setAttribute("type","number");
	value.setAttribute("value",0);
	value.setAttribute("min",0);
	td.appendChild(value);
	tr.appendChild(td);
}

window.addEventListener("load", init, false);