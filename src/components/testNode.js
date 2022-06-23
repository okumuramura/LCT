import Rete from 'rete';

import { DropdownControl } from '../controls/dropdownControl';
import { numSocket } from '../sockets';

export class TestNode extends Rete.Component {
    constructor() {
      super('Test');
    }
  
    builder(node) {
      let out = new Rete.Output('num', 'Number', numSocket);


      node.addControl(new DropdownControl(this.editor, "num"));
      node.addOutput(out);
    }
  
    worker(node, inputs, outputs) {
      outputs['num'] = node.data.num;
    }
}