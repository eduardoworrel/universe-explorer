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

    let planet;

    planet = new Planet(
      'mercurio',
      15,
      15,
      this.spacing * 2.5,
      800,
      this.sun.mass,
      'assets/images/space-elements/mercurio.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);

    planet = new Planet(
      'venus',
      35,
      35,
      this.spacing * 3.5,
      800,
      this.sun.mass,
      'assets/images/space-elements/venus.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);

    planet = new Planet(
      'earth',
      40,
      40,
      this.spacing * 4.5,
      800,
      this.sun.mass,
      'assets/images/space-elements/slow-earth.gif',
    );

    this.planets.push(planet);
    this.space.append(planet.element);
    this.space.append(planet.addMoon(10, 10, 800, this.spacing * 0.5));

    planet = new Planet(
      'Marte',
      30,
      30,
      this.spacing * 6,
      800,
      this.sun.mass,
      'assets/images/space-elements/marte.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);
    this.space.append(planet.addMoon(10, 10, 50, this.spacing * 0.3));
    this.space.append(planet.addMoon(13, 13, 50, this.spacing * 0.5));

    planet = new Planet(
      'jupiter',
      90,
      90,
      this.spacing * 8,
      800,
      this.sun.mass,
      'assets/images/space-elements/jupiter.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);
    this.space.append(planet.addMoon(10, 10, 150, this.spacing * 0.2));
    this.space.append(planet.addMoon(13, 13, 250, this.spacing * 1.2));
    this.space.append(planet.addMoon(10, 10, 350, this.spacing * 0.8));
    this.space.append(planet.addMoon(13, 13, 450, this.spacing * 1.1));
    this.space.append(planet.addMoon(10, 10, 550, this.spacing * 0.6));
    this.space.append(planet.addMoon(13, 13, 650, this.spacing * 1));

    planet = new Planet(
      'saturno',
      120,
      120,
      this.spacing * 10,
      800,
      this.sun.mass,
      'assets/images/space-elements/saturno.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);

    planet = new Planet(
      'urano',
      90,
      90,
      this.spacing * 12,
      800,
      this.sun.mass,
      'assets/images/space-elements/urano.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);

    planet = new Planet(
      'netuno',
      90,
      90,
      this.spacing * 14,
      800,
      this.sun.mass,
      'assets/images/space-elements/netuno.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);
  }
  drawStaticSun() {
    const widthFactor = 350;
    const heightFactor = 350;
    this.sun = new Sun(widthFactor, heightFactor, this.planetScale, this.sunImg);
    this.space.append(this.sun.element);
  }
  loadImages() {
    this.sunImg = document.createElement('img');
    this.sunImg.src = 'assets/images/space-elements/estrela.gif';

    this.rocketImg = 'assets/images/rocket.png';
  }
}
