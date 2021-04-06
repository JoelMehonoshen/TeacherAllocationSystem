//Delete the unit year where the year id =
const sqlRemoveAcademic = (academicID,yearID) => {
    sqlpt1 = "DELETE FROM AcademicAllocation WHERE AcademicID =";
    sqlpt2 = "'" + academicID + "' AND YearID = '" + yearID + "'";
    return sqlpt1 + sqlpt2;
}

module.exports = sqlRemoveAcademic; 