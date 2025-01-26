export interface Game {
    id: string;
    title: string;
    code: string;
    summary: string;
    createdAt: Date;
  }
  
  export interface Message {
    content: string;
    isBot: boolean;
  }