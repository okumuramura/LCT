import Rete from "rete";

import { numSocket } from "../sockets.js";

export class SumComponent extends Rete.Component {
    constructor() {
        super('Sum');
    }

    builder(node) {
        let in1 = new Rete.Input('num1', 'num 1', numSocket);
        let in2 = new Rete.Input('num2', 'num 2', numSocket);
        let out = new Rete.Output('out', 'sum', numSocket)

        node.addInput(in1);
        node.addInput(in2);
        node.addOutput(out);
    }

    worker(node, inputs, outputs){
        let num1 = Number.parseFloat(inputs['num1']);
        let num2 = Number.parseFloat(inputs['num2']);
        outputs['out'] = num1 + num2;
    }
}