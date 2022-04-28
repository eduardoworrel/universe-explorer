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
  constructor(name: any, widthFactor: any, heightFactor: any, radius: any, angle: any, massReference: number) {
    this.earthImg = 'assets/images/space-elements/slow-earth.gif';

    this.name = name;
    this.widthFactor = widthFactor;
    this.heightFactor = heightFactor;
    this.width = this.widthFactor;
    this.height = this.heightFactor;
    this.radius = radius;
    this.mass = this.width * this.height;
    this.angle = angle;
    this.angSpeed = getAngSpeed(this.radius * 2, massReference);

    this.x = 2850 - this.width / 2 + Math.cos(this.angle) * this.radius;
    this.y = 2850 - this.height / 2 - Math.sin(this.angle) * this.radius;

    const img = document.createElement('img');
    img.src = this.earthImg;
    this.img = img;
    img.style.width = `${this.width}px`;
    img.style.height = `${this.height}px`;
    img.style.left = `${this.x}px`;
    img.style.top = `${this.y}px`;
    img.style.position = 'absolute';
    this.element = img;

    this.moon = new Moon(90, 90, this.angle, this.mass);

    setInterval(() => {
      this.angle += this.angSpeed;
      this.x = 2850 / 2 + Math.cos(this.angle) * this.radius;
      this.y = 2850 / 2 - Math.sin(this.angle) * this.radius;
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      this.moon.update(this.x, this.y);
    }, 50);
  }
}
