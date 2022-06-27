import Rete from 'rete';

import { CheckboxControl } from '../controls/CheckboxControl';
import { boolSocket } from '../sockets';

export class BooleanComponent extends Rete.Component {
    constructor() {
        super('Boolean');
        this.contextSubmenu = ['base'];
    }

    builder(node) {
        let out = new Rete.Output('value', 'value', boolSocket);

        node.addControl(new CheckboxControl(this.editor, 'value', false, false, 'value'));

        node.addOutput(out);
    }

    worker(node, inputs, outputs) {
        outputs['value'] = node.data.value;
    }
}