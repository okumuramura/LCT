import Rete from 'rete';

import { stringSocket, objectSocket, boolSocket, numSocket } from '../../sockets';
import { InputControl } from '../../controls/InputControl';
import Logger from 'js-logger';


export class APIComponent extends Rete.Component {
    constructor() {
        super('API Request');
        this.contextSubmenu = [];
    }

    builder(node) {
        let host = new Rete.Input('host', 'host', stringSocket);
        let port = new Rete.Input('port', 'port', numSocket);
        let body = new Rete.Input('body', 'body', objectSocket);
        let trigger = new Rete.Input('trigger', 'trigger', boolSocket);

        host.addControl(new InputControl(this.editor, 'host', false, 'text', '127.0.0.1', 'host'));
        port.addControl(new InputControl(this.editor, 'port', false, 'number', 8080, 'port'));

        node.addInput(host);
        node.addInput(port);
        node.addInput(body);
        node.addInput(trigger);

        node.addOutput(new Rete.Output('status', 'status code', numSocket));
    }

    worker(node, inputs, outputs) {
        let host = inputs['host'].length ? inputs['host'][0] : node.data.host;
        let port = inputs['port'].length ? inputs['port'][0] : node.data.port;
        let body = inputs['body'];
        let trigger = inputs['trigger'];

        Logger.debug('api request id:%d [%s:%d, %s]', node.id, host, port, trigger);

        // let response = await fetch(
        //     'https://' + host + ":" + port,
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: body
        //     }
        // )

        // response.json().then(
        //     data => {
        //         this.editor.trigger('process');
        //         outputs['status'] = 200;
        //     }
        // )

        outputs['status'] = 200;
    }
}
