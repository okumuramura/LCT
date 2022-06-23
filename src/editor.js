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
import { SumComponent } from "./components/sumComponent.js"
import { MinComponent } from "./components/minComponent.js"
import { TestNode } from "./components/testNode.js";

const testData = {
  "id": "demo@0.1.0",
  "nodes": {
    "2": {
      "id": 2,
      "data": {
        "num": 20
      },
      "inputs": {},
      "outputs": {
        "num": {
          "connections": [
            {
              "node": 4,
              "input": "num2",
              "data": {}
            }
          ]
        }
      },
      "position": [
        346,
        281
      ],
      "name": "Number"
    },
    "3": {
      "id": 3,
      "data": {
        "num": 40
      },
      "inputs": {},
      "outputs": {
        "num": {
          "connections": [
            {
              "node": 5,
              "input": "num2",
              "data": {}
            }
          ]
        }
      },
      "position": [
        341,
        519
      ],
      "name": "Number"
    },
    "4": {
      "id": 4,
      "data": {
        "num1": 10,
        "num2": 0
      },
      "inputs": {
        "num1": {
          "connections": []
        },
        "num2": {
          "connections": [
            {
              "node": 2,
              "output": "num",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "out": {
          "connections": [
            {
              "node": 5,
              "input": "num1",
              "data": {}
            }
          ]
        }
      },
      "position": [
        654,
        172
      ],
      "name": "Sum"
    },
    "5": {
      "id": 5,
      "data": {
        "num1": 0,
        "num2": 0
      },
      "inputs": {
        "num1": {
          "connections": [
            {
              "node": 4,
              "output": "out",
              "data": {}
            }
          ]
        },
        "num2": {
          "connections": [
            {
              "node": 3,
              "output": "num",
              "data": {}
            }
          ]
        }
      },
      "outputs": {
        "out": {
          "connections": [
            {
              "node": 6,
              "input": "in",
              "data": {}
            }
          ]
        }
      },
      "position": [
        931,
        321
      ],
      "name": "Minumum"
    },
    "6": {
      "id": 6,
      "data": {
        "output_view": 0
      },
      "inputs": {
        "in": {
          "connections": [
            {
              "node": 5,
              "output": "out",
              "data": {}
            }
          ]
        }
      },
      "outputs": {},
      "position": [
        1253,
        330
      ],
      "name": "Output"
    }
  }
}


export async function createEditor(){

    const container = document.querySelector('#rete');
    const editor = new Rete.NodeEditor('demo@0.1.0', container);

    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(KeyboardPlugin);
    editor.use(MinimapPlugin);
    editor.use(HistoryPlugin, { keyboard: true });
    // editor.use(AreaPlugin);
    editor.use(ContextMenuPlugin, {
        searchBar: false,
        delay: 0,
        items: {
            "lol": () => {alert('lol')}
        },
        allocate(component) {
            if (component.name == 'Sum')
                return ['arithmetic']
			return ["+ New"];
		},
		rename(component) {
			return component.name;
		}
    })

    const numComponent = new NumberComponent();
    const sumComponent = new SumComponent();
    const minComponent = new MinComponent();
    const outputComponent = new OutputComponent();

    const testNode = new TestNode();
    editor.register(numComponent);
    editor.register(sumComponent);
    editor.register(minComponent);
    editor.register(outputComponent);
    editor.register(testNode);

    const engine = new Rete.Engine('demo@0.1.0');
    engine.register(numComponent);
    engine.register(sumComponent);
    engine.register(minComponent);
    engine.register(outputComponent);
    engine.register(testNode);

    editor.fromJSON(testData);

    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
        // console.log(editor.toJSON());
    });

    editor.view.resize();
    editor.trigger("process");
}
