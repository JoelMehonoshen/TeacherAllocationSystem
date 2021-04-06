
// Get all tags for a specified academic 
const sqlGetAllTags = (academicID) => {
    sqlpt1 = "Select Tags FROM Academic WHERE AcademicID = ";
    sqlpt2 = "'" + academicID + "'";
    return sqlpt1 + sqlpt2;
}

module.exports = sqlGetAllTags; 