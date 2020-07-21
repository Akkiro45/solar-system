const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
const planetsSize = [8, 12, 15, 10, 43, 40, 30, 20];
const planetsSpeed = [10, 15, 20, 30, 50, 20, 75, 90];
const planetColors = ['#DBCECA', '#8B91A1', '#6B93D6', '#005a8d', '#E36E4B', '#ab604a', '#ace5ee', '#25809f '];

// Selecting canvas
const canvas = document.querySelector('#solar-system');
const planetsCanvas = [];

// Getting context
const ctx = canvas.getContext('2d');
const planetsCtx = [];

planets.forEach((planet, i) => {
  planetsCanvas.push(document.querySelector(`#${planet}`));
  planetsCtx.push(planetsCanvas[i].getContext('2d'));
});

if(!ctx) {
  alert('Your browser does not support canvas!');
}

// Fixing DPI issue
const dpi = window.devicePixelRatio;
const styleWidth = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
const styleHeight = getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);

canvas.setAttribute('width', styleWidth * dpi);
canvas.setAttribute('height', styleHeight * dpi);
planetsCanvas.forEach(canvas => {
  canvas.setAttribute('width', styleWidth * dpi);
  canvas.setAttribute('height', styleHeight * dpi);
});

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Constats for orbit (ellipse)
const initRadiusX = 30;
const initRadiusY = 100;
const distanceOfOrbits = [10, 40, 50, 100, 150, 170, 200, 280];

// Drawing orbits
ctx.setLineDash([2, 2]);
distanceOfOrbits.forEach(dist => {
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, initRadiusX + dist / 3, initRadiusY + dist, Math.PI / 2, 0, 2 * Math.PI);
  ctx.strokeStyle = '#fff'
  ctx.stroke();
});

// Sun
ctx.setLineDash([0, 0]);
ctx.beginPath();
ctx.shadowBlur = 50;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowColor = "orange";
ctx.arc(centerX, centerY, 45, 0, 2 * Math.PI);
ctx.fillStyle  = 'yellow'
ctx.fill();

// Rotating planets
const rotatePlanets = () => {
  planets.forEach((planet, i) => {
    let radiusY = initRadiusY + distanceOfOrbits[i];
    let radiusX = initRadiusX + distanceOfOrbits[i] / 3;
  
    let angle = -360;
    const spin = () => {
      angle *= angle !== 360;
      let t = Math.tan(angle++ / 360 * Math.PI);
      let px = radiusY * (1 - t ** 2) / (1 + t ** 2);
      let py = radiusX * 2 * t / (1 + t ** 2);

      planetsCtx[i].clearRect(0, 0, earth.width, earth.height);
      planetsCtx[i].beginPath();
      planetsCtx[i].shadowBlur = 4;
      planetsCtx[i].shadowColor = planetColors[i];
      planetsCtx[i].arc(px + centerX, py + centerY, planetsSize[i], 0, 2 * Math.PI);
      planetsCtx[i].fillStyle = planetColors[i];
      planetsCtx[i].fill();
      setTimeout(() => {
        requestAnimationFrame(spin);
      }, planetsSpeed[i])
    }
    requestAnimationFrame(spin);
  });  
}

rotatePlanets();