"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");
const Database = use("Database");

class SpreadsheetViewController {
  async render({ view, request }) {
    try {
      let academics = await Database.from("academics");
      let units = await Database.from("units");
      let allocations = await Database.from("allocations");
      let offerings = await Database.from("offerings");
      let preferences = await Database.from("preferences");
      let global_spread = await Database.from("academics")
        .leftJoin("allocations", "academics.id", "=", "allocations.academicId")
        .leftJoin("offerings", "allocations.id", "=", "offerings.id")
        .select("academics.id AS academicId")
        .select("allocations.fractionAllocated")
        .select("offerings.code AS unitCode");

      // Obtain a URL parameter for sorting a table
      const sortOption = request.input("sortOption");

      // Store the values of a selected button and a name of a table to display at first
      let selectedButton = "global-button";
      let selectedTableName = "Global";

      // Sort a table in ascending order based on a non-numerical column
      const sortAscOrder1 = (table, columnName) => {
        let sortedColumnArray = [];
        let sortedTable = [];

        // Sort an array including only elements of a certain column of a table in ascending order
        table.map((each) => sortedColumnArray.push(each[columnName]));
        sortedColumnArray.sort();

        // Sort an original table in ascending order according to the order of "sortedColumnArray"
        sortedColumnArray.map((each) => {
          for (let i = 0; i < table.length; i++) {
            if (each == table[i][columnName]) {
              sortedTable.push(table[i]);
              table.splice(i, 1);
              break;
            }
          }
        });

        return sortedTable;
      };

      // Sort a table in descending order based on a non-numerical column
      const sortDescOrder1 = (table, columnName) => {
        let sortedColumnArray = [];
        let sortedTable = [];

        // Sort an array including only elements of a certain column of a table in descending order
        table.map((each) => sortedColumnArray.push(each[columnName]));
        sortedColumnArray.sort().reverse();

        // Sort an original table in descending order according to the order of "sortedColumnArray"
        sortedColumnArray.map((each) => {
          for (let i = 0; i < table.length; i++) {
            if (each == table[i][columnName]) {
              sortedTable.push(table[i]);
              table.splice(i, 1);
              break;
            }
          }
        });

        return sortedTable;
      };

      // Sort a table in ascending order based on a numerical column
      const sortAscOrder2 = (table, columnName) => {
        let sortedColumnArray = [];
        let sortedTable = [];

        // Sort an array including only elements of a certain column of a table in ascending order
        table.map((each) => sortedColumnArray.push(each[columnName]));
        sortedColumnArray.sort((a, b) => a - b);

        // Sort an original table in ascending order according to the order of "sortedColumnArray"
        sortedColumnArray.map((each) => {
          for (let i = 0; i < table.length; i++) {
            if (each == table[i][columnName]) {
              sortedTable.push(table[i]);
              table.splice(i, 1);
              break;
            }
          }
        });

        return sortedTable;
      };

      // Sort a table in descending order based on a numerical column
      const sortDescOrder2 = (table, columnName) => {
        let sortedColumnArray = [];
        let sortedTable = [];

        // Sort an array including only elements of a certain column of a table in descending order
        table.map((each) => sortedColumnArray.push(each[columnName]));
        sortedColumnArray.sort((a, b) => a - b).reverse();

        // Sort an original table in descending order according to the order of "sortedColumnArray"
        sortedColumnArray.map((each) => {
          for (let i = 0; i < table.length; i++) {
            if (each == table[i][columnName]) {
              sortedTable.push(table[i]);
              table.splice(i, 1);
              break;
            }
          }
        });

        return sortedTable;
      };

      // Check if a table should be sorted
      if (sortOption) {
        // Sort a table according to the value of sortOption
        switch (sortOption) {
          // For Academics Table
          case "academicsAsc1":
            academics = sortAscOrder1(academics, "id");
            selectedButton = "academics-button";
            selectedTableName = "Academics";
            break;
          case "academicsDesc1":
            academics = sortDescOrder1(academics, "id");
            selectedButton = "academics-button";
            selectedTableName = "Academics";
            break;
          case "academicsAsc2":
            academics = sortAscOrder1(academics, "name");
            selectedButton = "academics-button";
            selectedTableName = "Academics";
            break;
          case "academicsDesc2":
            academics = sortDescOrder1(academics, "name");
            selectedButton = "academics-button";
            selectedTableName = "Academics";
            break;
          case "academicsAsc3":
            academics = sortAscOrder1(academics, "category");
            selectedButton = "academics-button";
            selectedTableName = "Academics";
            break;
          case "academicsDesc3":
            academics = sortDescOrder1(academics, "category");
            selectedButton = "academics-button";
            selectedTableName = "Academics";
            break;
          case "academicsAsc4":
            academics = sortAscOrder2(academics, "teachingFraction");
            selectedButton = "academics-button";
            selectedTableName = "Academics";
            break;
          case "academicsDesc4":
            academics = sortDescOrder2(academics, "teachingFraction");
            selectedButton = "academics-button";
            selectedTableName = "Academics";
            break;

          // For Units Table
          case "unitsAsc1":
            units = sortAscOrder1(units, "code");
            selectedButton = "units-button";
            selectedTableName = "Units";
            break;
          case "unitsDesc1":
            units = sortDescOrder1(units, "code");
            selectedButton = "units-button";
            selectedTableName = "Units";
            break;
          case "unitsAsc2":
            units = sortAscOrder1(units, "name");
            selectedButton = "units-button";
            selectedTableName = "Units";
            break;
          case "unitsDesc2":
            units = sortDescOrder1(units, "name");
            selectedButton = "units-button";
            selectedTableName = "Units";
            break;
          case "unitsAsc3":
            units = sortAscOrder1(units, "subjectAreaGroup");
            selectedButton = "units-button";
            selectedTableName = "Units";
            break;
          case "unitsDesc3":
            units = sortDescOrder1(units, "subjectAreaGroup");
            selectedButton = "units-button";
            selectedTableName = "Units";
            break;

          // For Allocations Table
          case "allocationsAsc1":
            allocations = sortAscOrder1(allocations, "academicId");
            selectedButton = "allocations-button";
            selectedTableName = "Allocations";
            break;
          case "allocationsDesc1":
            allocations = sortDescOrder1(allocations, "academicId");
            selectedButton = "allocations-button";
            selectedTableName = "Allocations";
            break;
          case "allocationsAsc2":
            allocations = sortAscOrder2(allocations, "id");
            selectedButton = "allocations-button";
            selectedTableName = "Allocations";
            break;
          case "allocationsDesc2":
            allocations = sortDescOrder2(allocations, "id");
            selectedButton = "allocations-button";
            selectedTableName = "Allocations";
            break;
          case "allocationsAsc3":
            allocations = sortAscOrder2(allocations, "fractionAllocated");
            selectedButton = "allocations-button";
            selectedTableName = "Allocations";
            break;
          case "allocationsDesc3":
            allocations = sortDescOrder2(allocations, "fractionAllocated");
            selectedButton = "allocations-button";
            selectedTableName = "Allocations";
            break;
          case "allocationsAsc4":
            allocations = sortAscOrder1(allocations, "unitCoordinator");
            selectedButton = "allocations-button";
            selectedTableName = "Allocations";
            break;
          case "allocationsDesc4":
            allocations = sortDescOrder1(allocations, "unitCoordinator");
            selectedButton = "allocations-button";
            selectedTableName = "Allocations";
            break;

          // For UnitOfferings Table
          case "unitOfferingsAsc1":
            offerings = sortAscOrder2(offerings, "id");
            selectedButton = "unitOfferings-button";
            selectedTableName = "UnitOfferings";
            break;
          case "unitOfferingsDesc1":
            offerings = sortDescOrder2(offerings, "id");
            selectedButton = "unitOfferings-button";
            selectedTableName = "UnitOfferings";
            break;
          case "unitOfferingsAsc2":
            offerings = sortAscOrder1(offerings, "code");
            selectedButton = "unitOfferings-button";
            selectedTableName = "UnitOfferings";
            break;
          case "unitOfferingsDesc2":
            offerings = sortDescOrder1(offerings, "code");
            selectedButton = "unitOfferings-button";
            selectedTableName = "UnitOfferings";
            break;
          case "unitOfferingsAsc3":
            offerings = sortAscOrder1(offerings, "semester");
            selectedButton = "unitOfferings-button";
            selectedTableName = "UnitOfferings";
            break;
          case "unitOfferingsDesc3":
            offerings = sortDescOrder1(offerings, "semester");
            selectedButton = "unitOfferings-button";
            selectedTableName = "UnitOfferings";
            break;
          case "unitOfferingsAsc4":
            offerings = sortAscOrder2(offerings, "estimatedEnrolments");
            selectedButton = "unitOfferings-button";
            selectedTableName = "UnitOfferings";
            break;
          case "unitOfferingsDesc4":
            offerings = sortDescOrder2(offerings, "estimatedEnrolments");
            selectedButton = "unitOfferings-button";
            selectedTableName = "UnitOfferings";
            break;
          case "unitOfferingsAsc5":
            offerings = sortAscOrder2(offerings, "schoolShare");
            selectedButton = "unitOfferings-button";
            selectedTableName = "UnitOfferings";
            break;
          case "unitOfferingsDesc5":
            offerings = sortDescOrder2(offerings, "schoolShare");
            selectedButton = "unitOfferings-button";
            selectedTableName = "UnitOfferings";
            break;

          // For Preferences Table
          case "preferencesAsc1":
            preferences = sortAscOrder1(preferences, "id");
            selectedButton = "preferences-button";
            selectedTableName = "Preferences";
            break;
          case "preferencesDesc1":
            preferences = sortDescOrder1(preferences, "id");
            selectedButton = "preferences-button";
            selectedTableName = "Preferences";
            break;
          case "preferencesAsc2":
            preferences = sortAscOrder1(preferences, "code");
            selectedButton = "preferences-button";
            selectedTableName = "Preferences";
            break;
          case "preferencesDesc2":
            preferences = sortDescOrder1(preferences, "code");
            selectedButton = "preferences-button";
            selectedTableName = "Preferences";
            break;
          case "preferencesAsc3":
            preferences = sortAscOrder2(preferences, "desireToTeach");
            selectedButton = "preferences-button";
            selectedTableName = "Preferences";
            break;
          case "preferencesDesc3":
            preferences = sortDescOrder2(preferences, "desireToTeach");
            selectedButton = "preferences-button";
            selectedTableName = "Preferences";
            break;
          case "preferencesAsc4":
            preferences = sortAscOrder2(preferences, "abilityToTeach");
            selectedButton = "preferences-button";
            selectedTableName = "Preferences";
            break;
          case "preferencesDesc4":
            preferences = sortDescOrder2(preferences, "abilityToTeach");
            selectedButton = "preferences-button";
            selectedTableName = "Preferences";
            break;
        }
      }

      return view.render("spreadsheetView", {
        academics: academics,
        units: units,
        allocations: allocations,
        offerings: offerings,
        preferences: preferences,
        global_spread: global_spread,
        selectedButton: selectedButton,
        selectedTableName: selectedTableName,
      });
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
}

module.exports = SpreadsheetViewController;
