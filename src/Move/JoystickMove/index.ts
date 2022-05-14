import { create, JoystickManager } from 'nipplejs';
import { WatchMove } from '../config/WatchMove';

export default class Move {
  control: WatchMove;
  constructor(control: WatchMove) {
    this.control = control;
  }

  start() {
    const manager: JoystickManager = this.drawJoystick();
    this.attatchEvents(manager);
  }

  drawJoystick() {
    const area = document.querySelector('#area') as HTMLElement;
    if (!area) throw new Error("O elemeno 'area' é obrigatório");

    const joystickDiv = document.createElement('div');
    joystickDiv.style.position = 'fixed';
    joystickDiv.style.width = '100vw';
    joystickDiv.style.height = '100vh';

    area.prepend(joystickDiv);

    return create({
      zone: joystickDiv,
      mode: 'dynamic',
      color: 'white',
    });
  }
  attatchEvents(manager: JoystickManager) {
    manager.on('move', (_, data) => {
      if (data.angle.degree > 80 && data.angle.degree < 100) {
        this.control.directions = ['ArrowUp'];
      }
      if (data.angle.degree > 170 && data.angle.degree < 190) {
        this.control.directions = ['ArrowLeft'];
      }
      if (data.angle.degree > 260 && data.angle.degree < 280) {
        this.control.directions = ['ArrowDown'];
      }
      if (data.angle.degree > 350 || data.angle.degree < 10) {
        this.control.directions = ['ArrowRight'];
      }
      if (data.angle.degree > 10 && data.angle.degree < 80) {
        this.control.directions = ['ArrowUp', 'ArrowRight'];
      }
      if (data.angle.degree > 100 && data.angle.degree < 170) {
        this.control.directions = ['ArrowUp', 'ArrowLeft'];
      }
      if (data.angle.degree > 190 && data.angle.degree < 260) {
        this.control.directions = ['ArrowDown', 'ArrowLeft'];
      }
      if (data.angle.degree > 280 && data.angle.degree < 350) {
        this.control.directions = ['ArrowDown', 'ArrowRight'];
      }
    });
    manager.on('end', () => {
      this.control.directions = [];
    });
  }
}
