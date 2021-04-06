// Search function
// Searches based on tag: e.g. "cab" 
const tagSearch = (db, searchQuery) => {
    return new Promise((resolve, reject) => {
      let result = []; 
      console.log(searchQuery);
      db.each(sqlTagSearch(searchQuery), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
    })
  }

  const sqlTagSearch = (searchQuery) => {
    sqlpt1 = "SELECT DISTINCT Academic.AcademicID, Academic.Name, AcademicAllocation.Load, AcademicAllocation.UnitLoad , AcademicAllocation.ActualLoad, AcademicAllocation.LoadError FROM Academic,AcademicAllocation WHERE Academic.AcademicID = AcademicAllocation.AcademicID ";
    sqlpt2 = "";
    arr = searchQuery.split(",")
    console.log(arr)
    console.log(arr.length)
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
    console.log(sqlpt2)
    }
    sqlpt3 = "ORDER BY Academic.Name ASC";
    console.log(sqlpt1 + sqlpt2 + sqlpt3)
    return sqlpt1 + sqlpt2 + sqlpt3;
  } 

module.exports = tagSearch; 