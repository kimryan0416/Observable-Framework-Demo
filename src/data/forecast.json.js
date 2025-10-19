const longitude = -117.16;
const latitude = 32.72;

async function json(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
    return await response.json();
}

const station = await json(
    `https://api.weather.gov/points/${latitude},${longitude}`
);

const forecast = await json(station.properties.forecastHourly);

process.stdout.write(JSON.stringify(forecast));