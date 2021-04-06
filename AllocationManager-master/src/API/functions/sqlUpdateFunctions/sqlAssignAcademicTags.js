
const sqlAssignAcademicTags = (academicID, tagsToAssign) => 
{


    sqlpt1 = "UPDATE Academic ";
    sqlpt2 = "";
    arr = tagsToAssign.split(",")

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
        sqlpt2 += "'||(SELECT Tags FROM Academic WHERE AcademicID = '" + academicID +"') WHERE AcademicID = '" + academicID +"'";
      }
    } 

    return sqlpt1 + sqlpt2;
} 

module.exports = sqlAssignAcademicTags; 