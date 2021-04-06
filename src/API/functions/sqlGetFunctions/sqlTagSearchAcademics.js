
const sqlTagSearchAcademics = (tags, yearID) => {
    // yearID not implemented, should function as normal 

    sqlpt1 = "SELECT DISTINCT Academic.AcademicID, Academic.Name, Academic.School, AcademicAllocation.Load, AcademicAllocation.UnitLoad , AcademicAllocation.ActualLoad, AcademicAllocation.LoadError,AcademicAllocation.AcademicAllocationCode FROM Academic,AcademicAllocation WHERE Academic.AcademicID = AcademicAllocation.AcademicID AND AcademicAllocation.YearID = '" + yearID + "'";
    sqlpt2 = "";
    arr = tags.split(",")
    // console.log(arr)
    // console.log(arr.length)
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
    sqlpt2 = sqlpt2 + " AcademicAllocation.Tags LIKE '%" + arr[i] + "%' ";
      if (i == (arr.length - 1))
      {
        sqlpt2 = sqlpt2 + ") ";
      }
    // console.log(sqlpt2)
    }
    sqlpt3 = "ORDER BY Academic.Name ASC";
    // console.log(sqlpt1 + sqlpt2 + sqlpt3)
    return sqlpt1 + sqlpt2 + sqlpt3;
}

module.exports = sqlTagSearchAcademics; 