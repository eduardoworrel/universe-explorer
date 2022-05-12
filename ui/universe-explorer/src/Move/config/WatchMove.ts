import { io } from 'socket.io-client';
import { SocketService } from '../../WebSocketServices/socket.service';
import { limit, speed } from './positions';

export class WatchMove {
  up: HTMLElement;
  down: HTMLElement;
  left: HTMLElement;
  right: HTMLElement;

  directions: string[] = [];

  position: any;
  socketForSend: SocketService;
  character: HTMLElement;
  constructor(position: any, character: HTMLElement) {
    this.position = position;

    this.socketForSend = new SocketService(io('https://ws.realtime.eduardoworrel.com'));
    character.id = this.randonTokenString();

    this.character = character;
    this.move(character);
  }
  randonTokenString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  updateMove(newX: number, newY: number) {
    this.position.vertical = newX;
    this.position.horizontal = newY;
    this.character
      .animate(
        [
          {
            top: this.position.vertical + speed.unit,
            left: this.position.horizontal + speed.unit,
          },
        ],
        {
          duration: 80,
        },
      )
      .commitStyles();

    this.updatePosition();
  }
  move(p: HTMLElement) {
    setInterval(() => {
      if (this.directions.includes('ArrowUp')) {
        if (this.position.vertical > limit.minX) this.position.vertical -= speed.distance;
        p.style.top = this.position.vertical + speed.unit;
        this.updatePosition();
      }
      if (this.directions.includes('ArrowDown')) {
        if (this.position.vertical < limit.maxX) this.position.vertical += speed.distance;
        p.style.top = this.position.vertical + speed.unit;
        this.updatePosition();
      }
      if (this.directions.includes('ArrowLeft')) {
        if (this.position.horizontal > limit.minY) this.position.horizontal -= speed.distance;
        p.style.left = this.position.horizontal + speed.unit;
        this.updatePosition();
      }
      if (this.directions.includes('ArrowRight')) {
        if (this.position.horizontal < limit.maxY) this.position.horizontal += speed.distance;
        p.style.left = this.position.horizontal + speed.unit;
        this.updatePosition();
      }
    }, speed.ms);
  }
  updatePosition() {
    this.character.scrollIntoView({ block: 'center', inline: 'center', behavior: 'auto' });
    this.socketForSend.atualizaDadosPersonagem({
      id: this.character.id,
      nome: '',
      picture: '',
      x: this.position.horizontal,
      y: this.position.vertical,
    });
  }
  togglePressedKeyboard() {
    this.up = document.querySelector('.up') as HTMLElement;
    this.down = document.querySelector('.down') as HTMLElement;
    this.left = document.querySelector('.left') as HTMLElement;
    this.right = document.querySelector('.right') as HTMLElement;

    setInterval(() => {
      if (this.directions.includes('ArrowUp')) {
        this.up.classList.add('active');
        this.up.classList.add('focus');
      } else {
        this.up.classList.remove('active');
        this.up.classList.remove('focus');
      }
      if (this.directions.includes('ArrowDown')) {
        this.down.classList.add('active');
        this.down.classList.add('focus');
      } else {
        this.down.classList.remove('active');
        this.down.classList.remove('focus');
      }
      if (this.directions.includes('ArrowLeft')) {
        this.left.classList.add('active');
        this.left.classList.add('focus');
      } else {
        this.left.classList.remove('active');
        this.left.classList.remove('focus');
      }
      if (this.directions.includes('ArrowRight')) {
        this.right.classList.add('active');
        this.right.classList.add('focus');
      } else {
        this.right.classList.remove('active');
        this.right.classList.remove('focus');
      }
    }, 100);
  }
}
