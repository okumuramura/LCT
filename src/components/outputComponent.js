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
        this.editor.nodes.find(n => n.id == node.id).controls.get('output_view').setValue(inputs['in']);
    }
}