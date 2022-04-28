import { WatchMove } from '../config/WatchMove';
export default class Move {
  control: WatchMove;
  constructor(control: WatchMove) {
    this.control = control;
  }
  start() {
    this.attatchEvents();
    this.drawKeyboard();
  }
  drawKeyboard() {
    const keyboard = document.createElement('div') as HTMLElement;

    keyboard.style.position = 'fixed';
    keyboard.style.bottom = '3%';
    keyboard.style.left = '3%';
    keyboard.style.pointerEvents = 'none';

    keyboard.innerHTML = `
      <button class="kbc-button up" 
        style='
          display: block;
          text-align: center;
          margin: 0 auto !important;
          '>	
            &#8593;
          </button>
      <button class="kbc-button left">  &#8592;</button>
      <button class="kbc-button down">  &#8595;</button>
      <button class="kbc-button right">	&#8594;</button>
    `;
    document.body.append(keyboard);
  }
  attatchEvents() {
    window.addEventListener('keyup', (e) => this.disableMove(e.key));
    window.addEventListener('keydown', (e) => {
      if (!this.control.directions.includes(e.key)) {
        this.control.directions.push(e.key);
      }
    });
  }
  disableMove(key: string) {
    this.control.directions = this.control.directions.filter((item) => item !== key);
  }
}
