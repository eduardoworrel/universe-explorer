import { Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from './interfaces/socket.io';
export class SocketService {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  constructor(socket: Socket<ServerToClientEvents, ClientToServerEvents>) {
    this.socket = socket;
  }

  atualizaDadosPersonagem(PreparePersonagem: { id: string; nome: string; picture: string; x: number; y: number }) {
    const personagem = Object.values(PreparePersonagem) as string[];
    this.socket.emit('anyChange', personagem);
  }
  SendChat(mensage: any) {
    this.socket.emit('chatMessage', JSON.stringify(mensage));
  }
  setLogoutCallback(callback) {
    this.socket.on('logout', (msg) => {
      callback(msg);
    });
  }
  setAnyChangeCallback(callback: (json: any) => void) {
    this.socket.on('anyChange', (msg: string[][]) => {
      const json = msg.map((arr) => {
        return {
          id: arr[0],
          nome: arr[1],
          picture: arr[2],
          x: arr[3],
          y: arr[4],
        };
      });

      callback(json);
    });
  }
  setChatChangeCallback(callback: (msg: string) => void) {
    this.socket.on('chatMessage', (msg: string) => {
      callback(JSON.parse(msg));
    });
  }
}
