tagSearch = require("./functions/tagSearch.js")
unitSearch = require("./functions/unitSearch.js")
applyChanges = require("./functions/applyChanges.js")
underAllocatedAcademics = require("./functions/underAllocatedAcademics.js");
underAllocatedUnits = require("./functions/underAllocatedUnits.js");
allUnits = require("./functions/allUnits.js");
allTags = require("./functions/allTags.js"); 
allocateUnit = require("./functions/allocateUnit.js"); 
removeUnit = require("./functions/removeUnit.js"); 
getAcademicTags = require("./functions/getAcademicTags.js"); 
removeAcademicTag = require("./functions/removeAcademicTag.js"); 
allTagsExcludingSome = require("./functions/allTagsExcludingSome.js"); 
importTable = require("./functions/importTable.js"); 
assignAcademicTags = require("./functions/assignAcademicTags.js"); 
addAcademic = require("./functions/addAcademic.js"); 
tagSearchUnits = require("./functions/tagSearchUnits.js"); 
getUnitTags = require("./functions/getUnitTags.js"); 
removeUnitTag = require("./functions/removeUnitTag.js"); 
assignUnitTags = require("./functions/assignUnitTags.js"); 
addUnit = require("./functions/addUnit.js"); 
addTag = require("./functions/addTag.js"); 
removeTag = require("./functions/removeTag"); 
allYears = require("./functions/allYears.js"); 
tagSearchAcademics = require("./functions/tagSearchAcademics.js"); 
addNewUnit = require("./functions/addNewUnit.js"); 
createUnit = require("./functions/createUnit.js"); 
allUnitCodes = require("./functions/allUnitsCodes.js"); 
updateLoad = require("./functions/updateLoad.js");
removeUnitYear = require("./functions/removeUnitYear.js"); 
removeAcademic = require("./functions/removeAcademic.js"); 
exportYear = require("./functions/exportYear.js"); 
addYear = require("./functions/addYear.js"); 
updateAcademicLoad = require("./functions/updateAcademicLoad.js"); 
updateUnitShare = require("./functions/updateUnitShare.js"); 
updateUnitEnrolled = require("./functions/updateUnitEnrolled.js"); 
updateYearMinLoad = require("./functions/updateYearMinLoad.js"); 
removeYear = require("./functions/removeYear.js"); 
updateUnitsLoad = require("./functions/updateUnits.js");

// SQL queries (delete eventually)
const sql1 = 'SELECT * FROM AcademicAllocation';
const sql2 = 'SELECT  Time.Semester, Unit.UnitCode, Subject.AssignedLoad, Allocation.AllocationAmount FROM Subject,Unit,Time,Allocation WHERE  Subject.UnitID = Unit.UnitID AND Subject.SubjectID = Allocation.SubjectID AND Subject.TimeID = Time.TimeID ORDER BY Unit.UnitCode ASC'
const sql3 = "SELECT  Time.Semester, Unit.UnitCode, Subject.AssignedLoad, Allocation.AllocationAmount FROM Subject,Unit,Time,Allocation WHERE  Subject.UnitID = Unit.UnitID AND Subject.SubjectID = Allocation.SubjectID AND Subject.TimeID = Time.TimeID AND Unit.UnitCode LIKE 'cab%' ORDER BY Unit.UnitCode ASC"
const sqlAca = "SELECT DISTINCT Academic.Title, Academic.FirstName, Academic.LastName, Academic.Load, AcademicAllocation.LoadError FROM Academic,AcademicAllocation,Subject,Unit,Allocation WHERE Allocation.AcademicID = Academic.AcademicID AND Unit.UnitID = Subject.UnitID AND Subject.SubjectID = Allocation.SubjectID AND AcademicAllocation.TimeID = Subject.TimeID AND Academic.AcademicID = AcademicAllocation.AcademicID"
const sqlUnt = "SELECT Time.Semester, Unit.UnitCode, Subject.AssignedLoad, Allocation.AllocationAmount FROM Subject,Unit,Time,Allocation WHERE  Subject.UnitID = Unit.UnitID AND Subject.SubjectID = Allocation.SubjectID AND Subject.TimeID = Time.TimeID AND Allocation.AcademicID = 'SearchID' ORDER BY Unit.UnitCode ASC"

// create constants
const express = require("express");
const app = express(); 
const router = express.Router();  
const sqlite3 = require('sqlite3');
const cors = require("cors"); 

const port = process.env.PORT || 3001; 

app.use(cors()); 

// Database connection
const db = new sqlite3.Database('../../database_sqlite/AllocationDB.db');

