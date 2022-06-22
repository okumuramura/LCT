import Rete from "rete";

import { numSocket } from "../sockets.js";

export class MinComponent extends Rete.Component {
    constructor() {
        super('Min');
    }

    builder(node) {
        let input1 = new Rete.Input('in1', 'num 1', numSocket);
        let input2 = new Rete.Input('in2', 'num 2', numSocket);

        let output = new Rete.Output('out', 'min', numSocket);

        node.addInput(input1);
        node.addInput(input2);
        node.addOutput(output);
    }

    async worker(node, inputs, outputs) {
        outputs['out'] = Math.min(inputs['in1'], inputs['in2']);
    }
}
