var sunImg;
var earthImg;
var rocketImg;
var arrowImg;

var G;
var usePlanetGrav;
var useCollisions;
var innerWidth;
var innerHeight;
var spacing;
var planetScale;
var planets;
var rockets;
var rocketCounter;
var launchVel;
var launchAngle;
let earth;
let theSun;

export function start() {
  innerWidth = window.innerWidth;
  innerHeight = window.innerHeight;
  spacing = innerWidth / 30; // spacing between planets
  planets = []; // array to keep track of planets
  rockets = {}; // dictionary to keep track of rockets
  rocketCounter = 0; // to give each rocket unique ID
  launchAngle = 0; // gets incremeneted in update function

  // control panel variables
  G = (document.getElementById('gravConst') as HTMLInputElement).value;
  usePlanetGrav = (document.getElementById('gravPlanets') as HTMLInputElement).checked;
  useCollisions = (document.getElementById('collisions') as HTMLInputElement).checked;
  planetScale = (document.getElementById('planetScale') as HTMLInputElement).value;
  launchVel = (document.getElementById('launchVel') as HTMLInputElement).value;

  loadImages();
  area.start();

  theSun = new sun(124, 124, sunImg);
  earth = new planet('Earth', 28, 28, earthImg, spacing * 7, 0);

  setInterval(update, 20);

  var inst = document.getElementById('inst') as HTMLDivElement; // becomes hidden when pressed space or clicked
  inst.style.display = 'block'; // show for now

  // creates new rocket when spacebar pressed
  document.addEventListener('keydown', function (e) {
    if (e.which == 32) {
      new rocket(launchAngle);
      inst.style.display = 'none'; // hides instructions
    }
  });
  // creates new rocket when mouse clicked (on canvas)
  const canvasElem = document.querySelector('canvas') as HTMLCanvasElement;
  canvasElem.addEventListener('mousedown', function () {
    new rocket(launchAngle);
    inst.style.display = 'none'; // hides instructions
  });
}

