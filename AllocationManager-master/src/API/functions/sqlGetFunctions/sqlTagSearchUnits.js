
// const sqlTagSearchUnits = (searchQuery) => {
//     // SQL TO SEARCH FOR UNITS BASED ON SPECIFIED TAGS (CAN BE MULTIPLE)

//     // Thought it might be similar to this: 
const sqlTagSearchUnits = (tagList,yearID) => {
  sqlpt1 = "SELECT UnitYear.UnitYearCode, Semesters.Semester, Units.UnitCode, Units.UnitName, UnitYear.AssignedLoad,UnitYear.Enrolled,UnitYear.Share,UnitYear.LoadError,UnitYear.AlocatedLoad FROM Units,UnitYear,Semesters WHERE  UnitYear.UnitID = Units.UnitID AND Semesters.SemesterID = UnitYear.SemesterID AND UnitYear.YearID = '"+yearID+"'";
  sqlpt2 = "";
  arr = tagList.split(",")
  for (let i = 0;i < arr.length; i++)
  {
    if (i == 0)
    {
      sqlpt2 = sqlpt2 + "AND (";
    }
    else if (i > 0)
    {
      sqlpt2 = sqlpt2 + "AND";
    }
  sqlpt2 = sqlpt2 + " Units.Tags LIKE '%" + arr[i] + "%' ";
    if (i == (arr.length - 1))
    {
      sqlpt2 = sqlpt2 + ") ";
    }
  }
  sqlpt3 = "ORDER BY Units.Unitcode ASC";
  return sqlpt1 + sqlpt2 + sqlpt3;
     
}

module.exports = sqlTagSearchUnits; 