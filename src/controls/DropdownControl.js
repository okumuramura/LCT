import Rete from 'rete';
import Logger from 'js-logger';

import VueDropdownControl from './DropdownControl.vue';


export class DropdownControl extends Rete.Control {
    constructor(emitter, key, options, initial, readonly = false, label = '') {
        super(key);
        this.data.render = 'vue';
        this.component = VueDropdownControl;
        this.props = {
            emitter,
            ikey: key,
            options,
            initial,
            readonly,
            label
        };
    }

    setValue(value) {
        const ctx = this.vueContext || this.props;
        ctx.value = value;
    }
}