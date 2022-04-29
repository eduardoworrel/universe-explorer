import { getAngSpeed } from './config/consts';
export class Moon {
  radius: any;
  width: any;
  height: any;
  x: any;
  y: any;
  element: any;
  moonImg = 'assets/images/space-elements/lua.gif';
  angle: any;
  angSpeed: any;
  mass: number;
  constructor(widthFactor: any, heightFactor: any, angle: any, massReference: number, distancia: number) {
    this.angle = angle;
    this.angSpeed = getAngSpeed(distancia, massReference * 2);
    this.width = widthFactor;
    this.height = heightFactor;
    this.radius = distancia;
    this.mass = this.width * this.height;

    const moon = document.createElement('img');
    moon.src = this.moonImg;
    moon.style.width = `${this.width}px`;
    moon.style.height = `${this.height}px`;
    moon.style.left = `${this.x}px`;
    moon.style.top = `${this.y}px`;
    moon.style.position = 'absolute';
    this.element = moon;
  }
  update(x: any, y: any) {
    this.angle += this.angSpeed;
    this.x = x + this.width + Math.cos(this.angle) * this.radius;
    this.y = y + this.height - Math.sin(this.angle) * this.radius;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}
