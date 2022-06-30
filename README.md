# LCT. Low-Code Telemetry system.
LCT is a visual-based programming editor for telemetry systems. The system contains modules necessary to prepare a scheme for further collection and processing of telemetry data. LCT has a module-based template what allow to add new nodes easely.

## Setup and Run
### Installing dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Controls
| Key         | Action                     |
|-------------|----------------------------|
| Delete      | Delete selected node       |
| Space       | Open context menu          |
| Home        | Back to default view       |
| Ctrl + S    | Save document (not yet)    |
| Mouse right | Open context menu          |
| Mouse wheel | Zoom +/-                   |

`Saving not ready yet, but you can manualy place json with nodes in src/editor.json to save editor's state`
