"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");
const Excel = require("exceljs");
const Helpers = use("Helpers");
const Academic = use("App/Models/Academic");
const Unit = use("App/Models/Unit");
const Allocation = use("App/Models/Allocation");
const Database = use("Database");

class SpreadsheetViewController {
  async render({ view, request }) {
    try{
      const academics = await Database.from("academics")
      const units = await Database.from("units")
      const allocations = await Database.from("allocations")
      const offerings = await Database.from("offerings")
      const preferences = await Database.from("preferences")
      const global_spread = await Database
      .from("academics")
      .leftJoin("allocations",'academics.id','=','allocations.academicId')
      .leftJoin("offerings",'allocations.id','=','offerings.id')
      .select("academics.id AS academicId")
      .select("allocations.fractionAllocated")
      .select("offerings.code AS unitCode")

      return view.render("spreadsheetView", {
        academics: academics,
        units: units,
        allocations: allocations,
        offerings: offerings,
        preferences: preferences,
        global_spread: global_spread
      });
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
 }

module.exports = SpreadsheetViewController;
