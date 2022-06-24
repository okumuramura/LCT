import Rete from 'rete';

import { stringSocket, boolSocket } from '../../sockets';
import { InputControl } from '../../controls/InputControl';
import { CheckboxControl } from '../../controls/CheckboxControl';
import Logger from 'js-logger';


export class ScheduleComponent extends Rete.Component {
    constructor() {
        super('Schedule');
    }

    builder(node) {
        let trigger  = new Rete.Input('trigger', 'trigger', boolSocket);
        let week = new Rete.Input('week', 'week', stringSocket);
        let hour = new Rete.Input('hour', 'hour', stringSocket);
        let seconds = new Rete.Input('seconds', 'seconds', stringSocket);

        trigger.addControl(new CheckboxControl(this.editor, 'trigger', false, false, 'on'));
        week.addControl(new InputControl(this.editor, 'week', false, 'text', '0000000', 'week'));
        hour.addControl(new InputControl(this.editor, 'hour', false, 'text', 'every', 'hour'));
        seconds.addControl(new InputControl(this.editor, 'seconds', false, 'text', '60', 'seconds'));

        node.addInput(trigger);
        node.addInput(week);
        node.addInput(hour);
        node.addInput(seconds);
        node.addOutput(new Rete.Output('triggered', 'triggered', boolSocket));
    }

    worker(node, inputs, outputs) {
        let trigger = inputs['trigger'].length ? inputs['trigger'][0] : node.data.trigger;
        let week = inputs['week'].length ? inputs['week'][0] : node.data.week;
        let hour = inputs['hour'].length ? inputs['hour'][0] : node.data.hour;
        let seconds = inputs['seconds'].length ? inputs['seconds'][0] : node.data.seconds;

        Logger.debug('trigger [%s, %s]', trigger, seconds);
        outputs['triggered'] = trigger;
    }

}