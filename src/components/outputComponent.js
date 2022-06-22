/* eslint-disable */

import Rete from "rete";

import { anySocket } from "../sockets.js";

export class OutputComponent extends Rete.Component {
    constructor() {
        super('Output');
    }

    builder(node) {
        let input = new Rete.Input('in', 'in', anySocket);

        node.addInput(input);
    }

    worker(node, inputs, outputs) {
        console.log('output node: ', inputs['in']);
    }
}