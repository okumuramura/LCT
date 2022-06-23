import Rete from 'rete';

import { NumControl } from '../controls/numberControl';
import { numSocket } from '../sockets';

export class NumberComponent extends Rete.Component {
    constructor() {
      super('Number');
    }
  
    builder(node) {
      let out = new Rete.Output('num', 'Number', numSocket);


      node.addControl(new NumControl(this.editor, "num"));
      node.addOutput(out);
    }
  
    worker(node, inputs, outputs) {
      outputs['num'] = node.data.num;
    }
}