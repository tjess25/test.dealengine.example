const db = require("../lib/db")
const queue = require('fastq').promise(worker, 2)
const path = require('path');

const fs = require('fs');
const EXCEL = require("../helpers/excel");

async function worker(arg) {

  try {
    console.log('   * 0. Process Data >> ', arg.files[0].originalname)
    console.log('   * 2. Process Data ')

    const directoryPath = "Downloads/"
    var ls = fs.readdirSync(directoryPath);
    var filename = ""
    var jsonData = []
    for (let index = 0; index < ls.length; index++) {

      console.log("   * 2.1 file " + ls[index])
      if (ls[index] != ".DS_Store") {
        filename = ls[index];

        const file = path.join(directoryPath, ls[index]);

        const message = "   * 3. File  :: " + file + " Iteracion " + index
        console.log(message)

        jsonData = await EXCEL.PrepareData(file)

        await EXCEL.ClearAllField()

      }

    }

    jsonData[0].filename = arg.files[0].originalname
    console.log("4. End Process")

    return { "data": jsonData }


  } catch (error) {

    console.log("ERROR TRY CATCH :::: 🚀 ~ file: index.js ~ line 63 ~ returnnewPromise ~ error", error)
    throw ("Somenthing went wrong, please contact with admin or try again!")

  }

}


module.exports = {
  saveData: async function name(req, res) {

    const response = await queue.push(req)
    const dataXLS = response.data[0].result["Hoja 1"]
    for (let i = 2; i < dataXLS.length; i++) {
      const upserOrigen = await db.airports.upsert({
        where: {
          iata_code: dataXLS[i]['E'],
        },
        update: {
          latitude: dataXLS[i]['G'],
          longitude: dataXLS[i]['H']
        },
        create: {
          name: dataXLS[i]['F'],
          latitude: dataXLS[i]['G'],
          longitude: dataXLS[i]['H'],
          iata_code: dataXLS[i]['E'],
        },
      })
      const upserDestination = await db.airports.upsert({
        where: {
          iata_code: dataXLS[i]['I'],
        },
        update: {
          latitude: dataXLS[i]['K'],
          longitude: dataXLS[i]['L']
        },
        create: {
          name: dataXLS[i]['J'],
          latitude: dataXLS[i]['K'],
          longitude: dataXLS[i]['L'],
          iata_code: dataXLS[i]['I'],
        },
      })
      await db.flightTickets.create({
        data: {
          airline: dataXLS[i]['C'],
          flight_num: dataXLS[i]['D'],
          destinationId: upserDestination.id,
          originId: upserOrigen.id,
        },
      })
    }
    res.status(200).send({ msg: "save data" })
  },
}