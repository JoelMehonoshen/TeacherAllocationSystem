
// RUN FIRST (PER SUBJECT)
const sqlAllocationUpdate = (newAllocationAmount, academicID, UnitYearCode, yearID) => {
    sqlpt1 = "UPDATE Allocation SET AllocationAmount =";
    sqlpt2 = "'" + newAllocationAmount + "' WHERE AcademicAllocationCode =";
    sqlpt3 = "'" + academicID+yearID+"' AND UnitYearCode =";
    sqlpt4 = "'" + UnitYearCode + "'  ";

    return sqlpt1 + sqlpt2 + sqlpt3 + sqlpt4;
   
}

module.exports = sqlAllocationUpdate; 