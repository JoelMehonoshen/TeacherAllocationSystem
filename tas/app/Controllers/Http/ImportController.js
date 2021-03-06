"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");

const Excel = require("exceljs");
const Helpers = use("Helpers");
const Academic = use("App/Models/Academic");
const Unit = use("App/Models/Unit");
const Allocation = use("App/Models/Allocation");
const AcademicPreference = use("App/Models/AcademicPreference");
const Database = use("Database");

class UnitImport {
  constructor(code, name, year, semester, students, share) {
    this.code = code;
    this.name = name;
    this.year = year;
    this.semester = semester;
    this.students = students;
    this.share = share;
  }
}

class AcademicImport {
  constructor(name, year, load, allocations, academic_preference) {
    this.name = name;
    this.year = year;
    this.load = load;
    this.allocations = [];
    this.academic_preference = academic_preference;
    if (allocations !== undefined) {
      this.allocations = allocations;
    }
  }

  addAllocation(UnitImport, load) {
    this.allocations.push({ UnitImport, load });
  }

  async save() {
    const ac = new Academic();
    ac.name = this.name;
    ac.year = this.year;
    ac.school = "Information Technology";
    ac.load = this.load;
    ac.academic_preference = this.academic_preference;
    await ac.save();

    if (this.allocations.length > 0) {
      this.allocations.forEach(({ UnitImport, load }) => {
        if (UnitImport.semester == "1 & 2") {
          const al = new Allocation();
          al.id = ac.id;
          al.unit_code = UnitImport.code;
          al.unit_year = UnitImport.year;
          al.unit_semester = 1;
          al.load = load;
          al.save();
          const al2 = new Allocation();
          al2.id = ac.id;
          al2.unit_code = UnitImport.code;
          al2.unit_year = UnitImport.year;
          al2.unit_semester = 2;
          al2.load = load;
          al2.save();
        } else {
          const al = new Allocation();
          al.id = ac.id;
          al.unit_code = UnitImport.code;
          al.unit_year = UnitImport.year;
          al.unit_semester = UnitImport.semester;
          al.load = load;
          al.save();
        }
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
      const ac = new AcademicImport(name, year, load, allocs, academic_preference);
      academicsList.push(ac);
    }

    let units = [];

    for (let colNumber = 8; colNumber < unitsCodeRow.values.length; colNumber++) {
      if (unitsCodeRow.getCell(colNumber).text === "") {
        break;
      }
      if (unitsSemRow.getCell(colNumber).value == "1 & 2") {
        units.push({
          code: unitsCodeRow.getCell(colNumber).text,
          name: unitsNameRow.getCell(colNumber).text,
          year: year,
          semester: 1,
          students: unitsStudentsRow.getCell(colNumber).value,
          share: unitsShareRow.getCell(colNumber).value,
          load: unitsLoadRow.getCell(colNumber).result,
        });
        units.push({
          code: unitsCodeRow.getCell(colNumber).text,
          name: unitsNameRow.getCell(colNumber).text,
          year: year,
          semester: 2,
          students: unitsStudentsRow.getCell(colNumber).value,
          share: unitsShareRow.getCell(colNumber).value,
          load: unitsLoadRow.getCell(colNumber).result,
        });
      } else {
        units.push({
          code: unitsCodeRow.getCell(colNumber).text,
          name: unitsNameRow.getCell(colNumber).text,
          year: year,
          semester: unitsSemRow.getCell(colNumber).value,
          students: unitsStudentsRow.getCell(colNumber).value,
          share: unitsShareRow.getCell(colNumber).value,
          load: unitsLoadRow.getCell(colNumber).result,
        });
      }
    }

    units.forEach(async ({ code, name, year, semester, students, share, load }) => {
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
