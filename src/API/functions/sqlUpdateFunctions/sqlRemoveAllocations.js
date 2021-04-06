
//Delete all allocations with the unityear id that is entered
const sqlRemoveAllocations = (unitYearCode) => {
    sqlpt1 = "DELETE FROM Allocation WHERE UnitYearCode =";
    sqlpt2 = "'" + unitYearCode + "' ";
    return sqlpt1 + sqlpt2;
}

module.exports = sqlRemoveAllocations; 