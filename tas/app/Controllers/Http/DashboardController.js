'use strict';

const Database = use('Database');

class DashboardController {

  // Display the dashboard
  async displayDashboard({ view }) {
    return view.render('dashboard', {
      // unitsArray: unitsArray,
      // teachingValuesArray: teachingValuesArray,
    });
  }
}

module.exports = DashboardController;
