import Move from '../Move';
import { defaultSize, position } from '../Move/config/positions';

export default class Character {
  character: HTMLElement;
  constructor(real: HTMLElement) {
    const character = document.createElement('div') as HTMLElement;
    real.append(character);
    this.character = character;
    Move.attach(this.character);
  }

  start() {
    this.drawMe();
  }
  drawMe() {
    this.character.setAttribute(
      'style',
      `
                position:absolute;
                width: ${defaultSize.width}px; 
                height: ${defaultSize.height}px;
                background-image: url('https://i.pinimg.com/originals/a0/26/1b/a0261b885cfba5a65c675c33327acf5a.png');
                background-size: 100%;
                top: ${position.vertical}px;
                left: ${position.horizontal}px;     
                z-index: 9999;   
          `,
    );
    this.character.scrollIntoView({ block: 'center', inline: 'center', behavior: 'auto' });
  
  }
}
