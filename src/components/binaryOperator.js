import Rete from 'rete';
import Logger from 'js-logger';

import { numSocket } from '../sockets';
import { NumControl } from '../controls/numberControl.js';


export class BinaryOperator extends Rete.Component {
    constructor(title, in1 = 'num 1', in2 = 'num 2', out = 'out') {
        super(title);
        this.titles = {
            in1: in1,
            in2: in2,
            out: out
        }
    }

    builder(node) {
        let in1 = new Rete.Input('num1', this.titles.in1, numSocket);
        let in2 = new Rete.Input('num2', this.titles.in2, numSocket);
        let out = new Rete.Output('out', this.titles.out, numSocket)

        in1.addControl(new NumControl(this.editor, 'num1'));
        in2.addControl(new NumControl(this.editor, 'num2'));

        node.addInput(in1);
        node.addInput(in2);
        node.addOutput(out);
    }

    worker(node, inputs, outputs) {
         // empty interface
    }
}