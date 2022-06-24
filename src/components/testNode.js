import Rete from 'rete';

import { CheckboxControl } from '../controls/CheckboxControl';
import { anySocket } from '../sockets';

export class TestNode extends Rete.Component {
    constructor() {
      super('Test');
    }
  
    builder(node) {
      let out = new Rete.Output('num', 'Number', anySocket);


      node.addControl(new CheckboxControl(this.editor, "num"));
      node.addOutput(out);
    }
  
    worker(node, inputs, outputs) {
      outputs['num'] = node.data.num;
    }
}