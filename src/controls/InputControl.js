import Rete from "rete";
import Logger from "js-logger";

import VueInputControl from "./InputControl.vue";

export class InputControl extends Rete.Control {
  constructor(
    emitter,
    key, readonly = false,
    type = 'number', initial = 0,
    placeholder = ''
  ) {
    super(key);
    this.data.render = 'vue';
    this.component = VueInputControl;
    this.props = {
      emitter,
      ikey: key,
      type: type,
      initial: initial,
      placeholder,
      readonly
    };
  }

  setValue(value) {
    Logger.debug('set value (' + this.props.ikey + '): ' + String(value));
    const ctx = this.vueContext || this.props;
    ctx.value = value;
  }
}