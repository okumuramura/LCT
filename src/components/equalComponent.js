import Rete from 'rete';

import { anySocket, boolSocket } from '../sockets';
import { InputControl } from '../controls/InputControl';
import Logger from 'js-logger';


export class EqualComponent extends Rete.Component {
    constructor() {
        super('Equal');
        this.contextSubmenu = ['logic'];
    }

    builder(node) {
        let in1 = new Rete.Input('in1', 'value 1', anySocket);
        let in2 = new Rete.Input('in2', 'value 2', anySocket);
        let out = new Rete.Output('out', 'result', boolSocket);
        
        in1.addControl(new InputControl(this.editor, 'in1', false, 'text', ''));
        in2.addControl(new InputControl(this.editor, 'in2', false, 'text', ''));

        node.addInput(in1);
        node.addInput(in2);
        node.addOutput(out);
    }

    worker(node, inputs, outputs) {
        let in1 = inputs['in1'].length ? inputs['in1'][0] : node.data.in1;
        let in2 = inputs['in2'].length ? inputs['in2'][0] : node.data.in2;


        outputs['out'] = (
            in1 == in2 
            && !(in1 === undefined || in2 === undefined)
        );

        Logger.debug('equal (%s = %s): %s', in1, in2, outputs['out']);
    }
}