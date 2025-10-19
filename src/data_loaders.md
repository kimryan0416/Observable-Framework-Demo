---
theme: "air"
---

# Data Loaders

```js
const forecast = FileAttachment('./data/forecast.json').json();
```

## JavaScript Loader: Forecast Data (Periodic)

### Data Source: 
`https://api.weather.gov/points/[LATITUDE],[LONGITUDE]`

### Preview Coordinates:
- Latitude: `-117.16`
- Latitude: `32.72`

```js
display(Inputs.table(forecast.properties.periods));
```

---

## Python Loader: Penguin Logistics

### Notes:

If running locally, please make sure to run this in a Python environment with the proper required packages.

<pre>
# Create your python environment
python -m venv .venv

# Activate the virtual environment (Mac OSX)
source .venv/bin/activate
# Activate the virtual environment (Windows)
.venv\Scripts\activate

# Import required packages via `pip`:
pip install -r requirements.txt
</pre>


### Data Source:
<https://github.com/observablehq/data-loader-examples/blob/main/docs/data/penguin-logistic.csv.py>

```js
const penguin_logistics = FileAttachment('./data/penguin_logistics.csv').csv({typed:true});
```

```js
display(Inputs.table(penguin_logistics))
```