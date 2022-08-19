"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");

const Excel = require("exceljs");
const Helpers = use("Helpers");
const Academic = use("App/Models/Academic");
const Unit = use("App/Models/Unit");
const Allocation = use("App/Models/Allocation");
const Database = use("Database");



class spreadsheetViewController {
  async render({ view, request }) {
        try{


        return view.render("spreadsheetView");
      }catch (error){
        Logger.error(`render spreadsheetView (${error})`);
      }
    }
 }

module.exports = spreadsheetViewController;
