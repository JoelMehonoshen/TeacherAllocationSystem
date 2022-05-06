"use strict";

const Database = use("Database");
const Logger = use("Logger");
const Allocation = use("App/Models/Allocation");
const Tag = use("App/Models/Tag");

// TODO:(OLD) get rid of the raw sql, change everything (except like sql statements) to use the ORM
class AllocationController {
  // update the database with new allocations and academics
  async updateAllocation({ response, request }) {
    try{
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
      if(request.input("tags")){
        //sanitise tag input
        var strTags = request.input("tags").replace(/\s/g, '');
        var tags= strTags.split('#')
        //for each allocationID that comes through (each unit the academic is assigned to) create a tag for that allocation
        for (var i = 0; i < request.input("allocationID").length; i++) {
          //first item in tags list is empty, so skipping it with i=1
          for(var x=1; x < tags.length; x++){
              const newTag = new Tag();
              newTag.tag = tags[x]
              newTag.allocation_id = request.input("allocationID")[i]
              newTag.academic_id = request.input("academicID")
              newTag.type = "allocation"
              console.log(tags)
              await newTag.save();
          }
        }
      }
      return response.route("/allocations", true);
    } catch (error) {
      Logger.error(`Update Allocation (${error})`);
    }
  }
  // TODO:(OLD) All endpoints need to use the validator
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
      try{

      //Get units, needed for adding allocations
      var unitList = await Database.select("*").from("units");
      var academicList = await Database.select("*").from("academics");
      var allocations = await Database.from("academics")
      .select(
        "allocations.unit_code",
        "allocations.load",
        "allocations.id",
        "allocations.allocation_id"
      )
      .join("allocations", "academics.id", "allocations.id");
      var unitsUnalloc = await Database.from("units")
      .select("units.id")
      .whereNotIn(
        "units.id",
        Database.from("allocations").select("allocations.unit_code")
      );
      var tagslist = await Database.from('tags')
      .select("allocation_id","tag")
      .where("type","=","allocation")

      if (request.input("search")) {
        // Retrieves search information from each table
        var academics = await Database
          .select("academics.id", "academics.name", "academics.load")
          .distinct("academics.id")
          .from("academics")
          .leftJoin("tags","academics.id","tags.academic_id")
          .where("academics.name",'like',"%"+request.input("search")+"%")
          .orWhere("tags.tag",'like',"%"+request.input("search")+"%")

        console.log(academics)
      } else {
        // Retrieves all information from each table
        var academics = await Database.select("id", "name", "load")
          .from("academics")
          .distinct("id");
      }
      // Coorelates academics and their allocations based on id
      var allocAcademics = [];
      //for each academic, check for allocations
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
        }
        //for each unit/allocation - check for unique tags and create a string of them for edit allocation
        for(var j=0; j < units.length; j++){
          for(var x=0; x < tagslist.length; x++){
            if(units[j].allocation_id == tagslist[x].allocation_id){
                tags.push({
                  tag: tagslist[x].tag
                })
              }
            }
          }

        teacher.actualLoad = totalLoad;
        teacher.allocUnits = units;
        teacher.tags = tags;
        allocAcademics.push(teacher);
      }
      for (var i=0; i < allocAcademics; i++){
        for(var j=0; j < tagslist.length; j++){
          if(allocations[j].id == tagslist[x].allocation_id){
            tags.push({
              tag: tagslist[x].tag
            })
          }
        }
      }
      //dynamically produce last 5 years for search bar drop down box
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
      });
    }catch (error){
      Logger.error(`render Allocation (${error})`);
    }
  }
}

module.exports = AllocationController;
