// Get all tags 
const sqlGetAllTagsExcludingSome = (tagsToExclude) => {
    // CHANGE THIS SQL TO EXCLUDE SOME TAGS 
    sqlpt1 = "SELECT * FROM Tags "
    sqlpt2 = "";
    arr = tagsToExclude.split(",")
    // console.log(arr)
    // console.log(arr.length)
    for (let i = 0;i < arr.length; i++)
    {
      console.log(arr[i]); 

      if (i == 0)
      {
        sqlpt2 += "WHERE (";
      }
      else if (i > 0)
      {
        sqlpt2 += "AND ";
      }
    sqlpt2 += "Tag != '" + arr[i] + "' ";
      if (i == (arr.length - 1))
      {
        sqlpt2 += ") ";
      }
    } 
    return sqlpt1 + sqlpt2; 
}

module.exports = sqlGetAllTagsExcludingSome; 