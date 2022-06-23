import Rete from 'rete';
import Logger from 'js-logger';

import VueDropdownControl from './DropdownControl.vue';


export class DropdownControl extends Rete.Control {
    constructor(emmiter, key){
        super(key);
        this.data.render = 'vue';
        this.component = VueDropdownControl;
        this.props = {

        };
    }

    setValue(value) {
        
    }
}