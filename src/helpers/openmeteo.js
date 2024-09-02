const openmeteo = require('openmeteo');
const NodeCache = require("node-cache");
const myCache = new NodeCache();

async function getWeatherByCity(lat, long) {
    try {
        let params = {
            latitude: [lat],
            longitude: [long],
            hourly: ["temperature_2m", "precipitation_probability"],
            start_date: "2024-09-2",
            end_date: "2024-09-2"
        };

        const url = 'https://api.open-meteo.com/v1/forecast';
        const responses = await openmeteo.fetchWeatherApi(url, params);
        const range = (start, stop, step) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();

        const hourly = response.hourly();
        const weatherData = {
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature: hourly.variables(0).valuesArray(),
                precipitation: hourly.variables(1).valuesArray(),
            },
        };

        return weatherData
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    getWeather: async (origin, destination) => {
        try {
            let originWather = myCache.get(origin.iata_code);
            let destinationWather = myCache.get(destination.iata_code);
            if (originWather == undefined) {
                originWather = await getWeatherByCity(origin.latitude, origin.longitude)
                myCache.set(origin.iata_code, originWather, 86400);
            }
            if (destinationWather == undefined) {
                destinationWather = await getWeatherByCity(destination.latitude, destination.longitude)
                myCache.set(destination.iata_code, originWather, 86400);
            }

            return { origin: originWather, destination: destinationWather }
            
        } catch (error) {
            throw new Error(error);
        }

    }
}