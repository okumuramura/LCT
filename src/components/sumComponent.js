import Rete from "rete";

import { numSocket } from "../sockets.js";
import { NumControl } from "./numberComponent.js";

export class SumComponent extends Rete.Component {
    constructor() {
        super('Sum');
    }

    builder(node) {
        let in1 = new Rete.Input('num1', 'num 1', numSocket);
        let in2 = new Rete.Input('num2', 'num 2', numSocket);
        let out = new Rete.Output('out', 'sum', numSocket)

        in1.addControl(new NumControl(this.editor, 'num1'));
        in2.addControl(new NumControl(this.editor, 'num2'));

        node.addInput(in1);
        node.addInput(in2);
        node.addOutput(out);
    }

    worker(node, inputs, outputs){
        let n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
        let n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;
        
        outputs['out'] = n1 + n2;
    }
}