
const sqlUpdateAcademicLoad = (academicID, yearID, newLoad) => {
    sqlpt1 = "UPDATE AcademicAllocation SET Load = '" +newLoad+ "', UnitLoad = (SELECT StandardLoad FROM Years WHERE YearID = '" + yearID + "' )*'" +newLoad+ "'   WHERE AcademicID ='" + academicID + "' AND YearID ='" + yearID + "' ";
    return sqlpt1 ;
}

module.exports = sqlUpdateAcademicLoad; 