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
    try {
    //todo:need to update allocations simultaneously
//      await Database.from("allocations")
//              .where("academicId", request.input("id"))
//              .update({academicId: request.input("newId")});

      await Database.from("academics")
        .where("id", request.input("id"))
        .update({
          id: request.input("newId"),
          name: request.input("name"),
          category: request.input("category"),
          teachingFraction: request.input("teachingFraction")
        });
      return response.route("/academics", true);
    } catch (error) {
      Logger.error('Update Academics',  error);
      throw new Exception();
    }
  }

  async updatepreference({ response, request }) {
      try {

       console.log(request.input("id"))
        await Database.from("preferences")
          .where("code", request.input("originalCode"))
          .where("id", request.input("id"))
          .update({
            code: request.input("code"),
            desireToTeach: request.input("desireToTeach"),
            abilityToTeach: request.input("abilityToTeach")
          });
        return response.route("/academics", true);
      } catch (error) {
        Logger.error('Update Preferences',  error);
        throw new Exception();
      }
    }

   async deletepreference({ response, request }) {
   try{
    await Database.from("preferences")
           .where("code", request.input("code"))
           .where("id", request.input("id"))
           .delete()
           return response.route("/academics", true);
   }catch (error) {
          Logger.error('Delete Preferences',  error);
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

       const preferences = await Database.from("preferences");
       const units = await Database.from("units");

       // Accepts the array and key
           const groupBy = (array, key) => {
             // Return the end result
             return array.reduce((result, currentValue) => {
               // If an array already present for key, push it to the array. Else create an array and push the object
               (result[currentValue[key]] = result[currentValue[key]] || []).push(
                 currentValue
               );
               // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
               return result;
             }, {}); // empty object is the initial value for result object
           };

       const groupedPreferences = groupBy(preferences,"id")




      //console.log(academics)
      return view.render("academics", {
        academics: academics,
        units: units,
        groupedPreferences: groupedPreferences,
      });

    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
}
module.exports = AcademicController;
