import Logger from 'js-logger';
import Rete from 'rete';

import VueCheckboxControl from './CheckboxControl.vue';


export class CheckboxControl extends Rete.Control {
    constructor(
        emitter,
        key, readonly = false,
        initial = false,
        label = ''
    ) {
        super(key);
        this.data.render = 'vue';
        this.component = VueCheckboxControl;
        this.props = {
            emitter,
            ikey: key,
            initial: initial,
            readonly,
            label
        };
    }

    setValue(value) {
        Logger.debug('set value (' + this.props.ikey + '): ' + String(value));
        const ctx = this.vueContext || this.props;
        ctx.checked = value;
    }
}