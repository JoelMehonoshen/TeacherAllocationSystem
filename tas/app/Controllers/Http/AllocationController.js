"use strict";

const Database = use("Database");
const Logger = use("Logger");
const Allocation = use("App/Models/Allocation");
class AllocationController {
  // update the database with new allocations and academics
  async updateAllocation({ response, request }) {
    await Database.from("academics")
      .where("id", request.input("academicID"))
      .update({
        name: request.input("name"),
        load: request.input("requestedLoad"),
      });
    if (request.input("unit")) {
      for (var i = 0; i < request.input("allocationID").length; i++) {
        await Database.from("allocations")
          .where("allocation_id", request.input("allocationID")[i])
          .update({
            unit_code: request.input("unit")[i],
            load: request.input("unitLoad")[i],
          });
      }
    }
    return response.route("/allocations", true);
  }
  // TODO: All endpoints need to use the validator
  // https://legacy.adonisjs.com/docs/4.1/validator
  // adding a new allocation
  async addAllocation({ response, request }) {
    try {
      const newAllocation = new Allocation();
      newAllocation.id = request.input("academic")
      newAllocation.unit_code = request.input("unit");
      newAllocation.unit_year = request.input("year");
      newAllocation.unit_semester = request.input("semester");
      newAllocation.load = request.input("load");
      await newAllocation.save()
      return response.route("/allocations");
    } catch (error) {
      Logger.error(`Add Allocation (${error})`);
    }
  }

  async render({ view, request }) {
    //Get units, needed for adding allocations
    var unitList = await Database.select("*").from("units");
    var academicList = await Database.select("*").from("academics");

    if (request.input("search")) {
      // Retrieves search information from each table
      var academics = await Database.select("id", "name", "load")
        .from("academics")
        .distinct("id")
        .where("name", request.input("search"));

      var allocations = await Database.from("academics")
        .select(
          "allocations.unit_code",
          "allocations.load",
          "allocations.id",
          "allocations.allocation_id"
        )
        .join("allocations", "academics.id", "=", "allocations.id");
      var unitsUnalloc = await Database.from("units")
        .select("units.id")
        .whereNotIn(
          "units.id",
          Database.from("allocations").select("allocations.unit_code")
        );
      var tags = await Database.from("tags")
        .select("*")

    } else {
      // Retrieves all information from each table
      var academics = await Database.select("id", "name", "load")
        .from("academics")
        .distinct("id");
      var allocations = await Database.from("academics")
        .select(
          "allocations.unit_code",
          "allocations.load",
          "allocations.id",
          "allocations.allocation_id"
        )
        .join("allocations", "academics.id", "=", "allocations.id");
      var unitsUnalloc = await Database.from("units")
        .select("units.id")
        .whereNotIn(
          "units.id",
          Database.from("allocations").select("allocations.unit_code")
        );
      var tagslist = await Database.from("tags")
      .select("*")
    }

    // Coorelates academics and their allocations based on id
    var allocAcademics = [];
    for (var i = 0; i < academics.length; i++) {
      var teacher = {
        id: academics[i].id,
        name: academics[i].name,
        requestedLoad: academics[i].load,

      };
      var units = [];
      var tags = [];
      var totalLoad = 0;
      for (var j = 0; j < allocations.length; j++) {
        if (teacher.id == allocations[j].id) {
          units.push({
            allocation_id: allocations[j].allocation_id,
            unit_code: allocations[j].unit_code,
            load: allocations[j].load,
          });
          totalLoad += parseFloat(allocations[j].load);
        }
        //get tags associated with the allocation
        for (var x = 0; x < tagslist.length; x++) {
          if(tagslist.allocation_id[x] == allocations[j].id){
            tags.push({
              tags: tagslist[x].tag
            })
          }
        }
      }
      teacher.actualLoad = totalLoad;
      teacher.allocUnits = units;
      teacher.tags = tags;
      allocAcademics.push(teacher);
    }

    let years = [];
    let currentYear = new Date().getFullYear() + 1;
    let earliestYear = currentYear - 5;
    while (currentYear >= earliestYear) {
      years.push(currentYear);
      currentYear -= 1;
    }

    return view.render("allocations", {
      allocAcademics: allocAcademics,
      unitsUnalloc: unitsUnalloc,
      academicList: academicList,
      unitList: unitList,
      years: years,
      tags: tags
    });
  }
}

module.exports = AllocationController;
