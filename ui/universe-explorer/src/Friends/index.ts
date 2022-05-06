import { io } from 'socket.io-client';
import { defaultSize } from '../Move/config/positions';
import { SocketService } from '../WebSocketServices/socket.service';

export default class Friends {
  personagens: HTMLSpanElement[] = [];
  real: HTMLElement;
  socketForReceive: SocketService;
  characterId: string;
  constructor(real: HTMLElement, characterId: string) {
    this.characterId = characterId;
    this.real = real;
    this.socketForReceive = new SocketService(io('https://ws.realtime.eduardoworrel.com'));
  }
  start() {
    this.socketForReceive.setAnyChangeCallback(
      (elements: { id: string; picture: string; y: string; x: string; nome: string }[]) => {
        this.AtualizaPersonagens(elements);
      },
    );
    this.socketForReceive.setLogoutCallback((id) => {
      this.removePersonagem(id);
    });
  }
  removePersonagem(id: string) {
    if (id !== this.characterId) {
      this.personagens.forEach((personagem) => {
        if (personagem.id === id) {
          personagem.remove();
          this.personagens = this.personagens.filter((e) => e.id !== personagem.id);
        }
      });
    }
  }
  AtualizaPersonagens(updatedPersonagens: { id: string; picture: string; y: string; x: string; nome: string }[]) {
    updatedPersonagens.forEach((personagem) => {
      if (personagem.id !== this.characterId) {
        const existente = this.personagens.find((e) => e.id === personagem.id);
        if (!existente) {
          this.desenhaPersonagem(personagem);
        } else {
          if (this.houveAlteracao(existente, personagem)) {
            this.atualizaPersonagem(personagem, existente);
          }
        }
      }
    });
  }
  houveAlteracao(existente: HTMLSpanElement, personagem: { y: string; x: string }) {
    return existente.style.left !== personagem.y + 'px' || existente.style.top !== personagem.x + 'px';
  }
  atualizaPersonagem(
    personagem: { id?: string; picture: any; y: any; x: any; nome?: string },
    inimigo: HTMLSpanElement,
  ) {
    inimigo
      .animate([{ left: personagem.x + 'px' }], {
        duration: 300,
        iterations: 1,
        fill: 'forwards',
      })

      .commitStyles();
    inimigo
      .animate([{ top: personagem.y + 'px' }], {
        duration: 300,
        iterations: 1,
        fill: 'forwards',
      })
      .commitStyles();
    inimigo.style.backgroundImage =
      "url('https://i.pinimg.com/originals/a0/26/1b/a0261b885cfba5a65c675c33327acf5a.png')";
  }
  desenhaPersonagem(personagem: { id: string; picture: string; y: string; x: string; nome: string }) {
    const span = document.createElement(`span`);
    span.id = personagem.id;

    span.style.position = 'absolute';
    span.style.width = defaultSize.width + 'px';
    span.style.height = defaultSize.height + 'px';
    span.style.left = personagem.x + 'px';
    span.style.top = personagem.y + 'px';
    span.style.backgroundSize = '100%';
    span.style.backgroundImage = "url('https://i.pinimg.com/originals/a0/26/1b/a0261b885cfba5a65c675c33327acf5a.png')";

    const legenda = document.createElement('span');
    legenda.innerText = personagem.nome;
    legenda.classList.add('legenda');

    span.append(legenda);

    this.personagens.push(span);
    this.real.appendChild(span);
  }
}
