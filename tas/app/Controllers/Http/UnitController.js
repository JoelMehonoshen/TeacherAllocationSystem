"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");

const Unit = use("App/Models/Unit");
const Database = use("Database");

class UnitController {
  async addunit({ request, response }) {
    try {
      await Database.table("units").insert({
        id: request.input("id"),
        name: request.input("name"),
        year: request.input("year"),
        semester: request.input("semester"),
        assignedLoad: request.input("load"),
      });

      return response.route("/units", true);
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }

  async render({ request, view }) {
    try {
      if (request.input("search")) {
        const units = await Database.from("units")
          .where('id', "like", "%"+request.input("search")+"%")
          .orWhere('name', "like", "%"+request.input("search")+"%")

        return view.render("units", { units: units });
      } else {
        const units = await Unit.all();
        return view.render("units", { units: units.toJSON() });
      }
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }

  async updateunit({ response, request }) {
    try {
      await Database.from("units")
        .where({
          id: request.input("unitID"),
          semester: request.input("semester"),
        })
        .update({
          name: request.input("name"),
          id: request.input("id"),
          assignedLoad: request.input("load"),
        });
      return response.route("/units", true);
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
}
module.exports = UnitController;
