/* eslint-disable */

import Rete from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import KeyboardPlugin from 'rete-keyboard-plugin';
import MinimapPlugin from 'rete-minimap-plugin';
import HistoryPlugin from 'rete-history-plugin';
// import AreaPlugin from "rete-area-plugin";

import { OutputComponent } from "./components/outputComponent.js";
import { NumberComponent } from "./components/numberComponent.js"
import { BooleanComponent } from "./components/booleanOperator.js";
import { MinComponent } from "./components/minComponent.js"
import { ObjectComponent } from "./components/objectComponent.js";
import { StringComponent } from "./components/stringComponent.js";
import { EqualComponent } from "./components/equalComponent.js";
import { ArithmeticComponent } from "./components/arithmeticComponent.js";
import { JsonParserComponent } from "./components/jsonParserComponent.js";

import { ScheduleComponent } from "./components/objects/scheduleComponent.js";
import { APIComponent } from "./components/objects/APIComponent.js";
import { MercuryComponent } from "./components/objects/Mercury.js";
import { MQTTComponent } from "./components/objects/MQTTComponent.js";

// import { TestNode } from "./components/testNode.js";

import Logger from "js-logger";

const testData = require('./editor.json');

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


export async function createEditor() {

    const container = document.querySelector('#rete');
    const json_output = document.querySelector('#json-output')
    const editor = new Rete.NodeEditor('demo@0.1.0', container);

    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(KeyboardPlugin);
    editor.use(MinimapPlugin);
    editor.use(HistoryPlugin, { keyboard: true });
    editor.use(ContextMenuPlugin, {
        searchBar: false,
        delay: 0,
        items: {

        },
        allocate(component) {
            if (component.contextSubmenu === undefined)
                return [];
            else
                return component.contextSubmenu;
        },
        rename(component) {
            return component.name;
        }
    })

    const numComponent = new NumberComponent();
    const boolComponent = new BooleanComponent();
    const minComponent = new MinComponent();
    const outputComponent = new OutputComponent();
    const objectComponent = new ObjectComponent();
    const stringComponent = new StringComponent();
    const equalComponent = new EqualComponent();
    const arithmeticComponent = new ArithmeticComponent();
    const scheduleComponent = new ScheduleComponent();
    const apiComponent = new APIComponent();
    const mercuryComponent = new MercuryComponent();
    const mqttComponent = new MQTTComponent();
    const jsonParserComponent = new JsonParserComponent();

    // const testNode = new TestNode();

    editor.register(numComponent);
    editor.register(boolComponent);
    editor.register(minComponent);
    editor.register(outputComponent);
    editor.register(objectComponent);
    editor.register(stringComponent);
    editor.register(apiComponent);
    editor.register(mercuryComponent);
    editor.register(scheduleComponent);
    editor.register(equalComponent);
    editor.register(arithmeticComponent);
    editor.register(mqttComponent);
    editor.register(jsonParserComponent);
    // editor.register(testNode);

    const engine = new Rete.Engine('demo@0.1.0');
    engine.register(numComponent);
    engine.register(boolComponent);
    engine.register(minComponent);
    engine.register(outputComponent);
    engine.register(objectComponent);
    engine.register(stringComponent);
    engine.register(equalComponent);
    engine.register(arithmeticComponent);
    engine.register(jsonParserComponent);
    engine.register(apiComponent);
    engine.register(scheduleComponent);
    engine.register(mercuryComponent);
    engine.register(mqttComponent);
    // engine.register(testNode);

    editor.fromJSON(testData);

    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
        json_output.innerHTML = syntaxHighlight(editor.toJSON());
        Logger.debug(editor.toJSON());
    });

    editor.on('keydown', (e) => {
        if (e.key == 'Home') {
            editor.view.area.zoom(1, 0, 0);
            editor.view.area.translate(0, 0);
            editor.trigger('process');
        }
        else if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            Logger.debug('saving state...');
            // TODO Save layout here
        }
    })

    // editor.on('scheduled', (data) => {
    //   Logger.info('scedule triggered');
    // })

    editor.view.resize();
    editor.trigger("process");
}
