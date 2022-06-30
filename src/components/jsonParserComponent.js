import Rete, { NodeEditor } from 'rete';
import Logger from 'js-logger';

import { objectSocket, anySocket, stringSocket, numSocket, boolSocket } from '../sockets';
import { DropdownControl } from '../controls/DropdownControl';


export class JsonParserComponent extends Rete.Component {
    constructor() {
        super('JSON Parser');
        this.contextSubmenu = ['base'];

        this.socket_types = {
            'number': numSocket,
            'string': stringSocket,
            'boolean': boolSocket,
            'object': objectSocket
        }
    }

    builder(node) {
        let input = new Rete.Input('in', 'json', objectSocket);
        let field = new Rete.Input('field', 'field', stringSocket);
        let output = new Rete.Output('value', 'value', anySocket);

        field.addControl(new DropdownControl(this.editor, 'field', [], undefined, false, 'field'));

        node.addInput(input);
        node.addInput(field);
        node.addOutput(output);
    }

    worker(node, inputs, outputs) {
        let this_node = this.editor.nodes.find(n => n.id == node.id);
        let ctrl = this_node.inputs.get('field').control;
        let input = inputs['in'].length ? inputs['in'][0] : undefined;
        let field = inputs['field'].length ? inputs['field'][0] : node.data.field;

        let output = undefined;

        if (typeof input === 'object') {
            ctrl.updateOptions(Object.keys(input));
            output = input[field];
            
            let output_socket = this_node.outputs.get('value');
            
            output_socket.socket = this.socket_types[typeof output] || anySocket;
            this_node.update();
        }

        Logger.debug('json parser [id = %d]: data[\'%s\'] = %s', node.id, field, output);

        outputs['value'] = output;
    }
}