"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");

const Academic = use("App/Models/Academic");
const Database = use("Database");
const Tag = use("App/Models/Tag");

class AcademicController {
  async addacademic({ request, response }) {
    try {
      const newAcademic = new Academic();
      newAcademic.name = request.input("name")
      newAcademic.year = request.input("year")
      newAcademic.school = request.input("school")
      newAcademic.load = request.input("load")
      newAcademic.academic_preference = request.input("academic_preference")


      await newAcademic.save()
      return response.route("/academics", true);
    } catch (error) {
      Logger.error('Add Academics' + error);
      throw new Exception();
    }
  }

async deleteacademic({ response, request }) {
Logger.info('Delete Academic has run')
    try {
        await Database.from("allocations")
        .where("id", request.input("academicID")).delete()
        await Database.from("academics")
        .where("id", request.input("academicID")).delete()
        }
         catch (error) {
              Logger.error('Delete Academics',  error);
              throw new Exception();
        }
        return response.route("/academics", true);
        }


  async updateacademic({ response, request }) {
    try {
      await Database.from("academics")
        .where("id", request.input("academicID"))
        .update({
          name: request.input("name"),
          load: request.input("load"),
          school: request.input("school"),
          academic_preference: request.input("academic_preference"),
        });

        if(request.input("tags")){
          //sanitise tag input
          var strTags = request.input("tags").replace(/\s/g, '');
          var tags= strTags.split('#')
          //first item in tags list is empty, so skipping it with i=1
          for(var x=1; x < tags.length; x++){
            const newTag = new Tag();
            newTag.tag = tags[x]
            newTag.academic_id = request.input("academicID")
            newTag.type = "academic"
            await newTag.save();
          }
        }
      return response.route("/academics", true);
    } catch (error) {
      Logger.error('Update Academics',  error);
      throw new Exception();
    }
  }

  async render({ request, view }) {
    try {

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

      const schools = await Database.from("academics")
        .distinct("school")
        .orderBy("school")

      //console.log(academics)
      return view.render("academics", {
        academics: academics,
        schools: schools
      });

    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
}
module.exports = AcademicController;
