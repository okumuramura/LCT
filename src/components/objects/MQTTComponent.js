import Rete from 'rete';

import { objectSocket, boolSocket, stringSocket, numSocket } from '../../sockets';
import { InputControl } from '../../controls/InputControl';


export class MQTTComponent extends Rete.Component {
    constructor() {
        super('MQTT');
        this.contextSubmenu = [];
    }

    builder(node) {
        let data_input = new Rete.Input('data', 'data', objectSocket);
        let trigger = new Rete.Input('trigger', 'trigger', boolSocket);
        let host = new Rete.Input('host', 'host', stringSocket);
        let port = new Rete.Input('port', 'port', numSocket);
        let user = new Rete.Input('user', 'user', stringSocket);
        let password = new Rete.Input('password', 'password', stringSocket);
        
        host.addControl(new InputControl(this.editor, 'host', false, 'text', '127.0.0.1', 'host'));
        port.addControl(new InputControl(this.editor, 'port', false, 'number', 8883, 'port'));
        user.addControl(new InputControl(this.editor, 'user', false, 'text', '', 'username'));
        password.addControl(new InputControl(this.editor, 'password', false, 'text', '', 'password'));

        node.addInput(data_input);
        node.addInput(trigger);
        node.addInput(host);
        node.addInput(port);
        node.addInput(user);
        node.addInput(password);
    }

    worker(node, inputs, outputs) {

    }
}