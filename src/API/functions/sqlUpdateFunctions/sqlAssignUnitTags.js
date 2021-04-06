
const sqlAssignUnitTags = (UnitCode, tagsToAssign) => 
{
    sqlpt1 = "UPDATE Units ";
    sqlpt2 = "";
    arr = tagsToAssign.split(",")
    // console.log(arr)
    // console.log(arr.length)
    for (let i = 0;i < arr.length; i++)
    {
      console.log(arr[i]); 

      if (i == 0)
      {
        sqlpt2 += "SET Tags = '";
      }
    sqlpt2 +=  ":" + arr[i] + ":";
    if (i < (arr.length - 1))
    {
      sqlpt2 += "'||'";
    }
        if (i == (arr.length - 1))
      {
        sqlpt2 += "'||(SELECT Tags FROM Units WHERE UnitCode = '" + UnitCode +"') WHERE UnitCode = '" + UnitCode +"'";
      }
    } 


    return sqlpt1 + sqlpt2;
} 

module.exports = sqlAssignUnitTags; 