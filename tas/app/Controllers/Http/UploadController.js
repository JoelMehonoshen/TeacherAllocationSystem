'use strict'

const Excel = require('exceljs');
const Helpers = use('Helpers')
const Academic = use("App/Models/Academic");

class UploadController {
    async uploadFile({request, response, view}) {
        const Alloc = request.file('Allocation', {
            size: '10mb'
        })
      
        await Alloc.move(Helpers.tmpPath('uploads'), {
            name: `uploadedData.xlsm`,
            overwrite: true
        })
       
        
        if (!Alloc.moved()) {
            return Alloc.error()
        }
        this.ReadWorksheet()
    }

    async ReadWorksheet() {

        //should flush <year> entries in the database here
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile("tmp/uploads/uploadedData.xlsm");


        const year = 2021 //change this to be dynamic later --------------------------------------


        const sheet = workbook.worksheets[0];
        const academicsCol = sheet.getColumn('A');
        //console.log(academicsCol.values)
        //https://github.com/exceljs/exceljs#columns
        var academicsNames = []
        academicsCol.eachCell(function(cell, rowNumber) {
            // ...
            if (rowNumber > 8) {
                academicsNames.push(cell.text)
            }
        });
        academicsNames.splice(-3)
        console.log(academicsNames)
        academicsNames.forEach(name => {
            const academic = new Academic()
            academic.name = name;
            academic.school = "Information Technology";
            academic.year = year;
            academic.save()
        })

        console.log(workbook.worksheets[0].getCell('A2').text)
        return
    }
}

module.exports = UploadController
