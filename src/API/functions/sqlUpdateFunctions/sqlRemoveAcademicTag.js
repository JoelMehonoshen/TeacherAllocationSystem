// sql to add / remove academic tags 
const sqlRemoveAcademicTag= (tag, academicID) => {
    // sqlpt1 = "Update Academic(AcademicTag) SET (";
    // sqlpt2 = "'" + variable1 + "')";
    // return sqlpt1 + sqlpt2;
    sqlpt1 = "UPDATE Academic ";
    sqlpt2 = "SET Tags = REPLACE((SELECT Tags FROM Academic WHERE AcademicID = '" + academicID +"'),':" + tag +":','') WHERE AcademicID = '" + academicID +"'";
    return sqlpt1 + sqlpt2; 
  } 

module.exports = sqlRemoveAcademicTag; 