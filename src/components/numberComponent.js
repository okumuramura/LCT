import Rete from "rete";
import Logger from "js-logger";

import { numSocket } from "../sockets";
import VueNumberControl from "./NumberControl.vue";

export class NumControl extends Rete.Control {
    constructor(emitter, key, readonly = false, type = 'number', initial = 0) {
      super(key);
      this.data.render = 'vue';
      this.component = VueNumberControl;
      this.props = {
        emitter,
        ikey: key,
        type: type,
        initial: initial,
        readonly
      };
    }
  
    setValue(value) {
      Logger.debug('set value (' + this.props.ikey + '): ' + String(value));
      const ctx = this.vueContext || this.props;
      ctx.value = value;
    }
  }

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