"use strict";

const Database = use("Database");
const Logger = use("Logger");
const Exception = use("App/Exceptions/Handler");

class DashboardController {
  // Display the dashboard
  async displayDashboard({ view }) {
    try {
      // Fetch allocations and offerings data from the database
      const allocations = await Database.from("allocations");
      const offerings = await Database.from("offerings");

      // Convert "topAndBottom5AllocationsArray" into JSON string format
      const topAndBottom5AllocationsArray = this.generateTopAndBottom5Allocations(
        allocations,
        offerings
      );

      const allocationFulfillment = this.allocationFulfillment(allocations);

      const topAndBottom5AllocationsObject = Object.assign(
        {},
        topAndBottom5AllocationsArray
      );
      const topAndBottom5AllocationsString = JSON.stringify(
        topAndBottom5AllocationsObject
      );

      return view.render("dashboard", {
        topAndBottom5Allocations: topAndBottom5AllocationsString,
        allocationFulfillment: allocationFulfillment,
      });
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }


  allocationFulfillment(allocations) {
    const allocationSummary = this.getAllocationSummary(allocations);
    let over, under, equal, iterator = 0;
    // Sort the allocations before we iterate through them.
    // This will reduce the number of times we need to go through the loop.
    allocationSummary.sort(
      (a, b) => b.totalAllocatedFraction - a.totalAllocatedFraction
    );

    // Count the number of overallocated units
    while (allocationSummary[iterator].totalAllocatedFraction > 1) {
      over++;
      iterator++;
    }

    // Count the number of well-allocated units
    while (allocationSummary[iterator].totalAllocatedFraction === 1) {
      equal++;
      iterator++;
    }

    // Count the number of underallocated units
    while (allocationSummary[iterator].totalAllocatedFraction < 1) {
      under++;
      iterator++;
    }

    return [under, equal, over];
  }

  // Generate an array containing Top and Bottom 5 Allocations data
  generateTopAndBottom5Allocations(allocations, offerings) {
      // Calculate total allocated fraction by Unit Offering ID
      const allocationSummary = this.getAllocationSummary(allocations);

      // Sort "allocationSummary" in descending order using the value of "totalAllocatedFraction"
      allocationSummary.sort(
        (a, b) => b.totalAllocatedFraction - a.totalAllocatedFraction
      );

      // Retrieve Top and Bottom 5 data in the value of "totalAllocatedFraction"
      const topAndBottom5Allocations = [];
      const top5Index = 5;
      const bottom5Index = allocationSummary.length - 5;
      for (let i = 0; i < top5Index; i++) {
        topAndBottom5Allocations.push(allocationSummary[i]);
      }
      for (let i = bottom5Index; i < allocationSummary.length; i++) {
        topAndBottom5Allocations.push(allocationSummary[i]);
      }

      // Add Unit Code and Semester data to "topAndBottom5Allocations" based on the offerings data
      for (let i = 0; i < topAndBottom5Allocations.length; i++) {
        for (let j = 0; j < offerings.length; j++) {
          if (topAndBottom5Allocations[i].unitOfferingId == offerings[j].id) {
            topAndBottom5Allocations[i].unitCode = offerings[j].code;
            topAndBottom5Allocations[i].semester = offerings[j].semester;
            break;
          }
        }
      }

      return topAndBottom5Allocations;
    };

    /*
    * Returns a summary of all allocations
    */
    getAllocationSummary(allocations) {
      const allocationSummary = [];
      for (let i = 0; i < allocations.length; i++) {
        if (i == 0) {
          allocationSummary.push({
            unitOfferingId: allocations[i].id,
            totalAllocatedFraction: allocations[i].fractionAllocated,
          });
          continue;
        }

        let isMatched = false;
        for (let j = 0; j < allocationSummary.length; j++) {
          if (allocations[i].id == allocationSummary[j].unitOfferingId) {
            allocationSummary[j].totalAllocatedFraction +=
              allocations[i].fractionAllocated;
            isMatched = true;
            break;
          }
        }
        if (!isMatched) {
          allocationSummary.push({
            unitOfferingId: allocations[i].id,
            totalAllocatedFraction: allocations[i].fractionAllocated,
          });
        }
      }
      return allocationSummary;
    }
  }

module.exports = DashboardController;
