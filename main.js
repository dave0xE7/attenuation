
var canvas;
var ctx;

var controlls;
var inputValues = [];

function Archimedes() {
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    ctx.beginPath();

    for (i = 0; i < 720; i++) {
        angle = 0.1 * i;
        x = cx + (1 + angle) * Math.cos(angle);
        y = cy + (1 + angle) * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}


function BinaryStyle(light) {
    if (light) {
        ctx.strokeStyle = "rgba(0.1, 0.1, 0.1, 0.8)";
        // ctx.fillStyle = "rgba(0.1, 0.1, 0.1, 0.8)";
        ctx.fillStyle = "#000";
    } else {
        ctx.strokeStyle = "rgba(0.1, 0.1, 0.1, 0.4)";
        // ctx.fillStyle = "rgba(0.1, 0.1, 0.1, 0.4)";
        ctx.fillStyle = "#FFF";
    }
}

function NumberStyle(n) {
    BinaryStyle(Math.floor(n/2) == (n/2));
}

function Animate() {
    setInterval(function () { inputValues["rings"]=parseInt(inputValues["rings"])+1; Draw(); }, 100);
}

function MainDrawing() {

    let cx = canvas.width / 2;
    let cy = canvas.height / 2;


    let c = parseInt(inputValues["c"]);

    // let n = 10;
    /* let n = inputValues["a"];
    let m = inputValues["b"];
    let mm = m / 2;

    for (let i = 0; i < n; i++) {
        ctx.beginPath();
        // ctx.moveTo(cx,cy)
        ctx.arc(cx, cy, i * m, 0, 2 * Math.PI);
        ctx.stroke();
    }


    let ns = (2 * Math.PI) / n;
    for (let i = 0; i < c; i++) {
        ctx.beginPath();
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, i * m + mm, i * ns, -i * ns);
        ctx.lineTo(cx, cy)
        ctx.stroke();
        // ctx.fill();
    } */

    let rings = parseInt(inputValues["rings"]);
    let slices = parseInt(inputValues["slices"]);
    let innerRadius = parseInt(inputValues["innerRadius"]);
    let outerRadius = parseInt(inputValues["outerRadius"]);
    
    // let ringSpaces = Math.floor(Math.floor(outerRadius - innerRadius) / rings);
    let ringSpaces = Math.floor(outerRadius - innerRadius) / rings;
    let sliceAngles = (2 * Math.PI) / slices;

    console.log("ringSpaces="+ringSpaces);
    console.log("sliceAngles="+sliceAngles);
/* 
    ctx.moveTo(cx,cy);
    ctx.beginPath();
    // ctx.quadraticCurveTo();
    ctx.stroke(); */

    ctx.strokeStyle = "rgba(0.1, 0.1, 0.1, 0.4)";

    for (let i = 0; i < rings; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, innerRadius + (i * ringSpaces), 0, 2 * Math.PI);
        ctx.stroke();
    }

    for (let i = 0; i < slices; i++) {
        ctx.moveTo(cx,cy)
        ctx.beginPath();
        
        ctx.arc(cx, cy, outerRadius, i * sliceAngles, i * sliceAngles + sliceAngles);
        ctx.lineTo(cx,cy);
        ctx.stroke();
    }



    for (let i = 0; i < rings; i++) {
        // ctx.beginPath();
        // ctx.arc(cx, cy, innerRadius + (i * ringSpaces), 0, 2 * Math.PI);

        let ringsRadius = innerRadius + (i * ringSpaces);
        
        for (let j = 0; j < slices; j++) {
            // if (Math.floor(j/2) == (j/2)) {
            //     ctx.strokeStyle = "rgba(0.1, 0.1, 0.1, 0.8)";
            //     ctx.fillStyle = "rgba(0.1, 0.1, 0.1, 0.8)";
            // } else {
            //     ctx.strokeStyle = "rgba(0.1, 0.1, 0.1, 0.4)";
            //     ctx.fillStyle = "rgba(0.1, 0.1, 0.1, 0.4)";
            // }
            NumberStyle((j*(c*0.1))+i);

            ctx.moveTo(cx,cy)
            ctx.beginPath();
            
            ctx.arc(cx, cy, ringsRadius, j * sliceAngles, j * sliceAngles + sliceAngles);
            // ctx.closePath();
            ctx.arc(cx, cy, ringsRadius + ringSpaces, j * sliceAngles + sliceAngles, j * sliceAngles, true);
            // ctx.lineTo(cx,cy);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
        ctx.stroke();
    }
}

function Clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function CreateInputControlls(name, defaultValue) {
    inputValues[name] = defaultValue;
    let newBox = document.createElement("div");
    newBox.className = "inputControlls";
    let newInput = document.createElement("input");
    let newLabel = document.createElement("label");
    newInput.type = "number"
    newInput.name = name;
    if (localStorage.hasOwnProperty(name)) {
        let storedValue = localStorage.getItem(name);
        inputValues[name] = storedValue;
        newInput.value = storedValue;
    } else {
        newInput.value = defaultValue;
    }
    newInput.onchange = function (e) {
        let inputName = e.target.name;
        let inputVal = e.target.value;
        // console.log(""+inputName+"="+inputVal);
        inputValues[inputName] = inputVal;
        localStorage.setItem(inputName, inputVal);
        Draw();
    }
    newLabel.for = name;
    newLabel.innerText = name + ": ";
    newBox.append(newLabel);
    newBox.append(newInput);
    controlls.append(newBox);
}

function Draw() {
    Clear();
    MainDrawing();
}

window.onload = function () {

    console.log("loaded");

    canvas = document.getElementById("myCanvas");
    controlls = document.getElementById("myControlls");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.strokeStyle = "1px #000";


    ctx.beginPath();
    ctx.moveTo(0, 0)
    ctx.lineTo(window.innerWidth, window.innerHeight);
    ctx.stroke();


    CreateInputControlls("a", 10)
    CreateInputControlls("b", 10)
    CreateInputControlls("c", 1)

    CreateInputControlls("rings", 15)
    CreateInputControlls("slices", 25)
    CreateInputControlls("innerRadius", 60)
    CreateInputControlls("outerRadius", 300)

    // MainDrawing();
    Draw();
};