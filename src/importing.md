# Notebook Demo

```js
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";

const runtime = new Runtime();
```

## Importing Functions from Notebooks

Let's say we have <a href="https://observablehq.com/@d3/color-legend" target="_blank">this notebook</a> where we are importing two functions: `Legend` and `Swatches`.

```js
import COLOR_LEGEND from "https://api.observablehq.com/@d3/color-legend.js?v=3"
const LEGENDS = runtime.module(COLOR_LEGEND);

const Legend = await LEGENDS.value("Legend");

const color_scale = d3.scaleQuantize()
  .domain([0, 4000000])
  .range(d3.schemeSpectral[8]);

display(Legend(color_scale, {title:"Example Scale", width:700, ticks:10}))
```


## Importing Charts from Notebooks

The notebook we are importing from is this unlisted notebook: <a href="https://observablehq.com/@rk2546/framework-imports" target="_blank">https://observablehq.com/@rk2546/framework-imports</a>.

### Chart #1:

<div id="chart1"></div>

### Chart #2:

<div id="chart2"></div>

```js
/*
import contents from 'https://api.observablehq.com/@rk2546/2026-infovis-cse_week-2-lab-solutions.js?v=3';
*/
import IMPORTS from 'https://api.observablehq.com/@rk2546/framework-imports.js?v=3';
const main = runtime.module(IMPORTS, name => {
  if (name === "chart1") return new Inspector(document.querySelector("#chart1"));
  if (name === "chart2") return new Inspector(document.querySelector("#chart2"));
});

const movies = await FileAttachment("./data/movies.json").json();
main.redefine("movies", movies);
````

