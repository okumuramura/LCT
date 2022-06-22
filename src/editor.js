/* eslint-disable */

import Rete from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import KeyboardPlugin from 'rete-keyboard-plugin';
import MinimapPlugin from 'rete-minimap-plugin';
import HistoryPlugin from 'rete-history-plugin';
// import AreaPlugin from "rete-area-plugin";

import { numSocket, anySocket } from './sockets.js';
import { OutputComponent } from "./components/outputComponent.js";
import { NumberComponent } from "./components/numberComponent.js"
import { SumComponent } from "./components/sumComponent.js"
import { MinComponent } from "./components/minComponent"

const testData = {
    "id": "demo@0.1.0",
    "nodes": {
      "1": {
        "id": 1,
        "data": {
          "num": 10
        },
        "inputs": {},
        "outputs": {
          "num": {
            "connections": [
              {
                "node": 2,
                "input": "num1",
                "data": {}
              }
            ]
          }
        },
        "position": [
          391.8833312988281,
          67
        ],
        "name": "Number"
      },
      "2": {
        "id": 2,
        "data": {},
        "inputs": {
          "num1": {
            "connections": [
              {
                "node": 1,
                "output": "num",
                "data": {}
              }
            ]
          },
          "num2": {
            "connections": [
              {
                "node": 4,
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
                "node": 3,
                "input": "in1",
                "data": {}
              }
            ]
          }
        },
        "position": [
          684.8833312988281,
          106
        ],
        "name": "Sum"
      },
      "3": {
        "id": 3,
        "data": {},
        "inputs": {
          "in1": {
            "connections": [
              {
                "node": 2,
                "output": "out",
                "data": {}
              }
            ]
          },
          "in2": {
            "connections": [
              {
                "node": 6,
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
                "input": "in",
                "data": {}
              }
            ]
          }
        },
        "position": [
          982.8833312988281,
          269
        ],
        "name": "Min"
      },
      "4": {
        "id": 4,
        "data": {
          "num": 20
        },
        "inputs": {},
        "outputs": {
          "num": {
            "connections": [
              {
                "node": 2,
                "input": "num2",
                "data": {}
              }
            ]
          }
        },
        "position": [
          389.8833312988281,
          200
        ],
        "name": "Number"
      },
      "5": {
        "id": 5,
        "data": {},
        "inputs": {
          "in": {
            "connections": [
              {
                "node": 3,
                "output": "out",
                "data": {}
              }
            ]
          }
        },
        "outputs": {},
        "position": [
          1291.8833312988281,
          333
        ],
        "name": "Output"
      },
      "6": {
        "id": 6,
        "data": {
          "num": 50
        },
        "inputs": {},
        "outputs": {
          "num": {
            "connections": [
              {
                "node": 3,
                "input": "in2",
                "data": {}
              }
            ]
          }
        },
        "position": [
          388.8833312988281,
          441
        ],
        "name": "Number"
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
    editor.register(numComponent);
    editor.register(sumComponent);
    editor.register(minComponent);
    editor.register(new OutputComponent());

    const engine = new Rete.Engine('demo@0.1.0');
    engine.register(numComponent);
    engine.register(sumComponent);
    engine.register(minComponent);
    engine.register(new OutputComponent());

    editor.fromJSON(testData);

    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
    });

    editor.view.resize();
    editor.trigger("process");
}
