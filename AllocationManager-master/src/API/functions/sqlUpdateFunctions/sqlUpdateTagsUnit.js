const sqlUpdateTagsUnit = (academicID,unitYearCode) => {
    sqlpt1 = "UPDATE AcademicAllocation SET Tags = ifnull((SELECT Tags FROM Academic WHERE AcademicID = '" + academicID + "' ) || (SELECT group_concat(Tags,'')";
    sqlpt2 = " FROM Units,UnitYear,Allocation,AcademicAllocation WHERE UnitYear.UnitID = Units.UnitID AND Allocation.UnitYearCode = UnitYear.UnitYearCode AND Allocation.AcademicAllocationCode = AcademicAllocation.AcademicAllocationCode AND AcademicAllocation.AcademicID = '" + academicID + "'),'')WHERE AcademicID = '" + academicID + "' AND YearID = (SELECT YearID FROM UnitYear WHERE UnitYearCode = '"+unitYearCode+"')";
    return sqlpt1 + sqlpt2 ;
}

module.exports = sqlUpdateTagsUnit;