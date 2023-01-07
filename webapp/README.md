# Instance Recommender Web GUI

## Data files

The files `dist/fii-data.json` and `dist/instance-information.json` contain the data of this project.

## Development

This thing is build with React.js, d3.js, and the MUI components.

```
npm run watch
```

creates an esbuild watcher for changes.

The webapp can be viewed on localhost by starting any webserver in the build directory, e.g.

```
cd build
python -mhttp.server
```

The webgui should then be available at `http://localhost:8000/`.
