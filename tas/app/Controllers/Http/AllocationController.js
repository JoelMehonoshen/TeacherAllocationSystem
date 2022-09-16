"use strict";

const Database = use("Database");
const Logger = use("Logger");
const Allocation = use("App/Models/Allocation");
Database.query();

// TODO:(OLD) get rid of the raw sql, change everything (except like sql statements) to use the ORM
class AllocationController {
  // update the database with new allocations and academics

  async deleteallocation({ response, request }) {
      try {
          await Database.from("allocations").where("id", request.input("id")).delete()
          }
           catch (error) {
                Logger.error('Delete Allocation', error);
                throw new Exception();
          }
          return response.route("/allocations", true);
          }

  async updateAllocation({ response, request }) {
    try{
        await Database.from("allocations")
          .where("id", request.input("id"))
          .update({
            academicId: request.input("academicId"),
            fractionAllocated: request.input("fractionAllocated"),
            unitCoordinator: request.input("unitCoordinator"),
          });

      return response.route("/allocations", true);
    } catch (error) {
      Logger.error(`Update Allocation (${error})`);
    }
  }

  async addAllocation({ response, request }) {
    try {

      const offeringEntry = await Database.select("offerings.id").from("offerings").where("code", request.input("unitCode")).where("semester",request.input("semester"))
      console.log(offeringEntry)
      const newAllocation = new Allocation();
      newAllocation.academicId = request.input("academicId")
      newAllocation.id = offeringEntry[0]["id"]
      newAllocation.fractionAllocated = request.input("fractionAllocated");
      newAllocation.unitCoordinator = request.input("unitCoordinator");
      await newAllocation.save()
      return response.route("/allocations");
    } catch (error) {
      Logger.error(`Add Allocation (${error})`);
    }
  }

  async render({ view, request }) {
      try{

       var units = await Database.from("units");
       var academics= await Database.from("academics");
       var offerings = await Database.from("offerings");
       var allocations = await Database.from("allocations");



      var aggAllocations = [];
      var aggTotalFractions = []

      for (let i = 1; i <= offerings.length; i++){
        var entries = await Database.from("allocations").where("id", i);
        var totalFraction = await Database.from("allocations").where("id", i).sum("fractionAllocated");
        if(totalFraction[0]["sum"] == null){
          aggTotalFractions.push(0)
        }
        else{
          aggTotalFractions.push(totalFraction[0]["sum"])
        }
        aggAllocations.push(entries)

      }


      // obtain user input from searchbar + sort + filter options
      var search = request.input("search")
      var sort = request.input("sort")

      // if no user input, use default sort + filter options
      if (!search) { search = "%" }
      if (!sort) { sort = "name" }

      // Retrieves search information from each table
      //todo:Commented this out bc of the new schema - Joel
//      var academics = await Database
//        .select("academics.id", "academics.name", "academics.load")
//        .distinct("academics.id")
//        .from("academics")
//        .leftJoin("tags","academics.id","tags.academic_id")
//        .where("academics.name", 'ilike', "%" + search + "%")
//        .orWhere("tags.tag", 'ilike', "%" + search + "%")

      return view.render("allocations", {
        academics: academics,
        units: units,
        allocations: allocations,
        offerings: offerings,
        aggAllocations:aggAllocations,
        aggTotalFractions:aggTotalFractions,
      });

    }catch (error){
      Logger.error(`render Allocation (${error})`);
    }
  }
}

module.exports = AllocationController;
