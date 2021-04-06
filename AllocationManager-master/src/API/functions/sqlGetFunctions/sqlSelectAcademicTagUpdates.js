const sqlSelectAcademicTagUpdates = (unitCode) => {
    sqlpt1 = "SELECT DISTINCT academicID,AcademicAllocation.YearID FROM Allocation,AcademicAllocation,UnitYear,Units WHERE AcademicAllocation.AcademicAllocationCode = Allocation.AcademicAllocationCode AND Allocation.UnitYearCode = UnitYear.UnitYearCode AND UnitYear.UnitID = Units.UnitID AND Units.UnitCode = '"+unitCode+"'";
    return sqlpt1;
}

module.exports = sqlSelectAcademicTagUpdates;