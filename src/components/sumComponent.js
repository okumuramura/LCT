import Logger from "js-logger";

import { BinaryOperator } from "./binaryOperator";


export class SumComponent extends BinaryOperator {
    constructor() {
        super('Sum', 'num 1', 'num 2', 'sum');
    }

    worker(node, inputs, outputs){
        let n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
        let n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;

        outputs['out'] = n1 + n2;

        Logger.debug('sum node [id:%d] output: %d', node.id, outputs['out']);
    }
}
