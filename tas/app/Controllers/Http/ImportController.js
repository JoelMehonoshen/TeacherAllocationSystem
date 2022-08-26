"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");

const Excel = require("exceljs");
const Helpers = use("Helpers");

const Academic = use("App/Models/Academic");
const Unit = use("App/Models/Unit");
const Allocation = use("App/Models/Allocation");
const Database = use("Database");

class UnitImport {
  constructor(code, name, students) {
    this.code = code;
    this.name = name;
    this.students = students;
  }
}
//todo will need to add models for each new schema *********
class AcademicImport {
  constructor(academicId, name, category, teachingFraction, allocations) {
    this.academicId = academicId;
    this.name = name;
    this.category = category;
    this.school = school;
    this.teachingFraction = teachingFraction;
    //keep the allocations list temporarily with the academic
    this.allocations = [];
    if (allocations !== undefined) {
      this.allocations = allocations;
    }
  }
//todo: this will need to be changed with new schema when we know what inputs are required
  addAllocation(UnitImport) {
    this.allocations.push({ UnitImport, load });
  }

  async save() {
    const ac = new Academic();
    ac.academicId = this.academicId;
    ac.name = this.name;
    ac.category = this.category;
    ac.teachingFraction = this.teachingFraction;
    await ac.save();

    if (this.allocations.length > 0) {
      this.allocations.forEach(({ UnitImport }) => {
          const al = new Allocation();
          al.academicId = ac.academicId;
          al.unitOfferingId = UnitImport.code;
          al.unit_year = UnitImport.year;
          al.unit_semester = UnitImport.semester;
          al.load = load;
          al.save();
      });
    }
  }
}

class ImportController {
  async uploadFile({ request, response, view }) {
    try {
      const Alloc = request.file("Allocation", {
        size: "10mb",
      });
      await Alloc.move(Helpers.tmpPath("uploads"), {
        name: `uploadedData.xlsm`,
        overwrite: true,
      });
      if (!Alloc.moved()) {
        return Alloc.error();
      }
      await this.ReadWorksheet();
      response.route("/allocations");
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
  async ReadWorksheet() {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile("tmp/uploads/uploadedData.xlsm"); //TODO:(OLD) This should include a date prefix of some kind so files can be versioned

    const year = 2022; //TODO:(OLD) change this to be dynamic later

    //should flush <year> entries in the database here
    //might need to only delete when replacing as some values may not be present when importing
    await Database.table("allocations").where("unit_year", year).delete();
    await Database.table("units").where("year", year).delete();
    await Database.table("academics").where("year", year).delete();

    const sheet = workbook.worksheets[0];
    const academicsCol = sheet.getColumn("A");
    const unitsCodeRow = sheet.getRow(1);
    const unitsNameRow = sheet.getRow(2);
    const unitsSemRow = sheet.getRow(3);
    const unitsStudentsRow = sheet.getRow(4);
    const unitsShareRow = sheet.getRow(5);
    const unitsLoadRow = sheet.getRow(6);

    let academicsList = [];

    for (let i = 8; i < academicsCol.values.length - 3; i++) {
      const row = sheet.getRow(i + 1);
      const name = row.getCell("A").value;
      const academic_preference = row.getCell("B").value;
      const school = row.getCell("C").value;
      const load = row.getCell("D").value;
      let allocs = [];
      row.eachCell((cell, colNumber) => {
        if (colNumber > 7) {
          let unitImport = new UnitImport(
            unitsCodeRow.getCell(colNumber).text,
            unitsNameRow.getCell(colNumber).text,
            year,
            unitsSemRow.getCell(colNumber).value,
            unitsStudentsRow.getCell(colNumber).value,
            unitsShareRow.getCell(colNumber).value
          );
          allocs.push({ UnitImport: unitImport, load: cell.value });
        }
      });
      const ac = new AcademicImport(name, year,school, load, allocs, academic_preference);
      academicsList.push(ac);
    }

    let units = [];

    for (let colNumber = 8; colNumber < unitsCodeRow.values.length; colNumber++) {
      if (unitsCodeRow.getCell(colNumber).text === "") {
        break;
      }
      //todo: this might need to change depending on the actual sheet data
        units.push({
          code: unitsCodeRow.getCell(colNumber).text,
          name: unitsNameRow.getCell(colNumber).text,
          year: year,
          semester: unitsSemRow.getCell(colNumber).text,
          students: unitsStudentsRow.getCell(colNumber).value,
          share: unitsShareRow.getCell(colNumber).value,
          load: Math.round(Math.max(Math.log10(unitsStudentsRow.getCell(colNumber).value/7),0.8)*unitsShareRow.getCell(colNumber).value * 100) / 100,
        });
    }

    units.forEach(async ({code, name, year, semester, students, share, load }) => {
      const unit = new Unit();
      unit.id = code;
      unit.name = name;
      unit.year = year;
      unit.semester = semester;
      unit.students = students;
      unit.share = share;
      unit.assignedLoad = load;
      await unit.save();
    });

    academicsList.forEach((academicImport) => {
      academicImport.save();
    });

    return;
  }
}

module.exports = ImportController;
