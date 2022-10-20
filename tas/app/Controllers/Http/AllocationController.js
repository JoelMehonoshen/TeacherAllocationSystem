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
    try {
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

      const offeringEntry = await Database.select("offerings.id").from("offerings").where("code", request.input("unitCode")).where("semester", request.input("semester"))
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
    try {

      // Obtain the searchbar input + options selected from the sorting + filtering
      var searchbar = request.input("searchbar");
      var sortOption = request.input("sortOption");
      var minEnrols = request.input("minEnrols");
      var maxEnrols = request.input("maxEnrols");
      var minShare = request.input("minShare");
      var maxShare = request.input("maxShare");
      var minTotal = request.input("minTotal");
      var maxTotal = request.input("maxTotal");

      // if no user input, use default sort + filter options
      if (!searchbar) { searchbar = ""; }
      if (!sortOption) { sortOption = "code"; }

      // Obtain from database
      var units = await Database.from("units")
        .where("code", "ilike", "%" + searchbar + "%");
      var academics = await Database.from("academics");
      var offerings = await Database.from("offerings")
        .where("code", "ilike", "%" + searchbar + "%");
      var allocations = await Database.from("allocations");

      // Obtain filtering option -> subjectAreaGroup
      var subjectAreaGroups = [];
      var subjectAreaGroupsInput = [];
      units.filter(unit => {
        if (!subjectAreaGroups.includes(unit.subjectAreaGroup)) {
          subjectAreaGroups.push(unit.subjectAreaGroup);
          subjectAreaGroupsInput.push(request.input(unit.subjectAreaGroup));
        }
      });
      subjectAreaGroups.sort();
      subjectAreaGroupsInput.sort();

      // Obtain filtering option -> semester
      var semesters = [];
      var semestersInput = [];
      offerings.filter(offering => {
        if (!semesters.includes(offering.semester)) {
          semesters.push(offering.semester);
          semestersInput.push(request.input(offering.semester));
        }
      });
      semesters.sort();
      semestersInput.sort();

      //// Filtering subjectAreaGroup
      //for (let i = 0; i < subjectAreaGroups.length; i++) {
      //  const group = subjectAreaGroups[i];
      //  //console.log();
      //  if (!subjectAreaGroupsInput.every(el => el == undefined) && !subjectAreaGroupsInput[i]) {
      //    units = units.filter(unit => unit.subjectAreaGroup != group);
      //  }
      //}
      //var reducedUnitCodes = units.map(unit => unit.code);
      //offerings = offerings.filter(offering => reducedUnitCodes.includes(offering.code));
      

      

      //// Filtering semester
      //for (let i = 0; i < semesters.length; i++) {
      //  const sem = semesters[i];
      //  if (!semestersInput.every(el => el == undefined) && !semestersInput[i]) {
      //    offerings = offerings.filter(offering => offering.semester != sem);
      //  }
      //}


      //// Filtering estimatedEnrolments
      //if (minEnrols) { offerings = offerings.filter(offering => offering.estimatedEnrolments >= minEnrols); }
      //if (maxEnrols) { offerings = offerings.filter(offering => offering.estimatedEnrolments <= maxEnrols); }

      //// Filtering schoolShare
      //if (minShare) { offerings = offerings.filter(offering => offering.schoolShare >= minShare); }
      //if (maxShare) { offerings = offerings.filter(offering => offering.schoolShare <= maxShare); }

      

      
      // Calculating total allocated fraction
      var aggAllocations = [];
      var aggTotalFractions = [];

      for (let i = 1; i <= offerings.length; i++) {
        var entries = await Database.from("allocations").where("id", i);
        var totalFraction = await Database.from("allocations").where("id", i).sum("fractionAllocated");
        var totalFractionSum = totalFraction[0]["sum"];
        
        if (totalFractionSum == null) {
          aggTotalFractions.push(0);
        }
        else {
          aggTotalFractions.push(totalFractionSum);
        }
        aggAllocations.push(entries);

      }

      //// Filtering total allocated fraction
      //if (minTotal) {
      //  for (let i = aggTotalFractions.length - 1; i >= 0; i--) {
      //    if (!(aggTotalFractions[i] >= minTotal)) {
      //      offerings.splice(i, 1);
      //    }
      //  }
      //}
      //if (maxTotal) {
      //  for (let i = aggTotalFractions.length - 1; i >= 0; i--) {
      //    if (!(aggTotalFractions[i] <= maxTotal)) {
      //      offerings.splice(i, 1);
      //    }
      //  }
      //}

      //// Filtering numerical input fields
      //if (minEnrols || maxEnrols || minShare || maxShare || minTotal || maxTotal) {
      //  const reducedUnitCodes = offerings.map(offering => offering.code);
      //  units = units.filter(unit => reducedUnitCodes.includes(unit.code));
      //}

      

      // Sorting
      //if (sortOption == "code") { offerings.sort((a, b) => a.code - b.code); }
      //if (sortOption == "estimatedEnrolments") { offerings.sort((a, b) => a.estimatedEnrolments - b.estimatedEnrolments); }
      //if (sortOption == "schoolShare") { offerings.sort((a, b) => a.schoolShare - b.schoolShare); }
      //if (sortOption == "totalFrac") {
      //  var indices = aggTotalFractions.map(function (el, i) {
      //    return { index: i, value: el };
      //  })
      //  indices.sort((a, b) => a.value - b.value);
      //  offerings = indices.map(poop => (offerings[poop.index]));
      //}

      console.log(units.length);
      console.log(offerings.length);
      console.log(aggAllocations.length);
      console.log(aggTotalFractions.length);

      console.log(semestersInput);
      console.log(subjectAreaGroupsInput);

      

      return view.render("allocations", {
        academics: academics,
        units: units,
        allocations: allocations,
        offerings: offerings,
        aggAllocations: aggAllocations,
        aggTotalFractions: aggTotalFractions,
        subjectAreaGroups: subjectAreaGroups,
        semesters: semesters
      });

    } catch (error) {
      Logger.error(`render Allocation (${error})`);
    }
  }
}

module.exports = AllocationController;
