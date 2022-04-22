export interface ServerToClientEvents {
  anyChange: (a: string[][]) => void;
  chatMessage: (a: string) => void;
  logout: (a: string) => void;
}

export interface ClientToServerEvents {
  anyChange: (a: string[]) => void;
  chatMessage: (a: string) => void;
}
