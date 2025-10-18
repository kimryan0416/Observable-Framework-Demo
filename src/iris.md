# Anderson's Iris Dataset

```js
import { unique } from './components/unique.js';
```

```js
const data = await FileAttachment('./data/iris.csv').csv({typed:true});

const   width = 400, 
        height=400, 
        margins={top:50,left:50,right:50,bottom:50};

const svg = d3.create('svg')
    .attr('width',width+margins.left+margins.right)
    .attr('height',height+margins.top+margins.bottom);

const chart = svg.append('g')
    .attr('width',width)
    .attr('height',height)
    .attr('transform',`translate(${margins.left},${margins.top})`);

const sepal_width = data.map(d => d.SepalLengthCm);
const petal_width = data.map(d => d.PetalLengthCm);
const species = data.map(d => d.Species);

const x_scale = d3.scaleLinear()
    .domain(d3.extent(sepal_width))
    .range([0,width]);
const x_axis = chart.append('g')
    .attr('transform',`translate(0,${height})`)
    .call(d3.axisBottom(x_scale));

const y_scale = d3.scaleLinear()
    .domain(d3.extent(petal_width))
    .range([height,0]);
const y_axis = chart.append('g')
    .call(d3.axisLeft(y_scale));

const c_scale = d3.scaleOrdinal()
    .domain(unique(species))
    .range(['red','purple','blue']);


chart.selectAll('circle').data(data).enter().append('circle')
    .attr('cx', d => x_scale(d.SepalLengthCm))
    .attr('cy', d => y_scale(d.PetalLengthCm))
    .attr('r', 5)
    .attr('fill', d => c_scale(d.Species))
```

<div>${svg.node()}</div>