// canvas element
var area = {
  canvas: document.createElement('canvas') as HTMLCanvasElement,
  start: function () {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  clear: function () {
    this.canvas.getContext('2d')?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

// object for drawing sun
class sun {
  widthFactor: any;
  heightFactor: any;
  width: number;
  height: number;
  mass: number;
  x: number;
  y: number;
  img: any;
  constructor(widthFactor, heightFactor, img) {
    this.widthFactor = widthFactor;
    this.heightFactor = heightFactor;
    this.width = this.widthFactor * planetScale;
    this.height = this.heightFactor * planetScale;
    this.mass = this.width * this.height;
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.img = img;
    let ctx = area.canvas.getContext('2d');
    ctx?.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
  update() {
    // updates scale
    this.width = this.widthFactor * planetScale;
    this.height = this.heightFactor * planetScale;

    let ctx = area.canvas.getContext('2d');
    ctx?.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
}

// object for drawing planets
class planet {
  name: any;
  widthFactor: any;
  heightFactor: any;
  width: number;
  height: number;
  radius: any;
  mass: number;
  angle: any;
  angSpeed: number;
  x: number;
  y: number;
  img: any;
  constructor(name, widthFactor, heightFactor, img, radius, angle) {
    planets.push(this);
    this.name = name;
    this.widthFactor = widthFactor;
    this.heightFactor = heightFactor;
    this.width = this.widthFactor * planetScale;
    this.height = this.heightFactor * planetScale;
    this.radius = radius;
    this.mass = this.width * this.height;
    this.angle = angle; // angle counterclockwise from horizontal in radians
    this.angSpeed = getAngSpeed(radius); // angular speed of planet in rads / update
    this.x = innerWidth / 2 + Math.cos(this.angle) * this.radius;
    this.y = innerHeight / 2 - Math.sin(this.angle) * this.radius;
    this.img = img;
    let ctx = area.canvas.getContext('2d');
    ctx?.drawImage(
      this.img,
      (innerWidth - this.width) / 2 + this.radius,
      (innerHeight - this.height) / 2,
      this.width,
      this.height,
    );
  }
  update() {
    // updates speed (from changes in G)
    this.angSpeed = getAngSpeed(this.radius);

    // updates scale
    this.width = this.widthFactor * planetScale;
    this.height = this.heightFactor * planetScale;

    this.angle += this.angSpeed;
    this.x = innerWidth / 2 + Math.cos(this.angle) * this.radius;
    this.y = innerHeight / 2 - Math.sin(this.angle) * this.radius;

    let ctx = area.canvas.getContext('2d');
    ctx?.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
}

// gets angular speed from radius
function getAngSpeed(r) {
  let mu = G * theSun.mass; // standard gravitational parameter
  return Math.sqrt(mu) * Math.pow(r, -1.5); // derived angular velocity formula for circular orbit
}

// object for drawing rockets
class rocket {
  id: any;
  width: number;
  height: number;
  launchVel: any;
  launchAngle: any;
  x: any;
  y: any;
  img: any;
  xVel: number;
  yVel: number;
  constructor(launchAngle) {
    rocketCounter++;
    this.id = rocketCounter;
    rockets[this.id] = this;
    this.width = 16;
    this.height = 16;
    this.launchVel = launchVel;
    this.launchAngle = launchAngle;
    let launchRadius = 32; // radius from Earth that the rockets start from
    this.x = earth.x + Math.cos(this.launchAngle) * launchRadius;
    this.y = earth.y + Math.sin(this.launchAngle) * launchRadius;
    this.img = rocketImg;
    let earthVel = earth.angSpeed * earth.radius; // magnitude of Earth's velocity in pixels / update
    this.xVel = -1 * earthVel * Math.sin(earth.angle) + this.launchVel * Math.cos(this.launchAngle); // velocity in x direction (right is positive)
    this.yVel = -1 * earthVel * Math.cos(earth.angle) + this.launchVel * Math.sin(this.launchAngle); // velocity in y direction (down is positive)

    let ctx = area.canvas.getContext('2d');

    // changes ctx so rockets are drawn at an angle
    ctx = area.canvas.getContext('2d');
    ctx?.save();
    ctx?.translate(this.x, this.y);
    ctx?.rotate(this.launchAngle + Math.PI / 2);
    ctx?.drawImage(this.img, -(this.width / 2), -(this.height / 2), this.width, this.height);
    ctx?.restore();
  }
  update() {
    let xAccel = 0;
    let yAccel = 0;

    // distance to the sun
    let xDist = theSun.x - this.x;
    let yDist = theSun.y - this.y;

    // accelerations from the sun, derived from Newton's formula for gravitational force
    let mult = G * theSun.mass * Math.pow(Math.pow(xDist, 2) + Math.pow(yDist, 2), -1.5); // multiplier in formula used to find both accelerations
    xAccel += mult * xDist;
    yAccel += mult * yDist;

    if (usePlanetGrav) {
      for (let p of planets) {
        // distance to each planet
        xDist = p.x - this.x;
        yDist = p.y - this.y;

        // accelerations from each planet
        mult = G * p.mass * Math.pow(Math.pow(xDist, 2) + Math.pow(yDist, 2), -1.5); // multiplier in formula used to find both accelerations
        xAccel += mult * xDist;
        yAccel += mult * yDist;
      }
    }

    // updates velocities from accelerations
    this.xVel += xAccel;
    this.yVel += yAccel;

    // updates position from velocities
    this.x += this.xVel;
    this.y += this.yVel;

    // if off canvas, remove from dictionary
    if (this.x < 0 || this.x > innerWidth || this.y < 0 || this.y > innerHeight) {
      delete rockets[this.id];
    }

    if (useCollisions) {
      // if colliding with the sun, remove from dictionary
      if (Math.abs(theSun.x - this.x) < theSun.width / 2 && Math.abs(theSun.y - this.y) < theSun.height / 2) {
        delete rockets[this.id];
      }

      // if colliding with a planet, remove from dictionary
      for (let p of planets) {
        if (Math.abs(p.x - this.x) < p.width / 2 && Math.abs(p.y - this.y) < p.height / 2) {
          delete rockets[this.id];
        }
      }
    }

    let ctx = area.canvas.getContext('2d');
    ctx?.save();
    ctx?.translate(this.x, this.y);
    ctx?.rotate(this.launchAngle + Math.PI / 2);
    ctx?.drawImage(this.img, -(this.width / 2), -(this.height / 2), this.width, this.height);
    ctx?.restore();
  }
}

// controls how the page updates each cycle
function update() {
  // update values from inputs
  G = (document.getElementById('gravConst') as HTMLInputElement).value;
  if (G < 0) {
    // prevents bug from edge case
    G = 0;
  }
  usePlanetGrav = (document.getElementById('gravPlanets') as HTMLInputElement).checked;
  useCollisions = (document.getElementById('collisions') as HTMLInputElement).checked;
  planetScale = (document.getElementById('planetScale') as HTMLInputElement).value;
  launchVel = (document.getElementById('launchVel') as HTMLInputElement).value;

  area.clear();
  theSun.update();
  for (let p of planets) {
    p.update();
  }
  for (let k in rockets) {
    rockets[k].update();
  }

  launchAngle += 0.02; // increases launch angle, units are rad / update
  drawArrow();
}

// draws the arrow that shows launch angle
function drawArrow() {
  let radius = 28 * planetScale; // radius from Earth of arrow
  let width = 46;
  let height = 46;

  let xToDraw = earth.x + Math.cos(launchAngle) * radius;
  let yToDraw = earth.y + Math.sin(launchAngle) * radius;

  let ctx = area.canvas.getContext('2d');
  ctx?.save();
  ctx?.translate(xToDraw, yToDraw);
  ctx?.rotate(launchAngle + Math.PI / 2);
  ctx?.drawImage(arrowImg, -(width / 2), -(height / 2), width, height);
  ctx?.restore();
}

function loadImages() {
  sunImg = document.createElement('img');
  sunImg.src = 'assets/images/space-elements/estrela.gif';

  earthImg = document.createElement('img');
  earthImg.src = 'assets/images/space-elements/terra.gif';

  rocketImg = document.createElement('img');
  rocketImg.src = 'assets/images/rocket.png';

  arrowImg = document.createElement('img');
  arrowImg.src = 'assets/images/space-elements/lua.gif';
}
