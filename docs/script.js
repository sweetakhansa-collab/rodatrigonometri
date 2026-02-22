const angles = [
  0,
  30,
  45,
  60,
  90,
  120,
  135,
  150,
  180,
  210,
  225,
  240,
  270,
  300,
  315,
  330
];

const funcs = ["sin", "cos", "tan", "sec", "cosec", "cot"];

const angleRing = document.getElementById("angleRing");
const funcRing = document.getElementById("funcRing");
const stage = document.getElementById("stage");
const angleArrow = document.getElementById("angleArrow");
const funcArrow = document.getElementById("funcArrow");
const result = document.getElementById("result");

/* =========================
   POSISI SUDUT (FIX)
   0° dipindah ke atas
========================= */

const offset = -90;

angles.forEach((a) => {
  const el = document.createElement("div");
  el.className = "angle";

  el.style.transform = `rotate(${a + offset}deg) translate(190px) rotate(${
    -a - offset
  }deg)`;

  el.innerText = a + "°";

  angleRing.appendChild(el);
});

/* =========================
   FUNGSI
========================= */

funcs.forEach((f, i) => {
  const el = document.createElement("div");
  el.className = "func";

  el.style.transform = `rotate(${i * 60}deg) translate(95px) rotate(${
    -i * 60
  }deg)`;

  el.innerText = f;

  funcRing.appendChild(el);
});

/* =========================
   VARIABEL
========================= */

let angleDeg = 0;
let funcDeg = 0;

/* =========================
   HITUNG SUDUT MOUSE
========================= */

function getAngle(e) {
  const rect = stage.getBoundingClientRect();

  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  let raw = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;

  /* sistem jam */
  let deg = (450 - raw) % 360;

  return deg;
}

/* =========================
   DRAG PANAH SUDUT
========================= */

angleArrow.onmousedown = () => {
  document.onmousemove = (e) => {
    angleDeg = getAngle(e);

    angleArrow.style.transform = `rotate(${angleDeg}deg) translate(0,-210px)`;

    update();
  };
};

document.onmouseup = () => (document.onmousemove = null);

/* =========================
   DRAG PANAH FUNGSI
========================= */

funcArrow.onmousedown = () => {
  document.onmousemove = (e) => {
    funcDeg = getAngle(e);

    funcArrow.style.transform = `rotate(${funcDeg}deg) translate(95px,0)`;

    update();
  };
};

/* =========================
   DATA TRIG
========================= */

const trig = {
  0: { sin: "0", cos: "1", tan: "0", cosec: "undefined", sec: "1", cot: "undefined" },
  30: { sin: "1/2", cos: "√3/2", tan: "1/√3", cosec: "2", sec: "2/√3", cot: "√3" },
  45: { sin: "√2/2", cos: "√2/2", tan: "1", cosec: "√2", sec: "√2", cot: "1" },
  60: { sin: "√3/2", cos: "1/2", tan: "√3", cosec: "2/√3", sec: "2", cot: "1/√3" },
  90: { sin: "1", cos: "0", tan: "undefined", cosec: "1", sec: "undefined", cot: "0" },

  120: { sin: "√3/2", cos: "-1/2", tan: "-√3", cosec: "2/√3", sec: "-2", cot: "-1/√3" },
  135: { sin: "√2/2", cos: "-√2/2", tan: "-1", cosec: "√2", sec: "-√2", cot: "-1" },
  150: { sin: "1/2", cos: "-√3/2", tan: "-1/√3", cosec: "2", sec: "-2/√3", cot: "-√3" },

  180: { sin: "0", cos: "-1", tan: "0", cosec: "undefined", sec: "-1", cot: "undefined" },

  210: { sin: "-1/2", cos: "-√3/2", tan: "1/√3", cosec: "-2", sec: "-2/√3", cot: "√3" },
  225: { sin: "-√2/2", cos: "-√2/2", tan: "1", cosec: "-2", sec: "-2/√3", cot: "√3" },
  240: { sin: "-√3/2", cos: "-1/2", tan: "√3", cosec: "-2/√3", sec: "-2", cot: "1/√3" },

  270: { sin: "-1", cos: "0", tan: "undefined", cosec: "-1", sec: "undefined", cot: "0" },

  300: { sin: "-√3/2", cos: "1/2", tan: "-√3", cosec: "-2/√3", sec: "2", cot: "-1/√3" },
  315: { sin: "-√2/2", cos: "√2/2", tan: "-1", cosec: "-√2", sec: "√2", cot: "-1" },
  330: { sin: "-1/2", cos: "√3/2", tan: "-1/√3", cosec: "-2", sec: "2/√3", cot: "-√3"}
};

/* =========================
   UPDATE HASIL
========================= */

function update() {
  let deg = ((angleDeg % 360) + 360) % 360;

  /* sudut terdekat */

  let nearest = angles.reduce((prev, curr) =>
    Math.abs(curr - deg) < Math.abs(prev - deg) ? curr : prev
  );

  let funcIndex = Math.round((((funcDeg % 360) + 360) % 360) / 60) % 6;

  let func = funcs[funcIndex];

  if (trig[nearest] && trig[nearest][func]) {
    result.innerHTML = `${func} ${nearest}° <br>=<br> ${trig[nearest][func]}`;
  } else {
    result.innerHTML = `${func} ${nearest}°`;
  }
}
function hitungTrig(){

const input = document
.getElementById("inputTrig")
.value
.toLowerCase()
.trim();

const output = document.getElementById("hasilTrig");

const parts = input.split(" ");

if(parts.length !== 2){
output.innerText = "Format contoh: cos 60";
return;
}

const func = parts[0];
const deg = parseFloat(parts[1]);

if(isNaN(deg)){
output.innerText = "Sudut tidak valid";
return;
}

/* cek apakah sudut istimewa */

if(trig[deg] && trig[deg][func]){

output.innerText =
`${func} ${deg}° = ${trig[deg][func]}`;

return;

}

/* kalau bukan sudut istimewa */

const rad = deg * Math.PI / 180;

let value;

if(func === "sin") value = Math.sin(rad);
else if(func === "cos") value = Math.cos(rad);
else if(func === "tan") value = Math.tan(rad);
else{
output.innerText = "Gunakan sin, cos, atau tan";
return;
}

output.innerText =
`${func} ${deg}° = ${value.toFixed(4)}`;

}