const sqlUpdateTags = (academicID,YearID) => {
    sqlpt1 = "UPDATE AcademicAllocation SET Tags = ifnull((SELECT Tags FROM Academic WHERE AcademicID = '" + academicID + "' ) || (SELECT group_concat(Tags)";
    sqlpt2 = " FROM Units,UnitYear,Allocation WHERE UnitYear.UnitID = Units.UnitID AND UnitYear.YearID = '" + YearID + "' AND Allocation.UnitYearCode = UnitYear.UnitYearCode";
    sqlpt3 = " AND Allocation.AcademicAllocationCode = '" + academicID + YearID +"'),'')WHERE AcademicID = '" + academicID + "' AND YearID = '" + YearID + "'";
    return sqlpt1 + sqlpt2 + sqlpt3;
}

module.exports = sqlUpdateTags;