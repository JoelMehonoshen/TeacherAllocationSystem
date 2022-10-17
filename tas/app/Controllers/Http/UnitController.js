"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");
const Unit = use("App/Models/Unit");
const Offering = use("App/Models/Offering");
const Preference = use("App/Models/Preference");
const Database = use("Database");

class UnitController {
  async render({ request, view }) {
    try {

      // Obtain the searchbar input + options selected from the sorting + filtering
      var searchbar = request.input("searchbar");
      var sortOption = request.input("sortOption");
      var sem1 = request.input("sem1");
      var sem2 = request.input("sem2");
      var minEnrols = request.input("minEnrols");
      var maxEnrols = request.input("maxEnrols");
      var minShare = request.input("minShare");
      var maxShare = request.input("maxShare");

      // Default sorting + filtering options
      if (!searchbar) { searchbar = ""; }
      if (!sortOption) { sortOption = "code"; }
      //if (!search && !idfilter) { search = "%" }
      //if (!search && idfilter) { search = idfilter }
      //if (!sortOption) { sortOption = "id" }
      //if (!semfilter) { semfilter = 0 }
      //if (semfilter == 1) { semfilter = 2 }
      //else if (semfilter == 2) { semfilter = 1 }
      //if (!minload) { minload = 0 }
      //if (!maxload) { maxload = 99 }
      //if (!minstudents) { minstudents = 0 }
      //if (!maxstudents) { maxstudents = 99999 }
      //if (!minshare) { minshare = 0 }
      //if (!maxshare) { maxshare = 99 }



      // Obtain from database
      var units = await Database.from("units")
        .where("code", "ilike", "%" + searchbar + "%")
        .orWhere('name', "ilike", "%" + searchbar + "%")
        .orderBy(sortOption);



      //helper function
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

      var offerings = await Database.from("offerings");


      //console.log(offerings);
      //var sems = offerings.map(offering => offering.semester);
      //console.log(sems);

      // Filtering
      // ###########
      if (minShare) {
        offerings = offerings.filter(offering => offering.schoolShare >= minShare);
        //var result = offerings.map(offering => offering.code);
      }
      if (maxShare) {
        offerings = offerings.filter(offering => offering.schoolShare <= maxShare);
      }
      if (sem1 && sem2) { ; }
      else if (sem1) { ; }
      else if (sem2) { ; }
     
      

      const groupedUnits = groupBy(offerings, "code");
      

      return view.render("units", {
        units: units,
        groupedUnits: groupedUnits,
      });

    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }

  async addunit({ request, response }) {
    try {
      const newUnit = new Unit()
      newUnit.code = request.input("code")
      newUnit.name = request.input("name")
      newUnit.year = request.input("year")
      newUnit.semester = request.input("subjectAreaGroup")
      await newUnit.save()
      return response.route("/units", true);
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
  async addoffering({ request, response }) {
    try {
      const newOffering = new Offering()
      const offeringLength = await Database.from("offerings").length
      console.log(offeringLength)
      newOffering.id = offeringLength
      newOffering.code = request.input("code")
      newOffering.semester = request.input("year") + "/" + request.input("semester")
      newOffering.estimatedEnrolments = request.input("estimatedEnrolments")
      newOffering.schoolShare = request.input("schoolShare")
      await newOffering.save()

      return response.route("/units", true);
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }

  async updateoffering({ response, request }) {
    try {
      await Offering.query()
        .where({ id: request.input("id") })
        .update({
          semester: request.input("semester"),
          estimatedEnrolments: request.input("estimatedEnrolments"),
          schoolShare: request.input("schoolShare")
        });

      return response.route("/units", true);
    } catch (error) {
      Logger.error("Update Offering", error);
      throw new Exception();
    }
  }
  async deleteoffering({ response, request }) {
    try {

      await Database.from("allocations").where("id", request.input("id")).delete()
      await Database.from("offerings").where("id", request.input("id")).delete()
      //todo: Need to decrement offerings and allocations for each offering
      //await Database.from('offerings').where("id",">",offeringEntries[0].id).decrement('id',offeringEntries.length);
    } catch (error) {
      Logger.error('Delete Offering', error);
      throw new Exception();
    }
    return response.route("/units", true);
  }


  async updateunit({ response, request }) {
    try {
      //todo: need to do updates simultaneously
      await Offering.query().where({ code: request.input("originalCode") }).update({
        code: request.input("code")
      });
      await Preference.query().where({ code: request.input("originalCode") }).update({
        code: request.input("code")
      });
      await Unit.query().where({ code: request.input("originalCode") }).update({
        code: request.input("code"),
        name: request.input("name"),
        subjectAreaGroup: request.input("subjectAreaGroup")
      });

      return response.route("/units", true);
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
  async deleteunit({ response, request }) {
    try {

      const offeringEntries = await Database.select("offerings.id").from("offerings").where("code", request.input("code"));
      await Database.from("allocations").where("id", offeringEntries[0].id).delete()
      await Database.from("offerings").where("code", request.input("code")).delete()
      await Database.from("preferences").where("code", request.input("code")).delete()
      //todo: Need to decrement offerings and allocations for each offering
      //await Database.from('offerings').where("id",">",offeringEntries[0].id).decrement('id',offeringEntries.length);
      await Database.from("units").where("code", request.input("code")).delete()
    }
    catch (error) {
      Logger.error('Delete Unit', error);
      throw new Exception();
    }
    return response.route("/units", true);
  }
}
module.exports = UnitController;
