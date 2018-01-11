var n = 0; // number of registers
var registers = [];
var regs;
var program; 
var command; // command
var args; // arguments
var step = 1;


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
}

function current_step(){
	if (program.length<=step-1) {
		con("stopped");
		return;
	}
	else{
		con(step);
		step++;
	}
	command = program[step-2].split(' ')[0].toUpperCase();
	args = program[step-2].substr(2).split(' ');
	if(command=="Z") registers[args[0]-1] = 0;
	else if (command=="S") registers[args[0]-1] ++;
	else if (command=="T") registers[args[1]-1] = registers[args[0]-1];
	else if (command=="J" && registers[args[0]-1] == registers[args[1]-1]) step = parseInt(args[2]);
	show_regs();
}

function start(){
	while (program.length>step-1){
		current_step();
	}
	current_step();
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
	console.log(str);
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