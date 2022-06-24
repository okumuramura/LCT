import Rete from 'rete';

import { InputControl } from '../controls/InputControl';
import { numSocket } from '../sockets';

export class NumberComponent extends Rete.Component {
    constructor() {
      super('Number');
      this.contextSubmenu = ['base'];
    }
  
    builder(node) {
      let out = new Rete.Output('num', 'number', numSocket);


      node.addControl(new InputControl(this.editor, "num"));
      node.addOutput(out);
    }
  
    worker(node, inputs, outputs) {
      outputs['num'] = node.data.num;
    }
}