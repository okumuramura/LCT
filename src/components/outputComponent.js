/* eslint-disable */

import Rete from "rete";
import Logger from "js-logger";

import { anySocket } from "../sockets.js";
import { NumControl } from "../controls/numberControl.js";

export class OutputComponent extends Rete.Component {
    constructor() {
        super('Output');
    }

    builder(node) {
        let input = new Rete.Input('in', 'in', anySocket);
        
        node.addInput(input);
        node.addControl(new NumControl(this.editor, 'output_view', true, 'text'))
    }

    worker(node, inputs, outputs) {
        Logger.debug('output node: ', inputs['in']);
        this.editor.nodes.find(n => n.id == node.id).controls.get('output_view').setValue(inputs['in']);
    }
}