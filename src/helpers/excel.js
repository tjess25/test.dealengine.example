
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');
const xlsx = require("xlsx");

async function PrepareData(path) {

  console.log('   * 4. Get Data Excel  ::')
  console.log("1 [PrepareData] ... ")


  const result = excelToJson({
    source: fs.readFileSync(path)
  });

  console.log("   * [PrepareData]  Inicializa variables")
  const fileExcel = xlsx.readFile(path);
  const sheetNames = fileExcel.SheetNames;
  var data = [];

  console.log("   * [PrepareData]  Inicia ciclo ")
  for (let index = 0; index < sheetNames.length; index++) {

    const type = sheetNames[index]

    console.log("   * [PrepareData]  type :. " + type)

  }

  console.log("   * [PrepareData]  Fin ciclo ")
  data.push({
    filename: path,
    result: result
  });



  return data;


}


async function CreateBase64(path) {

  try {

    const fileBuffer = fs.readFileSync(path);
    const base64String = fileBuffer.toString('base64');

    return base64String;

  } catch (error) {

    console.log("ERROR TRY CATCH  MAIN:::: ", error)
    return "Error"
  }


}

async function ClearAllField() {

  const folderName = './Downloads';
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }

  fs.readdirSync(folderName).forEach(file => {

    console.log(" [ClearAllField] File >>> ", file);
    if (file !== '.DS_Store') {

      const paht = "./Downloads/" + file
      fs.unlinkSync(paht, err => {
        if (err) throw err;
      });

    } else {
      console.log(" [ClearAllField] No se puede eliminar el archivo .DS_Store")
    }

  });

}

module.exports = {
  ClearAllField: ClearAllField,
  PrepareData: PrepareData,
  CreateBase64: CreateBase64,

};

