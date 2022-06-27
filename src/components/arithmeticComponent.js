import Logger from "js-logger";

import { BinaryOperator } from "./binaryOperator";
import { DropdownControl } from "../controls/DropdownControl";

export class ArithmeticComponent extends BinaryOperator {
    constructor() {
        super('Arithmetic');
        this.contextSubmenu = ['arithmetic'];
    }

    builder(node) {
        super.builder(node);
        node.addControl(new DropdownControl(
            this.editor,
            'operation',
            ['+', '-', '/', '*'],
            '+',
            false,
            'operation'
        ));
    }

    worker(node, inputs, outputs) {
        let n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
        let n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;

        let result;

        switch (node.data.operation) {
            case '+':
                result = n1 + n2;
                break;
            case '-':
                result = n1 - n2;
                break;
            case '/':
                result = n2 ? n1 / n2 : NaN;
                break;
            case '*':
                result = n1 * n2;
                break;
        }

        outputs['out'] = result;
    } 
}