"use strict";

const Database = use("Database");
const Logger = use("Logger");
const Allocation = use("App/Models/Allocation");
const Offering = use("App/Models/Offering");
Database.query();


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

      let offeringEntry = await Database.from("offerings").where("code", request.input("unitCode")).where("semester", request.input("semester"))

      //this if statement prevents a crash if no offering exists for the selected allocation semester
      if(offeringEntry.length == 0){

            const newOffering = new Offering()
            const offeringLength = await Database.from("offerings").count()
            console.log(offeringLength[0].count)
            //fills id values of offerings if any have been deleted
            let thisOfferingID = 0;
            for (let i = 1; i < offeringLength[0].count; i++) {
            const thisCheck = await Database.from("offerings").where("id", i);
            if(!thisCheck.length != 0){
            thisOfferingID = i;
            break
            }}

            newOffering.id = thisOfferingID
            newOffering.code = request.input("unitCode")
            newOffering.semester = request.input("semester")

            //todo: This could be done dynamically using a popup (have fun next group lol)
            newOffering.estimatedEnrolments = 0;
            newOffering.schoolShare = 0;
            await newOffering.save()

            //reallocate offering entry
            offeringEntry = await Database.from("offerings").where("code", request.input("unitCode")).where("semester", request.input("semester"))
            console.log("Offering "+ request.input("semester") +" doesn't exist for this Unit.")
            console.log("New Offering Created")
      }
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
      units.filter(unit => {
        if (!subjectAreaGroups.includes(unit.subjectAreaGroup)) {
          subjectAreaGroups.push(unit.subjectAreaGroup);
        }
      });
      subjectAreaGroups.sort();

      var subjectAreaGroupsInput = [];
      for (const group of subjectAreaGroups) {
        subjectAreaGroupsInput.push(request.input(group));
      }

      // Filtering subjectAreaGroup
      for (let i = 0; i < subjectAreaGroups.length; i++) {
        const group = subjectAreaGroups[i];
        if (!subjectAreaGroupsInput.every(el => el == undefined) && !subjectAreaGroupsInput[i]) {
          units = units.filter(unit => unit.subjectAreaGroup != group);
        }
      }
      var reducedUnitCodes = units.map(unit => unit.code);
      offerings = offerings.filter(offering => reducedUnitCodes.includes(offering.code));


      // Obtain filtering option -> semester
      var semesters = [];
      offerings.filter(offering => {
        if (!semesters.includes(offering.semester)) {
          semesters.push(offering.semester);
        }
      });
      semesters.sort();

      var semestersInput = [];
      for (const sem of semesters) {
        semestersInput.push(request.input(sem));
      }

      // Filtering semester
      for (let i = 0; i < semesters.length; i++) {
        const sem = semesters[i];
        if (!semestersInput.every(el => el == undefined) && !semestersInput[i]) {
          offerings = offerings.filter(offering => offering.semester != sem);
        }
      }

      //// Filtering estimatedEnrolments
      if (minEnrols) { offerings = offerings.filter(offering => offering.estimatedEnrolments >= minEnrols); }
      if (maxEnrols) { offerings = offerings.filter(offering => offering.estimatedEnrolments <= maxEnrols); }

      // Filtering schoolShare
      if (minShare) { offerings = offerings.filter(offering => offering.schoolShare >= minShare); }
      if (maxShare) { offerings = offerings.filter(offering => offering.schoolShare <= maxShare); }




      // Calculating total allocated fraction
      for (const offering of offerings) {
        var totalFraction = await Database.from("allocations").where("id", offering.id).sum("fractionAllocated");
        var totalFractionSum = totalFraction[0]["sum"];

        if (totalFractionSum == null) {
          offering.aggTotalFraction = 0;
        }
        else {
          offering.aggTotalFraction = totalFractionSum;
        }

      }

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

      const aggAllocations = groupBy(allocations, "id");


      // Filtering total allocated fraction
      if (minTotal) {
        for (let i = aggTotalFractions.length - 1; i >= 0; i--) {
          if (!(aggTotalFractions[i] >= minTotal)) {
            offerings.splice(i, 1);
          }
        }
      }
      if (maxTotal) {
        for (let i = aggTotalFractions.length - 1; i >= 0; i--) {
          if (!(aggTotalFractions[i] <= maxTotal)) {
            offerings.splice(i, 1);
          }
        }
      }

      // Filtering out the same units in 'offerings' array as 'units' array
      var reducedUnitCodes = offerings.map(offering => offering.code);
      units = units.filter(unit => reducedUnitCodes.includes(unit.code));



      // Sorting
      if (sortOption == "code") { offerings.sort((a, b) => a.code - b.code); }
      if (sortOption == "estimatedEnrolments") { offerings.sort((a, b) => a.estimatedEnrolments - b.estimatedEnrolments); }
      if (sortOption == "schoolShare") { offerings.sort((a, b) => a.schoolShare - b.schoolShare); }
      if (sortOption == "totalFrac") {
        var indices = aggTotalFractions.map(function (el, i) {
          return { index: i, value: el };
        })
        indices.sort((a, b) => a.value - b.value);
        offerings = indices.map(offering => (offerings[offering.index]));
      }

      


      return view.render("allocations", {
        academics: academics,
        units: units,
        allocations: allocations,
        offerings: offerings,
        aggAllocations: aggAllocations,
        subjectAreaGroups: subjectAreaGroups,
        semesters: semesters
      });

    } catch (error) {
      Logger.error(`render Allocation (${error})`);
    }
  }
}

module.exports = AllocationController;
