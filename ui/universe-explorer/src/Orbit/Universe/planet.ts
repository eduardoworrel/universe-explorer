import { getAngSpeed } from './config/consts';
import { Moon } from './moon';

export class Planet {
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
  element: any;
  space: number;
  earthImg: string;
  moon: any;
  moons: Moon[] = [];
  constructor(
    name: any,
    widthFactor: any,
    heightFactor: any,
    radius: any,
    angle: any,
    massReference: number,
    theImg: string,
  ) {
    this.earthImg = theImg;

    this.name = name;
    this.widthFactor = widthFactor;
    this.heightFactor = heightFactor;
    this.width = this.widthFactor;
    this.height = this.heightFactor;
    this.radius = radius;
    this.mass = this.width * this.height;
    this.angle = angle;
    this.angSpeed = getAngSpeed(this.radius * 2, massReference);

    this.x = 3025 - this.width / 2 + Math.cos(this.angle) * this.radius;
    this.y = 3025 - this.height / 2 - Math.sin(this.angle) * this.radius;

    const img = document.createElement('img');
    img.src = this.earthImg;
    this.img = img;
    img.style.borderRadius = `50%`;
    img.style.width = `${this.width}px`;
    img.style.height = `${this.height}px`;
    img.style.left = `${this.x}px`;
    img.style.top = `${this.y}px`;
    img.style.position = 'absolute';
    img.classList.add('trigger');
    img.setAttribute('show', name);
    this.element = img;

    setInterval(() => {
      this.angle += this.angSpeed;
      this.x = (3000 - this.width) / 2 + Math.cos(this.angle) * this.radius;
      this.y = (3000 - this.height) / 2 - Math.sin(this.angle) * this.radius;
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      for (const moon of this.moons) {
        moon.update(this.x + this.width / 2, this.y + this.width / 2);
      }
    }, 50);
  }
  addMoon(largura: any, altura: any, angle: any, distancia: number) {
    const moon = new Moon(this.name, largura, altura, angle, this.mass, distancia);
    this.moons.push(moon);
    return moon.element;
  }
}
