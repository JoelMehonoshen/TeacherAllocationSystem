
// RUN SECOND (PER ACADEMIC)
// variable 2: TimeID (set to 1 for DEMO)
const sqlAcademicUpdate = (academicID,YearID) => {
    sqlpt1 = "UPDATE AcademicAllocation SET ActualLoad = (SELECT ifnull(Sum(Allocation.AllocationAmount * UnitYear.AssignedLoad) ,0) FROM UnitYear,Allocation WHERE Allocation.AcademicAllocationCode = '" + academicID +YearID+"' AND UnitYear.UnitYearCode = Allocation.UnitYearCode AND YearID ='" + YearID + "'), LoadError = (SELECT ifnull(Sum(Allocation.AllocationAmount * UnitYear.AssignedLoad) ,0) FROM UnitYear,Allocation WHERE Allocation.AcademicAllocationCode = '" + academicID +YearID+"' AND UnitYear.UnitYearCode = Allocation.UnitYearCode AND YearID ='" + YearID + "') - AcademicAllocation.UnitLoad WHERE AcademicID =";
    sqlpt4 = "'" + academicID + "' AND YearID =";
    sqlpt5 = "'" + YearID + "' ";


    return sqlpt1 + sqlpt4 + sqlpt5;
}

module.exports = sqlAcademicUpdate; 