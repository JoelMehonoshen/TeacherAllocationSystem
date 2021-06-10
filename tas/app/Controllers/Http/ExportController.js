'use strict'


const Excel = require('exceljs');
const Helpers = use('Helpers')
const Academic = use("App/Models/Academic");
const Unit = use("App/Models/Unit");
const Allocation = use("App/Models/Allocation");
const Database = use('Database')


class ExportController {

    async ExportWorksheet( year ) {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile("template.xlsx");

        const sheet = workbook.worksheets[0];
        await workbook.xlsx.writeFile("template2.xlsx");

        worksheet.insertRow(1, [3, 'Sam', 'jim']);
    }

    async export({request, response, view}){
        this.ExportWorksheet(2021)
        console.log("it worked");
        view.render("export", {filename: "template2.xlsx"})
    }
}


module.exports = ExportController
