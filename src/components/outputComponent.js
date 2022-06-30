/* eslint-disable */

import Rete from "rete";
import Logger from "js-logger";

import { anySocket } from "../sockets.js";
import { InputControl } from "../controls/InputControl.js";

export class OutputComponent extends Rete.Component {
    constructor() {
        super('Output');
        this.contextSubmenu = ['base'];
    }

    builder(node) {
        let input = new Rete.Input('in', 'in', anySocket);

        node.addInput(input);
        node.addControl(new InputControl(this.editor, 'output_view', true, 'text'))
    }

    worker(node, inputs, outputs) {
        Logger.debug('output node: ', inputs['in']);
        let input;

        if (typeof inputs['in'][0] == 'object') {
            input = JSON.stringify(inputs['in'][0]);
        }
        else {
            input = inputs['in'][0];
        }

        this.editor.nodes.find(n => n.id == node.id).controls.get('output_view').setValue(input);
    }
}