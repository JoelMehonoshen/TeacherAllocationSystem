"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");
const Unit = use("App/Models/Unit");
const Database = use("Database");

class UnitController {
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

  async addunit({ request, response }) {
    try {
      const newUnit = new Unit()
      newUnit.id = request.input("id")
      newUnit.name = request.input("name")
      newUnit.year = request.input("year")
      newUnit.semester = request.input("semester")
      newUnit.students = request.input("students")
      newUnit.share = request.input("share")
      newUnit.assignedLoad = Math.log10(request.input("students")/7) * request.input("share")
      await newUnit.save()
      return response.route("/units", true);
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }

  async updateunit({ response, request }) {
    try {
      await Unit
        .query()
        .where({
          id: request.input("unitID"),
          semester: request.input("semester"),
        })
        .update({
          id: request.input("id"),
          name: request.input("name"),
          year: request.input("year"),
          semester: request.input("semester"),
          students: request.input("students"),
          share: request.input("share"),
          assignedLoad: Math.log10(request.input("students")/7) * request.input("share")
        });
      return response.route("/units", true);
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
}
module.exports = UnitController;
