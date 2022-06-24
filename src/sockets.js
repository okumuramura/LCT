import Rete from "rete";

export const numSocket = new Rete.Socket('Number');
export const anySocket = new Rete.Socket('Any');
export const objectSocket = new Rete.Socket('Object');
export const stringSocket = new Rete.Socket('String');
export const boolSocket = new Rete.Socket('Bool');

numSocket.combineWith(anySocket);
objectSocket.combineWith(anySocket);
stringSocket.combineWith(anySocket);
boolSocket.combineWith(anySocket);

numSocket.combineWith(stringSocket);