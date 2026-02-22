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
  0: { sin: "0", cos: "1", tan: "0" },
  30: { sin: "1/2", cos: "√3/2", tan: "1/√3" },
  45: { sin: "√2/2", cos: "√2/2", tan: "1" },
  60: { sin: "√3/2", cos: "1/2", tan: "√3" },
  90: { sin: "1", cos: "0", tan: "undefined" },

  120: { sin: "√3/2", cos: "-1/2", tan: "-√3" },
  135: { sin: "√2/2", cos: "-√2/2", tan: "-1" },
  150: { sin: "1/2", cos: "-√3/2", tan: "-1/√3" },

  180: { sin: "0", cos: "-1", tan: "0" },

  210: { sin: "-1/2", cos: "-√3/2", tan: "1/√3" },
  225: { sin: "-√2/2", cos: "-√2/2", tan: "1" },
  240: { sin: "-√3/2", cos: "-1/2", tan: "√3" },

  270: { sin: "-1", cos: "0", tan: "undefined" },

  300: { sin: "-√3/2", cos: "1/2", tan: "-√3" },
  315: { sin: "-√2/2", cos: "√2/2", tan: "-1" },
  330: { sin: "-1/2", cos: "√3/2", tan: "-1/√3" }
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