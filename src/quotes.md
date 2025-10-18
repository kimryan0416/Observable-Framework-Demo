# Popular Movie Quotes

```js
import { GetAllQuotes } from './components/quotes.js';
```

```js
const quotes = GetAllQuotes();
const quotes_lis = quotes.map(q => html`<li>"${q.quote}"</li>`);
const quotes_html = html`<ul>${quotes_lis}</ul>`;

display(quotes_html);
```