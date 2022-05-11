
import {setAlertStyle} from '../../Interactive'
import {limit} from '../../Move/config/positions'
export class Sun {
  width: number;
  height: number;
  mass: number;
  x: number;
  y: number;
  img: any;
  element: HTMLImageElement;
  constructor(widthFactor: number, heightFactor: number, planetScale: number, sunImg: HTMLImageElement) {
    this.width = widthFactor * planetScale;
    this.height = heightFactor * planetScale;
    this.mass = this.width * this.height;

    this.x = (limit.maxX - this.width) / 2;
    this.y = (limit.maxY - this.height) / 2;
    this.img = sunImg;
    sunImg.classList.add('trigger');
    sunImg.setAttribute('show', 'sun');

    sunImg.style.width = `${this.width}px`;
    sunImg.style.height = `${this.height}px`;
    sunImg.style.left = `${this.x}px`;
    sunImg.style.top = `${this.y}px`;
    sunImg.style.position = 'absolute';
    setAlertStyle('sun',sunImg.src)
    this.element = sunImg;
  }
}
