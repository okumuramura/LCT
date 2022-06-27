import Rete from 'rete';

import { boolSocket, numSocket, objectSocket, stringSocket } from '../../sockets';
import { InputControl } from '../../controls/InputControl';
import { CheckboxControl } from '../../controls/CheckboxControl';
import Logger from 'js-logger';


export class MercuryComponent extends Rete.Component {
    constructor() {
        super('Mercury');
        this.contextSubmenu = [];
    }

    builder(node) {
        let trigger = new Rete.Input('trigger', 'trigger', boolSocket);
        let delay = new Rete.Input('delay', 'week', numSocket);
        let port = new Rete.Input('port', 'serial port', stringSocket);
        let bytesize = new Rete.Input('bytesize', 'serial bytesize', numSocket);
        let timeout = new Rete.Input('timeout', 'serial timeout', numSocket);

        trigger.addControl(new CheckboxControl(this.editor, 'trigger', false, false, 'on'));
        delay.addControl(new InputControl(this.editor, 'delay', false, 'number', 500, 'delay'));
        port.addControl(new InputControl(this.editor, 'port', false, 'text', '/dev/ttyUSB1', ''));
        bytesize.addControl(new InputControl(this.editor, 'bytesize', false, 'number', 16, 'bytesize'));
        timeout.addControl(new InputControl(this.editor, 'timeout', false, 'number', 3000, 'timeout'));

        node.addInput(trigger);
        node.addInput(delay);
        node.addInput(port);
        node.addInput(bytesize);
        node.addInput(timeout);

        node.addOutput(new Rete.Output('object', 'Mercury object', objectSocket));
    }

    worker(node, inputs, outputs) {
        let trigger = inputs['trigger'].length ? inputs['trigger'][0] : node.data.trigger;
        let delay = inputs['delay'].length ? inputs['delay'][0] : node.data.delay;
        let port = inputs['port'].length ? inputs['port'][0] : node.data.port;
        let bytesize = inputs['bytesize'].length ? inputs['bytesize'][0] : node.data.bytesize;
        let timeout = inputs['timeout'].length ? inputs['timeout'][0] : node.data.timeout;

        let output = {
            'trigger': trigger,
            'delay': delay,
            'serialPort': port,
            'serialBytesize': bytesize,
            'serialTimeout': timeout
        }

        Logger.debug('mercury [id=%d]: ', node.id, output);
        outputs['object'] = output;
    }
}