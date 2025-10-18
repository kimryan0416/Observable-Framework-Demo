---
theme: "parchment"
---

# Styling

<div class='grid grid-cols-2'>
    <div class='grid-colspan-2 card'>${temp_svg.node()}</div>
    <div class='card'>${weather_svg.node()}</div>
    <div class='card'>${mm_svg.node()}</div>
</div>

```js
// Importing `unique()` from our components
import { unique } from './components/unique.js';
```

```js
// Import our data of seattle weather
const data = d3.csv("https://vega.github.io/vega-datasets/data/seattle-weather.csv")
    .then(_data => {
        return _data.map(function(d) {
            let date = d3.timeParse("%Y-%m-%d")(d.date);
            return {
            date: date,
            month_date: new Date(2000, date.getMonth(), date.getDate()),
            precipitation: +d.precipitation,
            temp_max: +d.temp_max,
            temp_min: +d.temp_min,
            wind: +d.wind,
            weather: d.weather
        }
    });
});
```

```js
// Some global variables
const width = 800;
const height = 500;
const margins = 50;

// Mapper function to map weather types to colors
const weather_mapper = {
    'sun': '#e7ba52', 
    'fog': '#a7a7a7',
    'drizzle': '#aec7e8', 
    'rain': '#1f77b4', 
    'snow': '#9467bd'
};

// Define the weather scale, as it will be used persistently across the entire page.
const weather = unique(data.map(d => d.weather));
const weather_colors = weather.map(w => weather_mapper[w]);
const weather_scale = d3.scaleOrdinal()
    .domain(weather)
    .range(weather_colors);
```

```js
// Generate the svg for comparing maximum temperature across the years
const temp_svg = d3.create('svg')
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr('viewBox', [0, 0, width+margins*2, height+margins*2])
    .attr('weight', '100%')
    .attr('height', 'auto');
const temp_chart = temp_svg.append('g')
    .attr('transform', `translate(${margins}, ${margins})`)
    .attr('width', width)
    .attr('height', height);

const txscale = d3.scaleTime()
    .domain(d3.extent(data.map(d => d.month_date)))
    .range([0, width]);
const tyscale = d3.scaleLinear()
    .domain(d3.extent(data.map(d => d.temp_max)))
    .range([height, 0]);

temp_chart.append('g')
    .attr('transform',`translate(0,${height})`)
    .call(d3.axisBottom(txscale).tickFormat(d3.timeFormat("%b")));
temp_chart.append('g')
    .call(d3.axisLeft(tyscale));

temp_chart.selectAll('circle')
    .data(data)
    .enter()
        .append('circle')
            .attr('cx', d => txscale(d.month_date))
            .attr('cy', d => tyscale(d.temp_max))
            .attr('r', 5)
            .style('fill', 'transparent')
            .style('stroke-width', 2)
            .style('stroke', d => weather_scale(d.weather));
```

```js
const grouped = data.reduce((acc, row) => {
    if (acc[row.weather] == null) acc[row.weather] = [];
    acc[row.weather].push(row);
    return acc;
}, {});

const data_counts = Object.entries(grouped).map(([weather, rows]) => ({
    weather: weather,
    counts: rows.length
}));
```

```js
const weather_svg = d3.create('svg')
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr('viewBox', [0, 0, width+margins*2, height+margins*2])
    .attr('weight', '100%')
    .attr('height', 'auto');
const weather_chart = weather_svg.append('g')
    .attr('transform', `translate(${margins},${margins})`)
    .attr('width', width)
    .attr('height', height);

const wxscale = d3.scaleBand()
    .domain(weather)
    .range([0, width])
const wyscale = d3.scaleLinear()
    .domain([0, d3.max(data_counts.map(d => d.counts))])
    .range([height, 0])

weather_chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(wxscale));
weather_chart.append('g')
    .call(d3.axisLeft(wyscale));

weather_chart.selectAll('rect')
    .data(data_counts)
    .enter()
        .append('rect')
            .attr('x', d => wxscale(d.weather))
            .attr('y', d => wyscale(d.counts))
            .attr('width', wxscale.bandwidth())
            .attr('height', d => height - wyscale(d.counts))
            .attr('fill', d => weather_scale(d.weather));
```

```js
// Produce a melted dataset to separate out `temp_min` and `wind`
const melted_data = data.flatMap(d => [
  { date: d.date, type: "temp_min", value: d.temp_min },
  { date: d.date, type: "temp_max", value: d.temp_max }
]);
```

```js
const mm_svg = d3.create('svg')
    .attr('viewBox', [0, 0, width+margins*2, height+margins*2])
    .attr('width', '100%')
    .attr('height', 'auto');
const mm_chart = mm_svg.append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', `translate(${margins}, ${margins})`);

// group the data: let's draw one line per group
const sumstat = d3.group(melted_data, d => d.type);

// Add X axis --> it is a date format
const mmxscale = d3.scaleTime()
    .domain(d3.extent(melted_data.map(d => d.date)))
    .range([0, width]);
const mmyscale = d3.scaleLinear()
    .domain(d3.extent(melted_data.map(d => d.value)))
    .range([height, 0]);
const mmcscale = d3.scaleOrdinal()
    .domain(unique(melted_data.map(d => d.type)))
    .range(['steelblue', 'orange']);

mm_chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(mmxscale).ticks(9).tickFormat(d3.timeFormat("%b %y")));
mm_chart.append('g')
    .call(d3.axisLeft(mmyscale));

console.log(sumstat)

mm_chart.selectAll(".line")
    .data(sumstat)
    .enter()
        .append("path")
            .attr("fill", "none")
            .attr("stroke", d => mmcscale(d[0]))
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
                return d3.line()
                    .x(d => mmxscale(d.date) )
                    .y(d => mmyscale(d.value) )
                    (d[1])
            })

```