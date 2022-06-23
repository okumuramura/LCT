import Rete from "rete";
import Logger from "js-logger";

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