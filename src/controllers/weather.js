const db = require("../lib/db")
const weather = require("@/helpers/openmeteo.js")

async function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

async function sendNotification(response, index) {
    const time = await getRandomInt(1000, 5001)
    setTimeout(() => {
        console.log("\n***************************************");
        console.log("No. notify Weather: ", index + 1);
        console.log("Origin Weather: ", response.origin.hourly.temperature[0])
        console.log("Destination Weather: ", response.destination.hourly.temperature[0])
        console.log("***************************************\n");
    }, time);
}

module.exports = {
    getByFlight: async function name(req, res) {

        const { flight } = req.params

        const flightTickets = await db.flightTickets.findFirst({
            where: {
                flight_num: Number(flight)
            },
            select: {
                destination: {
                    select: {
                        latitude: true,
                        longitude: true,
                        iata_code: true
                    }
                },
                origin: {
                    select: {
                        latitude: true,
                        longitude: true,
                        iata_code: true
                    }
                }
            }
        })
        const response = await weather.getWeather(flightTickets.origin, flightTickets.destination)

        res.status(200).send(response)
    },
    notify: async function name(req, res) {

        const flightTickets = await db.flightTickets.findMany({
            select: {
                destination: {
                    select: {
                        latitude: true,
                        longitude: true,
                        iata_code: true
                    }
                },
                origin: {
                    select: {
                        latitude: true,
                        longitude: true,
                        iata_code: true
                    }
                }
            }
        })
        for (let index = 0; index < flightTickets.length; index++) {
            let response = await weather.getWeather(flightTickets[index].origin, flightTickets[index].destination)
            sendNotification(response, index)
        }

        res.status(200).send({ msg: "ok send notifications" })

    },
}