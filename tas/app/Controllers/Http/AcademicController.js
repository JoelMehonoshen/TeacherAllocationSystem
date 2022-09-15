"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");

const Academic = use("App/Models/Academic");
const Database = use("Database");

class AcademicController {
  async addacademic({ request, response }) {
    try {
      const newAcademic = new Academic();
      newAcademic.id = request.input("id")
      newAcademic.name = request.input("name")
      newAcademic.category = request.input("category")
      newAcademic.teachingFraction = request.input("teachingFraction")


      await newAcademic.save()
      return response.route("/academics", true);
    } catch (error) {
      Logger.error('Add Academics' + error);
      throw new Exception();
    }
  }

async deleteacademic({ response, request }) {
    try {
        await Database.from("allocations")
        .where("academicId", request.input("id")).delete()
        await Database.from("academics")
        .where("id", request.input("id")).delete()
        }
         catch (error) {
              Logger.error('Delete Academics',  error);
              throw new Exception();
        }
        return response.route("/academics", true);
        }


  async updateacademic({ response, request }) {
  //todo: probably need a unique add check here and in add (above)
    try {
      await Database.from("academics")
        .where("id", request.input("id"))
        .update({
          id: request.input("newId"),
          name: request.input("name"),
          category: request.input("category"),
          teachingFraction: request.input("teachingFraction"),
        });
      return response.route("/academics", true);
    } catch (error) {
      Logger.error('Update Academics',  error);
      throw new Exception();
    }
  }

  async render({ request, view }) {
    try {

      //todo: update to work with new schema
      // obtain user input from searchbar + sort + filter options
      var search = request.input("search")
      var sort = request.input("sort")
      var minload = request.input("minload")
      var maxload = request.input("maxload")

      // if no user input, use default sort + filter options
      if (!search) { search = "%" }
      if (!sort) { sort = "name" }
      if (!minload) { minload = 0 }
      if (!maxload) { maxload = 99 }

      // perform SQL query
      const academics = await Database.from("academics")
        //.select("academics.name","academics.id","academics.year","academics.school","academics.load","academics.academic_preference")
        .where("name", 'ilike', "%" + search + "%")
        .orderBy(sort)

// for each academic, round requestedLoad to 2 decimal places (depreciated)
//      for (var i = 0; i < academics.length; i++) {
//        academics[i].requestedLoad = Math.round(academics[i].requestedLoad * 100) / 100;
//      }
//
//      const schools = await Database.from("academics")
//        .distinct("school")
//        .orderBy("school")

      //console.log(academics)
      return view.render("academics", {
        academics: academics
      });

    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
}
module.exports = AcademicController;
