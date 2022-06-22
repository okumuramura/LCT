import Rete from "rete";

import { numSocket } from "../sockets";
import VueNumberControl from "./NumberControl.vue";

export class NumControl extends Rete.Control {
    constructor(emitter, key, readonly = false) {
      super(key);
      this.data.render = 'vue';
      this.component = VueNumberControl;
      this.props = {
        emitter,
        ikey: key,
        type: "number",
        value: 0,
        readonly,
        change: () => this.onChange()
      };
      this.setValue(0);
      this.value = 0;
    }
  
    setValue(value) {
      const ctx = this.vueContext || this.props;
      ctx.value = value;
    }
  
    onChange() {}
  }

export class NumberComponent extends Rete.Component {
    constructor() {
      super('Number');
    }
  
    builder(node) {
      let out = new Rete.Output('num', 'Number', numSocket);

      node.addOutput(out);
      node.addControl(new NumControl(this.editor, "num"))
    }
  
    worker(node, inputs, outputs) {
      outputs['num'] = node.data.num;
    }
}