app.get("/allocations", (req, res) => {
  if (typeof req.query.tag != "undefined") { 

    tagSearch(db, req.query.tag).then((results) => res.json(results));
  }
  else if (typeof req.query.academicID != "undefined") { 
    // Should change query for this, academicID is not clear that it's getting the units
    unitSearch(db, req.query.academicID, req.query.yearID).then((results) => res.json(results));
  }
  else if (typeof req.query.underAllocated != "undefined") {
    if (req.query.underAllocated == "units") {
      underAllocatedUnits(db, req.query.yearID).then((results) => res.json(results));
    }
    else if (req.query.underAllocated == "academics") {
      underAllocatedAcademics(db, req.query.yearID).then((results) => res.json(results));
    }
  }
  else if (typeof req.query.allUnits != "undefined") {
    allUnits(db, req.query.allUnits, req.query.yearID).then((results) => res.json(results));
  }

  else if (typeof req.query.allTags != "undefined") {
    allTags(db).then((results) => res.json(results));
  }

  else if (typeof req.query.allTagsExcludingSome != "undefined") {
    allTagsExcludingSome(db, req.query.allTagsExcludingSome).then((results) => res.json(results));
  }

  else if (typeof req.query.getAcademicTags != "undefined") {
    getAcademicTags(db, req.query.getAcademicTags).then((results) => res.json(results));
  }

  else if (typeof req.query.getUnitTags != "undefined") {
    getUnitTags(db, req.query.getUnitTags).then((results) => res.json(results));
  }
})

app.get("/tagSearchUnits", (req, res) => {
  tagSearchUnits(db, req.query).then((results) => res.json(results));
})

app.get("/allYears", (req, res) => {
  allYears(db).then((results) => res.json(results));
})

app.get("/allUnitCodes", (req, res) => {
  allUnitCodes(db).then((results) => res.json(results));
})

// Manage Years 
app.post("/addYear", (req, res) => {
  addYear(db, req.query).then((results) => res.json(results)); // For adding a year to the years table 
})

const updateYear = async (db, req) => {

  await updateYearMinLoad(db, req.query);  

  await updateUnitsLoad(db, req.query); 

  await updateLoad(db, req.query);

}

app.post("/updateYearMinLoad", (req, res) => {
  
  updateYear(db, req)

})

app.post("/removeYear", (req, res) => {
  removeYear(db, req.query).then((results) => res.json(results)); 
})

// Tags 
app.post("/addTag", (req, res) => {
  addTag(db, req.query).then((results) => res.json(results));
})

app.post("/removeTag", (req, res) => {
  removeTag(db, req.query).then((results) => res.json(results));
})

// Allocations 
app.post("/allocateUnit", (req, res) => {
  allocateUnit(db, req.query).then((results) => res.json(results));
})

app.post("/removeUnit", (req, res) => {
  removeUnit(db, req.query);
})

app.post("/updateAllocationAmount", (req, res) => {
  applyChanges(db, req.query).then((results) => res.json(results)); 
})


// Academics 
app.post("/removeAcademic", (req, res) => { 
  removeAcademic(db, req.query);
  updateLoad(db, req.query);
})

app.get("/tagSearchAcademics", (req, res) => {
  tagSearchAcademics(db, req.query).then((results) => res.json(results));
})

app.post("/removeAcademicTag", (req, res) => {
  removeAcademicTag(db, req.query).then((results) => res.json(results));
})

app.post("/assignAcademicTags", (req, res) => {
  assignAcademicTags(db, req.query).then((results) => res.json(results));
})

app.post("/addAcademic", (req, res) => {
  addAcademic(db, req.query);
  updateLoad(db, req.query);
})

app.post("/updateAcademicLoad", (req, res) => {
  updateAcademicLoad(db, req.query).then((results) => res.json(results));
})

// Units
app.post("/removeUnitTag", (req, res) => {
  removeUnitTag(db, req.query).then((results) => res.json(results));
})

app.post("/assignUnitTags", (req, res) => {
  assignUnitTags(db, req.query).then((results) => res.json(results));
})

app.post("/addUnit", (req, res) => {
  addUnit(db, req.query).then((results) => res.json(results)); // For adding a unit to an academic
})

app.post("/addNewUnit", (req, res) => {
  addNewUnit(db, req.query); // For adding a new unit to the units page and table
  updateLoad(db, req.query);
})

app.post("/createUnit", (req, res) => {
  createUnit(db, req.query).then((results) => res.json(results)); // For adding a new unit to the units page and table
})

app.post("/removeUnitYear", (req, res) => {
  removeUnitYear(db, req.query);
  updateLoad(db, req.query);
})

app.post("/updateUnitShare", (req, res) => {
  updateUnitShare(db, req.query);
  updateLoad(db, req.query);
})

app.post("/updateUnitEnrolled", (req, res) => {
  updateUnitEnrolled(db, req.query);
  updateLoad(db, req.query);
})

// Import
app.post("/import", (req, res) => {
  importTable(db, req.query).then((results) => res.json(results));
})

// Export 
app.get("/export", (req, res) => {
  exportYear(db, req.query).then((results) => res.json(results));
})

const startExpress = () => {
  app.listen(port);
  console.log("Listening on port: " + port); 
}

startExpress(); 