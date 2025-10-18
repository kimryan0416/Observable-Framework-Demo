# Notebook Demo

```js
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
```

```js
import contents from 'https://api.observablehq.com/@rk2546/2025-infovis-cse_week-7-lab.js?v=3';
```

````js
new Runtime().module(contents, name => {
  if (name === "ex2") return new Inspector(document.querySelector("#ex2"));
  if (name === "viewof radius") return new Inspector(document.querySelector("#radius"));
});
````

<div id="radius"></div>
<div id="ex2"></div>