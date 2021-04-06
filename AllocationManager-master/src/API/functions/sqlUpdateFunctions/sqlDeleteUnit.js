const sqlDeleteUnit = (UnitYearCode,academicID,yearID) => {
    sqlpt1 = "DELETE FROM Allocation WHERE AcademicAllocationCode =";
    sqlpt2 = "'" + academicID +yearID+ "' AND UnitYearCode =";
    sqlpt3 = "'" + UnitYearCode + "' ";
    return sqlpt1 + sqlpt2 + sqlpt3;
}

module.exports = sqlDeleteUnit; 