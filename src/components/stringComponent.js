import Rete from 'rete';

import { stringSocket } from '../sockets';
import { InputControl } from '../controls/InputControl';


export class StringComponent extends Rete.Component {
    constructor() {
        super('String');
    }

    builder(node) {
        node.addControl(new InputControl(this.editor, 'input', false, 'text', ''));
        node.addOutput(new Rete.Output('out', 'output', stringSocket));
    }

    worker(node, inputs, outputs) {
        outputs['out'] = node.data.input;
    }
}