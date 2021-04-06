//Delete all allocations with the unityear id that is entered
const sqlRemoveAllocationsAca = (academicAllocationCode) => {
    sqlpt1 = "DELETE FROM Allocation WHERE AcademicAllocationCode =";
    sqlpt2 = "'" + academicAllocationCode + "' )";
    return sqlpt1 + sqlpt2;
}

module.exports = sqlRemoveAllocationsAca; 