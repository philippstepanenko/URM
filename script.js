// main variables
let n = 0; // number of registers
let registers = [];
let regs;
let program, command, args;
let step = 1;

// UI variables
let reg, tr, td, label, value; // register tags

// other variables
let ready = false; // ready flag
const EMPTY = "";
const DEFAULT_N = 7;

// initialization
function init(){
	for (let i = 0; i < DEFAULT_N; i ++){
			add();
			}
}

// loading
function load(){
	// registers
	regs = document.getElementsByTagName('input');
	for (let i = 0; i < n; i++){
		if (regs[i].value == EMPTY){
			regs[i].value = 0;
			document.getElementById('r' + (i + 1)).value = regs[i].value;
		}
		registers[i] = parseInt(regs[i].value);
	}
	// program
	program = document.getElementById('program').value.split("\n");
	step = 1;
	cons("loaded");
	ready = true;
}

// current step
function current_step(){
	if (ready == true){
		if (program.length <= step - 1){
			cons("stopped");
			return false;
		}
		else{
			cons(step);
			step ++;
		}
		command = program[step - 2].split(' ')[0].toUpperCase();
		args = program[step - 2].substr(program[step-2].search(' ') + 1).split(' ');
		if(command == "Z" && args.length == 1 && args[0] != EMPTY){
			registers[args[0] - 1] = 0;
		}
		else if (command == "S" && args.length == 1 && args[0] != EMPTY){
					registers[args[0] - 1] ++;
		}
		else if (command == "T" && args.length == 2 && (args[0] != EMPTY || args[1] != EMPTY)){
					registers[args[1] - 1] = registers[args[0]-1];
		}
		else if (command == "J" && args.length == 3 && (args[0] != EMPTY || args[1] != EMPTY || args[2] != EMPTY)) {
						if (registers[args[0] - 1] == registers[args[1] - 1]) step = parseInt(args[2]);
					}
		else {
			error();
			return false;
		}
		show_regs();
	}
}

// error
function error(){
	ready = false;
	cons("error in line " + parseInt(step - 1));
	step = program.length + 2;
}

// execution by steps
function start(){
	if (ready == true){
		while (program.length > step - 1){
			if (current_step() == false) return false;
		}
		current_step();
	}
}

// show registers
function show_regs(){
	regs = document.getElementsByTagName('input');
	for (let i = 0; i < n; i ++){
		regs[i].value = registers[i];
	}
}

// console
function cons(str){
	str = typeof str == "number" ? "line " + str : str;
	document.getElementById('console').innerHTML = `<b>Status:</b> ${str}`;
}

// new register
function add(){
	n ++;
	reg = document.getElementById('registers');
	// add line
	tr = document.createElement("tr");
	reg.appendChild(tr);
	// add label
	td = document.createElement("td"),
	label = document.createTextNode(`R${n} `);
	td.setAttribute("class", "label");
	td.appendChild(label);
	tr.appendChild(td);
	// add input
	td = document.createElement("td"),
	value = document.createElement("input");
	td.setAttribute("class", "value");
	value.setAttribute("id", `r${n}`);
	value.setAttribute("type", "number");
	value.setAttribute("value", 0);
	value.setAttribute("min", 0);
	td.appendChild(value);
	tr.appendChild(td);
}

window.addEventListener("load", init, false);