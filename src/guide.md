# Guide Example

---

<div id="guide"></div>

```js
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
```

```js
import guide from 'https://api.observablehq.com/@rk2546/guide-imports.js?v=3';
new Runtime().module(guide, Inspector.into('#guide'));
```