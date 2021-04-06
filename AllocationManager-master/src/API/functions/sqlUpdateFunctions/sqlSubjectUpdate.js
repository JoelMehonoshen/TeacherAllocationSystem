
// // RUN FOURTH 
// could run over all of the subjects at the end or after other queries are done
const sqlSubjectUpdate = (subjectID) => {
    sqlpt1 = "UPDATE UnitYear SET AlocatedLoad = (SELECT ifnull(SUM(AllocationAmount),0.0) FROM Allocation WHERE UnitYearCode =";
    sqlpt2 = "'" + subjectID + "' ), LoadError = (SELECT ifnull(SUM(AllocationAmount),0.0) FROM Allocation WHERE UnitYearCode =";
    sqlpt3 = "'" + subjectID + "') - 1 WHERE UnitYearCode =";
    sqlpt4 = "'" + subjectID + "'";
    return sqlpt1 + sqlpt2 + sqlpt3 + sqlpt4;
}
module.exports = sqlSubjectUpdate; 