# Instance Recommender Web GUI

The current version is available at https://instance-recommender.onrender.com/

## Data files

The files `dist/fii-data.json` and `dist/instance-information.json` contain the data of this project.

## Development

This thing is build with React.js, d3.js, and the MUI components.

```
npm run watch
```

creates an esbuild watcher for changes. The webgui should then be available at `http://localhost:8000/`. The GUI automatically reloads, when esbuild detects changes.
