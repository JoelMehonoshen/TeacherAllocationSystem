
// RUN THIRD (PER ACADEMIC)
// variable 2: TimeID (set to 1 for DEMO)
const sqlAcademicErrorUpdate = (academicID,YearID) => {
    sqlpt1 = "UPDATE AcademicAllocation SET LoadError = AcademicAllocation.ActualLoad - AcademicAllocation.UnitLoad WHERE AcademicID =";
    sqlpt2 = "'" + academicID + "' AND YearID =";
    sqlpt3 = "'" + YearID + "' ";

    return sqlpt1 + sqlpt2 + sqlpt3;
}

module.exports = sqlAcademicErrorUpdate; 