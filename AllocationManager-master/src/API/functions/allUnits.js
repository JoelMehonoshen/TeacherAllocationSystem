

// Get all the units, excluding those specified
const allUnits = (db, unitsToExclude, yearID) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlAllUnits(unitsToExclude, yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

  const sqlAllUnits = (unitsToExclude, yearID) => {
    // A query to get a list of all the units, excluding those specified in the searchQuery
    sqlpt1 = "SELECT DISTINCT Units.UnitCode,UnitYear.UnitYearCode, Semesters.Semester FROM UnitYear,Units, Semesters WHERE UnitYear.SemesterID = Semesters.SemesterID AND Units.UnitID = UnitYear.UnitID AND UnitYear.YearID = ";
    sqlpt2 = "'" + yearID + "' ";
    sqlpt3 = "";
    arr = unitsToExclude.split(",")
    for (let i = 0;i < arr.length; i++)
    {
      console.log(arr[i]); 
      if (arr[i] == '')
      {
        break;
      }
      if (i == 0)
      {
        sqlpt3 = sqlpt3 + "AND (";
      }
      else if (i > 0)
      {
        sqlpt3 = sqlpt3 + "AND";
      }
    sqlpt3 = sqlpt3 + " UnitYear.UnitYearCode != '" + arr[i] + "' ";
      if (i == (arr.length - 1))
      {
        sqlpt3 = sqlpt3 + ") ";
      }
    }
    sqlpt4 = "ORDER BY Units.UnitCode ASC";
    return sqlpt1 + sqlpt2 + sqlpt3 + sqlpt4; 
  } 

module.exports = allUnits; 