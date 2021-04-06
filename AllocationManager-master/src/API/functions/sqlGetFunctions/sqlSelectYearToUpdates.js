const sqlSelectYearToUpdates = (academicID) => {
    sqlpt1 = "SELECT DISTINCT YearID FROM AcademicAllocation WHERE AcademicAllocation.AcademicID = '"+academicID+"'";
    return sqlpt1;
}

module.exports = sqlSelectYearToUpdates;