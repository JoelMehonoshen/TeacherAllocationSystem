"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");

const Excel = require("exceljs");
const Helpers = use("Helpers");
const Academic = use("App/Models/Academic");
const Unit = use("App/Models/Unit");
const Allocation = use("App/Models/Allocation");
const Database = use("Database");

class ExportController {
  async ExportWorksheet(year) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile("public/template.xlsx");

    const sheet = workbook.worksheets[0];

    const academicsDB = await Academic.all();
    const academics = academicsDB.toJSON();

    const unitsDB = await Unit.all();
    const units = unitsDB.toJSON();


    for (let i = 0; i < academics.length; i++) {
        const academicNameCell = sheet.getCell("A"+(i+9).toString())
        academicNameCell.value = academics[i].name
        sheet.getCell("B"+(i+9).toString()).value = academics[i].academic_preference
        sheet.getCell("C"+(i+9).toString()).value = "CS"
        sheet.getCell("D"+(i+9).toString()).value = academics[i].load
        sheet.getCell("E"+(i+9).toString()).value = {formula: "D"+(9+i).toString()+"*$C$2"}
        sheet.getCell("F"+(i+9).toString()).value = {formula: "SUMPRODUCT(H$6:"+this.hex(units.length+7)+"$6,H9:"+this.hex(units.length+7)+"9)"}
        sheet.getCell("G"+(i+9).toString()).value = {formula: "F"+(9+i).toString()+"-E"+(9+i).toString() }
    }
    const bodies = sheet.getCell("A"+(academics.length+9+1).toString());
    bodies.value = "" + academics.length.toString()+" Bodies";

    sheet.getColumn('G').values = ["Code", "Name", "Semester", "Students", "Share", "Assigned Load", "Allocated Load"]
    sheet.getCell("C2").value = {
        formula: this.hex(units.length+7+1)+"6/D"+(academics.length+9+1).toString()
    }

    sheet.getCell("C"+(academics.length+9+1).toString()).value = "Total:"
    sheet.getCell("D"+(academics.length+9+1).toString()).value = {
        formula: "SUM(D9:D"+(academics.length+9).toString()+")"
    }

    sheet.getCell(this.hex(units.length+7).toString() + "6").value = "Total:";
    sheet.getCell(this.hex(units.length+7+1).toString() + "6").value = {
        formula: "SUM(H6:"+this.hex(units.length+7-1)+"6)"
    };

    for (let i = 0; i < units.length; i++) {
        const allocs = await Database.from("academics")
        .select("academics.name", "allocations.load")
        .join("allocations", "academics.id", "=", "allocations.id")
        .where(
          "allocations.unit_code", units[i].id
        );
        var allocCol = new Array(8).fill("")
        allocCol[0] = units[i].id
        allocCol[1] = units[i].name
        allocCol[2] = units[i].semester
        allocCol[3] = units[i].students
        allocCol[4] = units[i].share
        allocCol[5] = units[i].assignedLoad
        allocCol[6] = {
            formula: "SUM("+this.hex(i+7)+"9:"+this.hex(i+7)+"49)"
        }
        allocCol[7] = {
            formula: "IF("+this.hex(i+7)+"5<>0,"+this.hex(i+7)+"7-1,"+this.hex(i+7)+"7)"
        }
        for (let j = 0; j < academics.length; j++) {
            let pushed = false
            for ( let k = 0; k < allocs.length; k++) {
                if (allocs[k].name == academics[j].name) {
                    allocCol.push(allocs[k].load)
                    pushed = true
                }
            }
            if (!pushed) {
                allocCol.push("")
            }
        }
        //console.log(units[i].id)
        //console.log(allocs)
        //console.log(allocCol)
        const unitCodeCol = sheet.getColumn(i+8);
        unitCodeCol.values = allocCol
    }


    await workbook.xlsx.writeFile("public/template2.xlsx");
  }



  hex(a) {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // First figure out how many digits there are.
    a += 1; // This line is funky
    var c = 0;
    var x = 1;
    while (a >= x) {
        c++;
        a -= x;
        x *= 26;
    }

    // Now you can do normal base conversion.
    var s = "";
    for (var i = 0; i < c; i++) {
        s = alpha.charAt(a % 26) + s;
        a = Math.floor(a/26);
    }

    return s;
    }

  async render({ request, view }) {
    try {
        await this.ExportWorksheet(2021);
        return view.render("export", { filename: "template2.xlsx" });
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }

}

module.exports = ExportController;
