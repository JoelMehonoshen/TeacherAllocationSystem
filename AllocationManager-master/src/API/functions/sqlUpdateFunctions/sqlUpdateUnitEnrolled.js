
const sqlUpdateUnitEnrolled = (unitYearCode, newEnrolled,share,minLoad) => {
    AssignedLoad = Math.max(Math.log10(newEnrolled/7),minLoad)*share;
    return("UPDATE UnitYear SET Enrolled = '"+newEnrolled+"',AssignedLoad = '"+AssignedLoad+"' WHERE UnitYearCode = '"+unitYearCode+"'");
}

module.exports = sqlUpdateUnitEnrolled; 