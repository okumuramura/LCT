import Rete from 'rete';

import { stringSocket, numSocket, objectSocket } from '../sockets';
import { InputControl } from '../controls/InputControl';

export class ObjectComponent extends Rete.Component {
    constructor() {
        super('JSONObject');
    }

    builder(node) {
        let name = new InputControl(this.editor, 'name', false, 'text', '', 'ok?');

        node.addControl(name);
        node.addOutput(new Rete.Output('out', 'obj', objectSocket));
    }

    worker(node, inputs, outputs) {
        outputs['out'] = node.data.name;
    }
}