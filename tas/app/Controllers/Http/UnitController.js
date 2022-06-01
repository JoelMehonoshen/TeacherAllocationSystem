"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");
const Unit = use("App/Models/Unit");
const Database = use("Database");

class UnitController {
  async render({ request, view }) {
    try {

      // obtain user input from searchbar + sort + filter options
      var search = request.input("search")
      var sort = request.input("sort")
      var idfilter = request.input("idfilter")
      var semfilter = request.input("semfilter")
      var minload = request.input("minload")
      var maxload = request.input("maxload")
      var minstudents = request.input("minstudents")
      var maxstudents = request.input("maxstudents")
      var minshare = request.input("minshare")
      var maxshare = request.input("maxshare")

      // if no user input, use default sort + filter options
      if (!search && !idfilter) { search = "%" }
      if (!search && idfilter) { search = idfilter }
      if (!sort) { sort = "id" }
      if (!semfilter) { semfilter = 0 }
      if (semfilter == 1) { semfilter = 2 }
      else if (semfilter == 2) { semfilter = 1 }      
      if (!minload) { minload = 0 }
      if (!maxload) { maxload = 99 }
      if (!minstudents) { minstudents = 0 }
      if (!maxstudents) { maxstudents = 99999 }
      if (!minshare) { minshare = 0 }
      if (!maxshare) { maxshare = 99 }

      // perform SQL query
      const units = await Database.from("units")
        .where('id', "ilike", "%" + search + "%")
        //.orWhere('name', "ilike", "%" + search + "%")
        .where("semester", '<>', semfilter)
        .where("assignedLoad", '>=', minload)
        .where("assignedLoad", '<=', maxload)
        .where("students", '>=', minstudents)
        .where("students", '<=', maxstudents)
        .where("share", '>=', minshare)
        .where("share", '<=', maxshare)
        .orderBy(sort)

      const ids = await Database.from("units")        
        .distinct("id")
        .orderBy("id")

      return view.render("units", {
        units: units,
        ids: ids
      });
      
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
