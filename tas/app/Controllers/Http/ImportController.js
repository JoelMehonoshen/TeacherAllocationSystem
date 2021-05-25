'use strict'

const Excel = require('exceljs');
const Helpers = use('Helpers')
const Academic = use("App/Models/Academic");
const Unit = use("App/Models/Unit");
const Database = use('Database')

class ImportController {
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
        
        await Database.table('units')
        .where('year', year)
        .delete();
        await Database.table('academics')
        .where('year', year)
        .delete();

        const sheet = workbook.worksheets[0];


        const academicsCol = sheet.getColumn('A');
        //console.log(academicsCol.values)
        //https://github.com/exceljs/exceljs#columns
        var academicsNames = []
        academicsCol.eachCell(function(cell, rowNumber) {
            if (rowNumber > 8) {
                academicsNames.push({rowNumber: rowNumber, acName: cell.text})
            }
        });


        var unitsCodes = sheet.getRow(1).values;
        var unitsNames = sheet.getRow(2).values;
        var unitsSems = sheet.getRow(3).values;
        for (let i = 8; i < unitsCodes.length; i++) {
            if (unitsCodes[i] == null) {
                break;
            }
            console.log(i.toString())
            if (unitsSems[i] == "1 & 2") {
                const unit = new Unit()
                unit.name = unitsNames[i];
                unit.id = unitsCodes[i];
                unit.semester = 1;
                unit.year = year;
                unit.save()
                const unit2 = new Unit()
                unit2.name = unitsNames[i];
                unit2.id = unitsCodes[i];
                unit2.semester = 2;
                unit2.year = year;
                unit2.save()
            }
            else {
                const unit = new Unit()
                unit.name = unitsNames[i];
                unit.id = unitsCodes[i];
                unit.semester = parseInt(unitsSems[i]);
                unit.year = year;
                unit.save()
            }
        }



        academicsNames.splice(-3)
        console.log(academicsNames)
        academicsNames.forEach(({rowNumber, acName}) => {
            const academic = new Academic()
            academic.name = acName;
            academic.school = "Information Technology";
            academic.year = year;
            academic.save()



        })
        return
    }
}

module.exports = ImportController
