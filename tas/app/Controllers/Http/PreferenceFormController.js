"use strict"
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");

const Academic = use("App/Models/PreferenceForm");
const Preference = use("App/Models/Academic");
const Offering = use("App/Models/Offering")
const Database = use("Database");

class PreferenceFormController {
    constructor() {
        // List to display in addPreferenceOption list
        this.unitsList = ["Item1", "Item2", "Item3"];

        // TODO: Add a way for the user to set this!
        this.semester = "2022/1";

        // List of items added from unitsList by addPreferenceOption
        this.selectedList = []; // Separate list for selected items
      }

      // Can't call await in the constructor, so we need to define a separate function to fetch unitsList
      async updateUnitsList() {
        const currentOfferings = await Database.select("offerings.code").from("offerings").where("semester", this.semester);
        this.unitsList = currentOfferings.map(item => item.code.trim());
        console.log(this.unitsList);
      }
    
      // Display the form
      async displayForm({ view }) {
        this.updateUnitsList();
        return view.render('teachingForm', { unitsList: this.unitsList });
      }
    
      // Handle form submission
      async processAddUnitForm({ request, response }) {
        const selectedItems = request.input('selectedItems', []);
        
        // Add selected items to the separate list
        this.selectedList = selectedItems;
    
        return response.route('preference_form');
      }

      async processUnitPreferenceForm({ request, response }) {
        const formInputs = request.input('unitPreferences', [])
      }
}

module.exports = PreferenceFormController;
