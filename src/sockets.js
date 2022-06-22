import Rete from "rete";

export const numSocket = new Rete.Socket('Number');
export const anySocket = new Rete.Socket('Any');

numSocket.combineWith(anySocket);