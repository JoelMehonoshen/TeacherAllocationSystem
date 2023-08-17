"use strict"
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");

const Academic = use("App/Models/PreferenceForm");
const Preference = use("App/Models/Academic");
const Offering = use("App/Models/Offering")
const Database = use("Database");

class PreferenceFormController {
    constructor() {
        this.unitsList = ['CAB301', 'CAB203', 'IFB399', 'IFB295'];
        this.selectedList = []; // Separate list for selected items
      }
    
      // Display the form
      async displayForm({ view }) {
        return view.render('teachingForm', { unitsList: this.unitsList });
      }
    
      // Handle form submission
      async processForm({ request, response }) {
        const selectedItems = request.input('selectedItems', []);
        
        // Add selected items to the separate list
        this.selectedList = selectedItems;
    
        return response.route('preference_form');
    }
}

