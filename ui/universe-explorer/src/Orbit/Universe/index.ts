import { Sun } from './sun';
import { Planet } from './planet';

export default class Universe {
  spacing = 3000 / 30;
  planets: Planet[] = [];
  rockets = {};
  rocketCounter = 0;
  launchAngle = 0;

  usePlanetGrav = false;
  useCollisions = false;
  planetScale = 1;
  launchVel = 10;
  sun: Sun;
  sunImg: HTMLImageElement;

  rocketImg: string;

  space: HTMLDivElement;
  innerWidth: number;
  innerHeight: number;
  constructor(space: HTMLDivElement) {
    this.innerWidth = 3000;
    this.innerHeight = 3000;

    this.space = space;
    this.loadImages();
  }
  start() {
    this.drawStaticSun();

    let planet = new Planet(
      'earth',
      150,
      150,
      this.spacing * 7.5,
      150,
      this.sun.mass,
      'assets/images/space-elements/slow-earth.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);
    this.space.append(planet.addMoon(40, 40, 50, this.spacing * 2));

    planet = new Planet('planets', 60, 60, this.spacing * 4, 0, this.sun.mass, 'assets/images/space-elements/dry.gif');
    this.planets.push(planet);
    this.space.append(planet.element);
    this.space.append(planet.addMoon(20, 20, 50, this.spacing * 0.5));

    planet = new Planet(
      'blackhole',
      360,
      360,
      this.spacing * 12,
      0,
      this.sun.mass,
      'assets/images/space-elements/buraco-negro.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);

    planet = new Planet(
      'planets',
      360,
      360,
      this.spacing * 12,
      800,
      this.sun.mass,
      'assets/images/space-elements/gigant.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);
    this.space.append(planet.addMoon(50, 50, 50, this.spacing * 1.7));
    this.space.append(planet.addMoon(70, 70, 150, this.spacing * 2));
  }
  drawStaticSun() {
    const widthFactor = 750;
    const heightFactor = 750;
    this.sun = new Sun(widthFactor, heightFactor, this.planetScale, this.sunImg);
    this.space.append(this.sun.element);
  }
  loadImages() {
    this.sunImg = document.createElement('img');
    this.sunImg.src = 'assets/images/space-elements/estrela.gif';

    this.rocketImg = 'assets/images/rocket.png';
  }
}
