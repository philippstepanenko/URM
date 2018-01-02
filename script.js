var n = 5; // number of registers
var registers = [];
var regs;
var program; 
var command; // command
var args; // arguments
var step = 1;

function init(){
	for (var i=0; i<n; i++){
		//document.getElementById('registers').innerHTML+="<tr><td>R"+parseInt(i+1)+"</td><td><input id='r" + parseInt(i) + "' type='number' value='0' min='0'></input></td></tr>";
		document.getElementById('registers').innerHTML+="<tr><td>R" + (i + 1) +"</td><td><input id='r" + i + "' type='number' value='0' min='0'></input></td></tr>";
		}
}

function load(){
	// load registers
	regs = document.getElementsByTagName('input');
	for (var i=0; i<n; i++){
		registers[i]=parseInt(regs[i].value);
	}
	// load program
	program = document.getElementById('program').value.split("\n");
	step = 1;
	// show step
	con("loaded");
}

function stp(){
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
	else if (command=="J" && registers[args[0]-1] == registers[args[1]-1]) step = args[2];
	show_regs();
}

function start(){
	while (program.length>step-1){
		stp();
	}
	stp();
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
	document.getElementById('registers').innerHTML += "<tr><td>R" + n + "</td><td><input id='r" + n + "' type='number' value='0' min='0'></input></td></tr>";
}