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
    await workbook.xlsx.readFile("template.xlsx");

    const sheet = workbook.worksheets[0];
    await workbook.xlsx.writeFile("template2.xlsx");

    worksheet.insertRow(1, [3, "Sam", "jim"]);
  }

  async export({ request, response, view }) {
    try {
      this.ExportWorksheet(2021);
      view.render("export", { filename: "template2.xlsx" });
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
}

module.exports = ExportController;
