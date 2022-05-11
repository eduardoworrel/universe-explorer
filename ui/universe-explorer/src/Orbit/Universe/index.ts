import { Sun } from './sun';
import { Planet } from './planet';

export default class Universe {
  spacing = 3900 / 30;
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
    this.innerWidth = 3900;
    this.innerHeight = 3900;

    this.space = space;
    this.loadImages();
  }
  start() {
    this.drawStaticSun();

    let planet;

    planet = new Planet(
      'mercurio',
      25,
      25,
      this.spacing * 2.9,
      800,
      this.sun.mass,
      'assets/images/space-elements/mercurio.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);

    planet = new Planet(
      'venus',
      45,
      45,
      this.spacing * 3.5,
      800,
      this.sun.mass,
      'assets/images/space-elements/venus.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);

    planet = new Planet(
      'earth',
      55,
      55,
      this.spacing * 4.5,
      800,
      this.sun.mass,
      'assets/images/space-elements/slow-earth.gif',
    );

    this.planets.push(planet);
    this.space.append(planet.element);
    this.space.append(planet.addMoon(10, 10, 800, this.spacing * 0.5));

    planet = new Planet(
      'marte',
      40,
      40,
      this.spacing * 6,
      800,
      this.sun.mass,
      'assets/images/space-elements/marte.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);
    this.space.append(planet.addMoon(7, 7, 50, this.spacing * 0.3));
    this.space.append(planet.addMoon(10, 10, 150, this.spacing * 0.4));

    planet = new Planet(
      'jupiter',
      100,
      100,
      this.spacing * 8,
      800,
      this.sun.mass,
      'assets/images/space-elements/jupiter.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);
    this.space.append(planet.addMoon(3, 3, 250, this.spacing * 1.1));
    this.space.append(planet.addMoon(10, 10, 350, this.spacing * 0.9));
    this.space.append(planet.addMoon(7, 7, 450, this.spacing * 1.1));
    this.space.append(planet.addMoon(5, 5, 650, this.spacing * 1));

    planet = new Planet(
      'saturno',
      220,
      220,
      this.spacing * 11,
      800,
      this.sun.mass,
      'assets/images/space-elements/saturno.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);

    planet = new Planet(
      'urano',
      80,
      80,
      this.spacing * 14,
      800,
      this.sun.mass,
      'assets/images/space-elements/urano.gif',
    );
    this.planets.push(planet);
    this.space.append(planet.element);

    planet = new Planet(
      'netuno',
      65,
      65,
      this.spacing * 16,
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

    this.sunImg.style.borderRadius = `50%`;
    this.sunImg.src = 'assets/images/space-elements/estrela.gif';

    this.rocketImg = 'assets/images/rocket.png';
  }
}
